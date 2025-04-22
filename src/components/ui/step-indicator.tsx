
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const StepIndicator = ({ 
  steps, 
  currentStep,
  className
}: StepIndicatorProps) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div 
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all",
                index < currentStep 
                  ? "bg-royal-blue border-royal-blue text-white" 
                  : index === currentStep 
                    ? "border-royal-blue text-royal-blue bg-white" 
                    : "border-gray-300 text-gray-400 bg-white"
              )}
            >
              {index < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span 
              className={cn(
                "mt-2 text-xs max-w-[80px] text-center whitespace-nowrap",
                index === currentStep 
                  ? "text-royal-blue font-medium" 
                  : "text-gray-500"
              )}
            >
              {step}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "w-16 h-[2px] mx-2",
                index < currentStep 
                  ? "bg-royal-blue" 
                  : "bg-gray-300"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
