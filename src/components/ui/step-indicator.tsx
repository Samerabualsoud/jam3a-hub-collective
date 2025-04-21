
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps?: { label: string }[];
  currentStep: number;
  children?: ReactNode;
}

export function StepIndicator({ steps = [], currentStep = 0, children }: StepIndicatorProps) {
  // Use either the steps prop array or children as steps
  const useChildren = !steps.length && React.Children.count(children) > 0;
  const stepsCount = useChildren ? React.Children.count(children) : steps.length;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {useChildren ? (
          React.Children.map(children, (child, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center space-y-2",
                index <= currentStep ? "text-royal-blue" : "text-gray-400"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  index < currentStep
                    ? "bg-royal-blue text-white border-royal-blue"
                    : index === currentStep
                    ? "border-royal-blue text-royal-blue"
                    : "border-gray-300 text-gray-400"
                )}
              >
                {index < currentStep ? (
                  "✓"
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="text-sm font-medium">{child}</span>
            </div>
          ))
        ) : (
          steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center space-y-2",
                index <= currentStep ? "text-royal-blue" : "text-gray-400"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2",
                  index < currentStep
                    ? "bg-royal-blue text-white border-royal-blue"
                    : index === currentStep
                    ? "border-royal-blue text-royal-blue"
                    : "border-gray-300 text-gray-400"
                )}
              >
                {index < currentStep ? (
                  "✓"
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="text-sm font-medium">{step.label}</span>
            </div>
          ))
        )}
      </div>

      <div className="relative mt-2">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200" />
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-royal-blue transition-all duration-300"
          style={{
            width: `${Math.min(100, (100 * currentStep) / (stepsCount - 1))}%`,
          }}
        />
      </div>
    </div>
  );
}
