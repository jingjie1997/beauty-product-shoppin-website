import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { createOrder } from '../../api/orders';

const PAYMENT_LABELS = {
  cod: '貨到付款',
  simulated_online: '模擬線上付款',
};

export default function OrderConfirmation({ shippingData, paymentMethod, onPrev }) {
  const { cartItems, total, clearCart } = useCart();
  const { accessToken } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async () => {
    setSubmitting(true);
    setApiError('');
    try {
      const payload = {
        recipient_name: shippingData.recipientName,
        recipient_phone: shippingData.recipientPhone,
        shipping_address: shippingData.shippingAddress,
        payment_method: paymentMethod,
        total_amount: total,
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          product_name: item.name,
          unit_price: item.price,
          quantity: item.quantity,
        })),
      };
      const order = await createOrder(accessToken, payload);
      clearCart();
      setOrderId(order.id);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.items?.[0] ||
        '訂單送出失敗，請稍後再試';
      setApiError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (orderId) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">訂單已成立！</h2>
        <p className="text-gray-500 text-sm mb-4">訂單編號</p>
        <p className="font-mono text-rose-700 text-sm bg-rose-50 rounded-lg px-4 py-2 inline-block break-all">
          {orderId}
        </p>
        <p className="mt-4 text-gray-500 text-sm">感謝您的購買，我們將盡快為您出貨。</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">步驟四：訂單確認</h2>

      {/* Cart summary */}
      <section className="mb-5">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">商品清單</h3>
        <div className="divide-y divide-gray-100">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2 text-sm">
              <span className="text-gray-700">
                {item.name} <span className="text-gray-400">× {item.quantity}</span>
              </span>
              <span className="font-semibold text-gray-800">
                NT$ {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-3 border-t border-gray-200 font-bold text-rose-700">
          <span>總計</span>
          <span>NT$ {total.toLocaleString()}</span>
        </div>
      </section>

      {/* Shipping info */}
      <section className="mb-5 bg-gray-50 rounded-xl p-4 text-sm space-y-1">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">收件資料</h3>
        <p><span className="text-gray-500">姓名：</span>{shippingData.recipientName}</p>
        <p><span className="text-gray-500">電話：</span>{shippingData.recipientPhone}</p>
        <p><span className="text-gray-500">地址：</span>{shippingData.shippingAddress}</p>
      </section>

      {/* Payment method */}
      <section className="mb-6 bg-gray-50 rounded-xl p-4 text-sm">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">付款方式</h3>
        <p className="font-medium text-gray-800">{PAYMENT_LABELS[paymentMethod]}</p>
      </section>

      {/* Error message */}
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {apiError}
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={submitting}
          className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          ← 上一步
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-rose-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-rose-700 disabled:opacity-50 transition-colors"
        >
          {submitting ? '送出中...' : '確認送出'}
        </button>
      </div>
    </div>
  );
}
