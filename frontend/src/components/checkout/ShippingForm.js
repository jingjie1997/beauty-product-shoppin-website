import React, { useState } from 'react';

const PHONE_REGEX = /^09\d{8}$/;

function validate(values) {
  const errors = {};
  if (!values.recipientName.trim()) {
    errors.recipientName = '請填寫收件人姓名';
  }
  if (!values.recipientPhone.trim()) {
    errors.recipientPhone = '請填寫聯絡電話';
  } else if (!PHONE_REGEX.test(values.recipientPhone.trim())) {
    errors.recipientPhone = '請輸入有效的手機號碼（格式：09xxxxxxxx）';
  }
  if (!values.shippingAddress.trim()) {
    errors.shippingAddress = '請填寫收件地址';
  }
  return errors;
}

export default function ShippingForm({ initialData, onNext, onPrev }) {
  const [values, setValues] = useState({
    recipientName: initialData?.recipientName || '',
    recipientPhone: initialData?.recipientPhone || '',
    shippingAddress: initialData?.shippingAddress || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((er) => ({ ...er, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext(values);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">步驟二：收件資料</h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            收件人姓名 <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="recipientName"
            value={values.recipientName}
            onChange={handleChange}
            placeholder="請輸入真實姓名"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400
              ${errors.recipientName ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.recipientName && (
            <p className="mt-1 text-xs text-red-500">{errors.recipientName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            聯絡電話 <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            name="recipientPhone"
            value={values.recipientPhone}
            onChange={handleChange}
            placeholder="09xxxxxxxx"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400
              ${errors.recipientPhone ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.recipientPhone && (
            <p className="mt-1 text-xs text-red-500">{errors.recipientPhone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            收件地址 <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="shippingAddress"
            value={values.shippingAddress}
            onChange={handleChange}
            placeholder="縣市、鄉鎮區、路/街、號"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400
              ${errors.shippingAddress ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.shippingAddress && (
            <p className="mt-1 text-xs text-red-500">{errors.shippingAddress}</p>
          )}
        </div>

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={onPrev}
            className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← 上一步
          </button>
          <button
            type="submit"
            className="bg-rose-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
          >
            下一步 →
          </button>
        </div>
      </form>
    </div>
  );
}
