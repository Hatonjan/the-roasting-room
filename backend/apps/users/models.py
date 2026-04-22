from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email               = models.EmailField(unique=True)
    phone               = models.CharField(max_length=20, blank=True)
    address             = models.TextField(blank=True)
    stripe_customer_id  = models.CharField(max_length=255, blank=True)
    email_verified      = models.BooleanField(default=False)
    verification_token  = models.CharField(max_length=255, blank=True)
    reset_token         = models.CharField(max_length=255, blank=True)
    reset_token_expires = models.DateTimeField(null=True, blank=True)
    updated_at          = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.email


class Address(models.Model):
    """User's saved addresses for faster checkout"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_addresses')
    name = models.CharField(max_length=50, help_text="e.g., Home, Work, etc.")
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_default', '-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.city}"