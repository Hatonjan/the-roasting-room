from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer
from apps.cart.models import Cart, CartItem

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