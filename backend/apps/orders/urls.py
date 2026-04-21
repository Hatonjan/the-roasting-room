from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrderListCreate.as_view(), name='order-list-create'),
    path('<int:pk>/', views.OrderDetail.as_view(), name='order-detail'),
    path('payment-intent/', views.CreatePaymentIntentView.as_view(), name='create-payment-intent'),
    path('webhook/', views.StripeWebhookView.as_view(), name='stripe-webhook'),
]
