
import React from 'react';
import { BadgePercent, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/Header';

interface Jam3aBenefitsProps {
  variant?: 'default' | 'compact';
  className?: string;
}

const Jam3aBenefits: React.FC<Jam3aBenefitsProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: BadgePercent,
      title: language === 'en' ? 'Group Discount' : 'خصم جماعي',
      description: language === 'en' ? 'Save by purchasing as a group' : 'وفر عن طريق الشراء كمجموعة'
    },
    {
      icon: Users,
      title: language === 'en' ? 'Safe & Secure' : 'آمن ومضمون',
      description: language === 'en' ? 'Protected payment process' : 'عملية دفع محمية'
    },
    {
      icon: ShieldCheck,
      title: language === 'en' ? 'Money-Back Guarantee' : 'ضمان استرداد الأموال',
      description: language === 'en' ? 'Full refund if group doesn\'t fill' : 'استرداد كامل إذا لم تمتلئ المجموعة'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-1 text-sm text-royal-blue bg-royal-blue-50 px-2 py-1 rounded-full">
            {React.createElement(benefit.icon, { size: 14 })}
            <span>{benefit.title}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`mt-8 ${className}`}>
      <h3 className="font-semibold mb-4 text-lg">
        {language === 'en' ? 'Jam3a Benefits' : 'مميزات الجمعة'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-start p-3 bg-royal-blue-50 rounded-lg hover:bg-royal-blue-100 transition-colors">
            <div className="mr-3 text-royal-blue">
              {React.createElement(benefit.icon, { size: 20 })}
            </div>
            <div>
              <h4 className="font-medium">{benefit.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jam3aBenefits;
