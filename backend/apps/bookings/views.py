from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from apps.bookings.models import Booking
from apps.bookings.serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    """
    ViewSet for creating and retrieving table bookings.
    - Anyone can create a booking (no authentication required)
    - User can view their own bookings (if authenticated)
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Filter bookings:
        - Authenticated users see their own bookings
        - Anonymous users cannot list bookings (POST only)
        """
        if self.request.user.is_authenticated:
            return Booking.objects.filter(user=self.request.user)
        # For anonymous POST requests, queryset won't be used
        return Booking.objects.none()

    def perform_create(self, serializer):
        """
        Create a booking, linking to authenticated user if available
        """
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()
