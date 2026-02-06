from rest_framework import generics
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    
# Admin only permissions    
# from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

# class ProductListCreate(generics.ListCreateAPIView):
#     permission_classes = [IsAuthenticatedOrReadOnly]  # Anyone reads, auth to create
    # Or for admin only: [IsAdminUser]    