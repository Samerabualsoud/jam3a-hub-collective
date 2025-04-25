
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodOptionProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

const PaymentMethodOption = ({
  id,
  name,
  description,
  icon,
  isSelected,
  onSelect
}: PaymentMethodOptionProps) => {
  return (
    <div
      className={`flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:border-royal-blue transition-colors ${
        isSelected ? 'border-royal-blue bg-royal-blue/5' : ''
      }`}
      onClick={onSelect}
    >
      <RadioGroupItem value={id} id={id} />
      <div className="flex-1 flex items-center gap-4">
        {icon}
        <div>
          <Label htmlFor={id} className="text-base font-medium">
            {name}
          </Label>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodOption;
