from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from .models import User, Address
from .serializers import UserSerializer, UserRegistrationSerializer, AddressSerializer

class UserRegister(generics.CreateAPIView):
    queryset           = User.objects.all()
    serializer_class   = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]


class UserProfile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class   = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user 
    
class ChangePassword(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        user = request.user
        current_password = request.data.get('current_password')
        new_password     = request.data.get('new_password')
        
        if not user.check_password(current_password):
            return Response(
                {"error": "Current password is incorrect"},
                status = status.HTTP_400_BAD_REQUEST
            )
            
        user.set_password(new_password)
        user.save()
        
        return Response({"message": "Password updated successfully"})


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Only return addresses for the authenticated user
        return Address.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Auto-set user to authenticated user
        serializer.save(user=self.request.user)