
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: {
    label: string;
  }[];
  currentStep: number;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className,
  direction = 'horizontal',
}) => {
  return (
    <div 
      className={cn(
        'w-full mb-8', 
        direction === 'vertical' ? 'flex flex-col gap-4' : '',
        className
      )}
    >
      <div className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col gap-4' : 'items-center justify-between'
      )}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={cn(
              'flex',
              direction === 'vertical' ? 'items-center' : 'flex-col items-center',
            )}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index <= currentStep ? 'bg-royal-blue text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index < currentStep ? 
                  <CheckCircle className="h-5 w-5" /> : 
                  <span>{index + 1}</span>
                }
              </div>
              <span className={`${
                direction === 'vertical' ? 'ml-3' : 'mt-1'
              } text-sm ${
                index <= currentStep ? 'text-royal-blue font-medium' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={cn(
                direction === 'vertical' 
                  ? 'w-0.5 h-6 ml-4 bg-gray-200'
                  : 'flex-1 mx-2',
              )}>
                {direction === 'horizontal' && (
                  <div className={`h-1 ${
                    index < currentStep ? 'bg-royal-blue' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
