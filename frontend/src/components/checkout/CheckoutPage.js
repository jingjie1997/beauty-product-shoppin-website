import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import CartReview from './CartReview';
import ShippingForm from './ShippingForm';
import PaymentMethod from './PaymentMethod';
import OrderConfirmation from './OrderConfirmation';

const TOTAL_STEPS = 4;

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [shippingData, setShippingData] = useState({
    recipientName: '',
    recipientPhone: '',
    shippingAddress: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    goNext();
  };

  const handlePaymentSubmit = (method) => {
    setPaymentMethod(method);
    goNext();
  };

  return (
    <div className="min-h-screen bg-rose-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-rose-700 text-center mb-6">結帳</h1>
        <StepIndicator currentStep={currentStep} />

        <div className="bg-white rounded-2xl shadow-md p-6">
          {currentStep === 1 && (
            <CartReview onNext={goNext} />
          )}
          {currentStep === 2 && (
            <ShippingForm
              initialData={shippingData}
              onNext={handleShippingSubmit}
              onPrev={goPrev}
            />
          )}
          {currentStep === 3 && (
            <PaymentMethod
              initialValue={paymentMethod}
              onNext={handlePaymentSubmit}
              onPrev={goPrev}
            />
          )}
          {currentStep === 4 && (
            <OrderConfirmation
              shippingData={shippingData}
              paymentMethod={paymentMethod}
              onPrev={goPrev}
            />
          )}
        </div>
      </div>
    </div>
  );
}
