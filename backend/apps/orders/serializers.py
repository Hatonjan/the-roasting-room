from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'id', 'order', 'product', 'quantity', 
            'price_at_purchase', 'subtotal'
        ]
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'user', 'items', 'total', 'status', 'shipping_address',
            'payment_intent', 'checkout_session', 'last_four_digits', 
            'card_brand', 'shipping_method', 'tracking_number', 
            'estimated_delivery', 'created_at', 'updated_at'
        ]        
        