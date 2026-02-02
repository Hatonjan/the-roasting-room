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