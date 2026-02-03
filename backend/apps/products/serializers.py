from rest_framework import serializers
from .models import Category, Product

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'slug', 'is_active', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id', 'sku', 'category', 'name', 'description',
            'price', 'stock_quantity', 'image_url', 'roast_level',
            'origin', 'weight_grams', 'is_active', 'created_at', 
            'updated_at'  
        ]