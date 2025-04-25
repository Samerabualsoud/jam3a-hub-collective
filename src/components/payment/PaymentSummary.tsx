
import React from 'react';

interface PaymentSummaryProps {
  product: {
    name: string;
  };
  groupSize: number;
  discountPrice: number;
  content: {
    product: string;
    groupSize: string;
    people: string;
    total: string;
  };
}

const PaymentSummary = ({ product, groupSize, discountPrice, content }: PaymentSummaryProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">{content.product}:</span>
          <span className="font-medium">{product.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{content.groupSize}:</span>
          <span className="font-medium">{groupSize} {content.people}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
          <span>{content.total}:</span>
          <span className="text-royal-blue">{discountPrice} SAR</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
