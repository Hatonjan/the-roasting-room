from django.contrib import admin
from apps.bookings.models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'date', 'seats', 'user', 'created_at']
    list_filter = ['date', 'created_at']
    search_fields = ['name', 'email', 'phone_number']
    readonly_fields = ['created_at', 'id']
    fieldsets = (
        ('Booking Info', {
            'fields': ('name', 'email', 'phone_number', 'date', 'seats')
        }),
        ('User Association', {
            'fields': ('user',),
            'description': 'Leave empty for non-registered users'
        }),
        ('Timestamps', {
            'fields': ('created_at', 'id'),
            'classes': ('collapse',)
        }),
    )
