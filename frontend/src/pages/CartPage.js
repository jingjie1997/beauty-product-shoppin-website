import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function CartPage() {
  const { cartItems, total, updateQuantity } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login?next=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-rose-700 mb-6">購物車</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
            購物車是空的
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-rose-50 text-sm text-gray-600">
                <tr>
                  <th className="text-left p-4">商品</th>
                  <th className="text-center p-4">數量</th>
                  <th className="text-right p-4">小計</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 text-lg leading-none"
                        >
                          −
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 text-lg leading-none"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right text-rose-700 font-semibold">
                      NT$ {(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={2} className="p-4 text-right font-bold text-gray-700">總計</td>
                  <td className="p-4 text-right font-bold text-rose-700 text-lg">
                    NT$ {total.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="p-4 flex justify-end">
              <button
                onClick={handleCheckout}
                className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
              >
                前往結帳
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
