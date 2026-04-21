import stripe
from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer
from apps.cart.models import Cart, CartItem
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse
import json

# Set the Stripe Secret Key
stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            # Get or create the user's cart
            cart, created = Cart.objects.get_or_create(user=request.user)
            
            # If cart was just created or is empty, sync items from frontend
            if created or not cart.items.exists():
                cart_items_data = request.data.get('items', [])
                if not cart_items_data:
                    return Response(
                        {"error": "Your cart is empty"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Clear existing items and add new ones
                cart.items.all().delete()
                for item in cart_items_data:
                    CartItem.objects.create(
                        cart=cart,
                        product_id=item.get('id'),
                        quantity=item.get('quantity', 1)
                    )
            
            cart_items = cart.items.all()

            if not cart_items.exists():
                return Response(
                    {"error": "Your cart is empty"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Calculate the total in CENTS (Stripe uses integers) $15.00 must be sent as 1500
            total_amount = sum(item.product.price * item.quantity for item in cart_items)
            amount_in_cents = int(total_amount * 100)

            # Create the PaymentIntent with Stripe
            intent = stripe.PaymentIntent.create(
                amount=amount_in_cents,
                currency='usd',
                # add metadata to help identify the payment in the Stripe Dashboard
                metadata={
                    'user_id': request.user.id,
                    'user_email': request.user.email
                }
            )

            # Return the client_secret
            return Response({
                'clientSecret': intent.client_secret
            }, status=status.HTTP_200_OK)

        except stripe.error.StripeError as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(f"Unexpected error: {e}")
            import traceback
            traceback.print_exc()
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class OrderListCreate(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        cart = Cart.objects.get(user=self.request.user)
        cart_items = cart.items.all()
        
        if not cart_items.exists():
            raise serializers.ValidationError("Cart is empty")
        
        total = sum(item.product.price * item.quantity for item in cart_items)
        
        order = serializer.save(user=self.request.user, total=total)
        
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price_at_purchase=cart_item.product.price,
                subtotal=cart_item.product.price * cart_item.quantity
            )
        
        cart_items.delete()

class OrderDetail(generics.RetrieveUpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        order = self.get_object()
        
        if request.data.get('status') == 'cancelled':
            if order.status in ['shipped', 'delivered']:
                return Response(
                    {"error": "Cannot cancel shipped or delivered orders"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            order.status = 'cancelled'
            order.save()
            return Response(OrderSerializer(order).data)
        
        return Response(
            {"error": "Only status change to 'cancelled' is allowed"},
            status=status.HTTP_400_BAD_REQUEST
        )
        
''' Webhook Implementation '''
@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(APIView):
    # Stripe calls this when a payment is successful.
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        endpoint_secret = settings.STRIPE_WEBHOOK_SECRET 
        event = None

        try:
            # Verify the 'ID Card' (Signature) of the request
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except ValueError as e:
            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            return HttpResponse(status=400)

        # Handle the specific event: payment_intent.succeeded
        if event['type'] == 'payment_intent.succeeded':
            intent = event['data']['object']
            payment_intent_id = intent['id']
            
            # Extract metadata safely (Stripe objects don't support .get())
            try:
                user_id = intent['metadata']['user_id']
            except (KeyError, TypeError):
                user_id = None
            
            try:
                order = Order.objects.get(payment_intent=payment_intent_id)
                order.status = 'paid'
                order.save()
                print(f"Order {order.id} marked as PAID.")
            except Order.DoesNotExist:
                print(f"Webhook error: No order found for payment intent {payment_intent_id}")
            
            print(f"Payment Succeeded for User {user_id}!")

        return HttpResponse(status=200)