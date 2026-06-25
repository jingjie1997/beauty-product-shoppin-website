import React, { useState } from 'react';

const PAYMENT_OPTIONS = [
  { value: 'cod', label: '貨到付款' },
  { value: 'simulated_online', label: '模擬線上付款', note: '（測試用）選擇後將直接視為付款成功' },
];

export default function PaymentMethod({ initialValue, onNext, onPrev }) {
  // Task 6.2 — default to COD
  const [selected, setSelected] = useState(initialValue || 'cod');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!selected) {
      setError('請選擇付款方式');
      return;
    }
    onNext(selected);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">步驟三：付款方式</h2>

      <div className="space-y-3 mb-6">
        {PAYMENT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors
              ${selected === opt.value
                ? 'border-rose-400 bg-rose-50'
                : 'border-gray-200 hover:border-rose-200'
              }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => {
                setSelected(opt.value);
                setError('');
              }}
              className="mt-0.5 accent-rose-600"
            />
            <div>
              <span className="font-medium text-gray-800">{opt.label}</span>
              {opt.note && (
                <p className="text-sm text-gray-500 mt-0.5">{opt.note}</p>
              )}
            </div>
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← 上一步
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-rose-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
        >
          下一步 →
        </button>
      </div>
    </div>
  );
}
