
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BadgePercent, Clock, CreditCard, Shield, Users, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Jam3aBenefitsProps {
  className?: string;
}

const Jam3aBenefits: React.FC<Jam3aBenefitsProps> = ({ className }) => {
  const { language } = useLanguage();
  
  const benefits = {
    en: [
      {
        icon: BadgePercent,
        title: 'Better Prices',
        description: 'Save up to 25% on retail prices with group buying power'
      },
      {
        icon: Users,
        title: 'Social Shopping',
        description: 'Connect with friends and family to shop together'
      },
      {
        icon: Shield,
        title: '100% Guaranteed',
        description: 'Money-back guarantee if you're not satisfied'
      },
      {
        icon: Clock,
        title: 'Time-Limited',
        description: 'Dynamic pricing that rewards quick group formation'
      },
      {
        icon: CreditCard,
        title: 'Secure Payment',
        description: 'Trusted payment options with full encryption'
      },
      {
        icon: Check,
        title: 'Verified Quality',
        description: 'All products are verified for authenticity and quality'
      }
    ],
    ar: [
      {
        icon: BadgePercent,
        title: 'أسعار أفضل',
        description: 'وفر حتى 25% من أسعار التجزئة مع قوة الشراء الجماعي'
      },
      {
        icon: Users,
        title: 'تسوق اجتماعي',
        description: 'تواصل مع الأصدقاء والعائلة للتسوق معًا'
      },
      {
        icon: Shield,
        title: 'مضمون 100%',
        description: 'ضمان استرداد الأموال إذا لم تكن راضيًا'
      },
      {
        icon: Clock,
        title: 'محدود الوقت',
        description: 'تسعير ديناميكي يكافئ تشكيل المجموعة السريع'
      },
      {
        icon: CreditCard,
        title: 'دفع آمن',
        description: 'خيارات دفع موثوقة مع تشفير كامل'
      },
      {
        icon: Check,
        title: 'جودة موثقة',
        description: 'يتم التحقق من جميع المنتجات للتأكد من أصالتها وجودتها'
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ${className}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {benefits[language].map((benefit, index) => (
        <motion.div 
          key={index} 
          variants={itemVariants}
          className="flex flex-col items-center text-center p-4 hover:bg-white/10 rounded-xl transition-colors"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-4">
            <benefit.icon size={24} />
          </div>
          <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
          <p className="text-sm opacity-85">{benefit.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Jam3aBenefits;
