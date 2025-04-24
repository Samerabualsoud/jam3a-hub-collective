
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface StartJam3aHeaderProps {
  stats: Array<{ value: string; label: string }>;
}

const StartJam3aHeader: React.FC<StartJam3aHeaderProps> = ({ stats }) => {
  const { language } = useLanguage();

  const content = {
    en: {
      badge: "Easy to Use",
      title: "Start Your Own Jam3a",
      subtitle: "Group buying made simple and rewarding",
      description: "Creating a Jam3a is quick and easy. Select a product you love, set your group size, and watch the prices drop as more friends join!"
    },
    ar: {
      badge: "سهل الاستخدام",
      title: "ابدأ جمعتك الخاصة",
      subtitle: "الشراء الجماعي بسيط ومجزٍ",
      description: "إنشاء جمعة سريع وسهل. اختر المنتج الذي تحبه، حدد حجم المجموعة، وشاهد الأسعار تنخفض كلما انضم المزيد من الأصدقاء!"
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.2,
            delayChildren: 0.3
          }
        }
      }}
      className="flex flex-col items-center text-center mb-16 relative z-10"
    >
      <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="mb-3">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-royal-blue/10 text-royal-blue border border-royal-blue/20">
          {content[language].badge}
        </span>
      </motion.div>
      <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4 bg-gradient-to-r from-royal-blue to-royal-blue-light text-transparent bg-clip-text">
          {content[language].title}
        </h2>
        <p className="text-lg text-royal-blue font-medium mb-3">
          {content[language].subtitle}
        </p>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
          {content[language].description}
        </p>
      </motion.div>
      
      <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-wrap justify-center gap-8 md:gap-16 mt-6">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-royal-blue">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default StartJam3aHeader;
