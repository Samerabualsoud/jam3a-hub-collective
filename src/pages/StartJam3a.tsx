
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import StartJam3aHeader from '@/components/jam3a/StartJam3aHeader';
import StartJam3aSteps from '@/components/jam3a/StartJam3aSteps';
import StartJam3aCTA from '@/components/jam3a/StartJam3aCTA';

const StartJam3a: React.FC = () => {
  const { language } = useLanguage();

  const stats = {
    en: [
      { value: "25%", label: "Average Savings" },
      { value: "5+", label: "Products Categories" },
      { value: "1K+", label: "Happy Customers" }
    ],
    ar: [
      { value: "25%", label: "متوسط التوفير" },
      { value: "5+", label: "فئات المنتجات" },
      { value: "1K+", label: "عميل سعيد" }
    ]
  };

  return (
    <section id="start-jam3a" className="py-16 md:py-24 bg-gradient-to-br from-white via-royal-blue-50/50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Background decoration elements */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-royal-blue/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-royal-blue-accent/5 rounded-full filter blur-3xl"></div>
        
        <StartJam3aHeader stats={stats[language]} />
        <StartJam3aSteps />
        <StartJam3aCTA />
      </div>
    </section>
  );
};

export default StartJam3a;
