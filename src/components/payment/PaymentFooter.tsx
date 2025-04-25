
import React from 'react';

interface PaymentFooterProps {
  securePayment: string;
}

const PaymentFooter = ({ securePayment }: PaymentFooterProps) => {
  return (
    <>
      <div className="text-center text-sm text-gray-500 mt-4">
        {securePayment}
      </div>

      <div className="flex justify-center gap-4 items-center mt-6">
        <img src="/images/payment-logos/visa.svg" alt="Visa" className="h-6" />
        <img src="/images/payment-logos/mastercard.svg" alt="Mastercard" className="h-6" />
        <img src="/images/payment-logos/mada.svg" alt="Mada" className="h-6" />
        <img src="/images/payment-logos/apple-pay.svg" alt="Apple Pay" className="h-6" />
      </div>
    </>
  );
};

export default PaymentFooter;
