from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'unit_price', 'quantity']


class OrderItemCreateSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    product_name = serializers.CharField(max_length=200)
    unit_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    quantity = serializers.IntegerField(min_value=1)


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'status', 'recipient_name', 'recipient_phone',
            'shipping_address', 'payment_method', 'total_amount',
            'created_at', 'items',
        ]


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemCreateSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = [
            'recipient_name', 'recipient_phone', 'shipping_address',
            'payment_method', 'total_amount', 'items',
        ]

    def validate_items(self, items):
        if not items:
            raise serializers.ValidationError('購物車不能為空')
        return items

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item in items_data:
            product_id = item.pop('product_id')
            OrderItem.objects.create(order=order, product_id=product_id, **item)
        return order
