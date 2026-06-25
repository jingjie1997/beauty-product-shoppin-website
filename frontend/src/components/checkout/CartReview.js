import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

export default function CartReview({ onNext }) {
  const { cartItems, total } = useCart();
  const navigate = useNavigate();

  // Task 4.2 — redirect to cart when empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">步驟一：確認購物車</h2>

      <table className="w-full text-sm mb-6">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="text-left pb-2">商品名稱</th>
            <th className="text-center pb-2">數量</th>
            <th className="text-right pb-2">單價</th>
            <th className="text-right pb-2">小計</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="py-3 font-medium text-gray-800">{item.name}</td>
              <td className="py-3 text-center text-gray-600">{item.quantity}</td>
              <td className="py-3 text-right text-gray-600">NT$ {item.price.toLocaleString()}</td>
              <td className="py-3 text-right font-semibold text-rose-700">
                NT$ {(item.price * item.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-200">
            <td colSpan={3} className="pt-3 text-right font-bold text-gray-700">訂單總計</td>
            <td className="pt-3 text-right font-bold text-rose-700 text-lg">
              NT$ {total.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-rose-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
        >
          繼續 →
        </button>
      </div>
    </div>
  );
}
