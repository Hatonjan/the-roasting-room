from rest_framework import serializers
from apps.bookings.models import Booking


class BookingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True, required=False)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'username', 'name', 'email', 'phone_number', 'date', 'seats', 'created_at']
        read_only_fields = ['id', 'created_at', 'username']
