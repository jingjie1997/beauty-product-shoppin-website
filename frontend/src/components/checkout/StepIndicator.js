import React from 'react';

const STEPS = [
  { label: '確認購物車' },
  { label: '收件資料' },
  { label: '付款方式' },
  { label: '訂單確認' },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, index) => {
        const stepNum = index + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <React.Fragment key={stepNum}>
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm
                  ${isDone ? 'bg-rose-500 text-white' : ''}
                  ${isActive ? 'bg-rose-600 text-white ring-2 ring-rose-300' : ''}
                  ${!isDone && !isActive ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <span
                className={`mt-1 text-xs font-medium
                  ${isActive ? 'text-rose-600' : ''}
                  ${isDone ? 'text-rose-400' : ''}
                  ${!isDone && !isActive ? 'text-gray-400' : ''}
                `}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-4
                  ${stepNum < currentStep ? 'bg-rose-400' : 'bg-gray-200'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
