from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path 
from . import views

urlpatterns = [
    path('register/'       , views.UserRegister.as_view()   , name='user-register'),
    path('login/'          , TokenObtainPairView.as_view()  , name='user_login'),
    path('token/refresh/'  , TokenRefreshView.as_view()     , name='token-refresh'),
    path('profile/'        , views.UserProfile.as_view()    , name='user-profile'),
    path('change-password/', views.ChangePassword.as_view() , name='change-password'),
] 