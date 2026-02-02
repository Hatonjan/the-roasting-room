from django.db import models

class Category(models.Model):
    name        = models.CharField(max_length=255, unique=True)
    description = models.TextField() 
    slug        = models.SlugField(max_length=100, unique=True)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Product(models.Model):
    sku      = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products'
    )
    name           = models.CharField(max_length=255)
    description    = models.TextField()
    price          = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    image_url      = models.URLField(max_length=500, blank=True)
    roast_level    = models.CharField(max_length=50, blank=True) 
    origin         = models.CharField(max_length=100)
    weight_grams   = models.IntegerField(default=0)
    is_active      = models.BooleanField(default=True)
    created_at     = models.DateTimeField(auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name