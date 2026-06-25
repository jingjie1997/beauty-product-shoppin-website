from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['product_name', 'unit_price', 'quantity']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'status', 'payment_method', 'total_amount', 'created_at']
    list_filter = ['status', 'payment_method']
    search_fields = ['user__username', 'recipient_name', 'recipient_phone']
    inlines = [OrderItemInline]
    readonly_fields = ['id', 'created_at']


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['product_name', 'unit_price', 'quantity', 'order']
    readonly_fields = ['order', 'product', 'product_name', 'unit_price', 'quantity']
