
import React from 'react';
import { motion } from 'framer-motion';
import { StepIndicator } from '@/components/ui/step-indicator';
import { useLanguage } from '@/contexts/LanguageContext';

interface StepLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

const StepLayout: React.FC<StepLayoutProps> = ({ currentStep, children }) => {
  const { language } = useLanguage();
  
  const steps = language === 'en' 
    ? ["Choose Category", "Select Product", "Set Group Details", "Review & Confirm"]
    : ["اختر الفئة", "حدد المنتج", "حدد تفاصيل المجموعة", "مراجعة وتأكيد"];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-royal-blue to-royal-blue-light text-transparent bg-clip-text">
          {language === 'en' ? "Start Your Own Jam3a" : "ابدأ جمعتك الخاصة"}
        </h1>
        <p className="text-muted-foreground">
          {language === 'en' 
            ? "Group buying made simple and rewarding" 
            : "الشراء الجماعي بسيط ومجزٍ"}
        </p>
        <div className="mb-8">
          <StepIndicator 
            steps={steps} 
            currentStep={currentStep - 1} 
            className="mt-6"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default StepLayout;
