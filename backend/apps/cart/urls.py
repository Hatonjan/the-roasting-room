from django.urls import path
from . import views

urlpatterns = [
    path(''             , views.CartDetail.as_view()    , name='cart-detail'),
    path('item'         , views.CartItemCreate.as_view(), name='cart-item-create'),
    path('item/<int:pk>', views.CartItemDetail.as_view(), name='cart-item-detail'),
]