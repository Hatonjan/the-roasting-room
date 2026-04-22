from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()
router.register(r'addresses', views.AddressViewSet, basename='address')

urlpatterns = [
    path('register/'       , views.UserRegister.as_view()   , name='user-register'),
    path('login/'          , TokenObtainPairView.as_view()  , name='user_login'),
    path('token/refresh/'  , TokenRefreshView.as_view()     , name='token-refresh'),
    path('profile/'        , views.UserProfile.as_view()    , name='user-profile'),
    path('change-password/', views.ChangePassword.as_view() , name='change-password'),
    path('', include(router.urls)),
] 