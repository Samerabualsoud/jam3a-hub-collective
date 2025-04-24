
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
      pay: "Pay & Publish"
    },
    ar: {
      next: "التالي",
      previous: "السابق",
      pay: "الدفع والنشر"
    }
  };

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
        variant="green"
        onClick={onNext}
        className="gap-2"
        disabled={isLoading}
      >
        {currentStep === 4 ? content[language].pay : content[language].next}
        {currentStep !== 4 && <ArrowRight className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default StepNavigation;
