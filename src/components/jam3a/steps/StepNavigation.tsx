
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StepNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  isLoading?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ 
  onNext, 
  onPrevious, 
  currentStep,
  isLoading 
}) => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      next: "Next",
      previous: "Back",
      pay: "Pay Now"
    },
    ar: {
      next: "التالي",
      previous: "السابق",
      pay: "ادفع الآن"
    }
  };

  const isPaymentStep = currentStep === 4;

  return (
    <div className="flex justify-between mt-8">
      <Button 
        variant="outline" 
        onClick={onPrevious}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        {content[language].previous}
      </Button>
      <Button 
        variant={isPaymentStep ? "green" : "default"}
        onClick={onNext}
        className="gap-2"
        disabled={isLoading}
      >
        {isPaymentStep ? (
          <>
            {content[language].pay}
            <CreditCard className="h-4 w-4 ml-1" />
          </>
        ) : (
          <>
            {content[language].next}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default StepNavigation;
