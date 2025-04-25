
import React from 'react';
import { Users, Timer, Share2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = [
    {
      icon: <Users className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Start or Join a Jam3a",
        ar: "ابدأ أو انضم إلى جمعة"
      },
      description: {
        en: "Create your own group or join an existing one for the product you want.",
        ar: "أنشئ مجموعتك الخاصة أو انضم إلى مجموعة موجودة للمنتج الذي تريده."
      }
    },
    {
      icon: <Share2 className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Invite Friends",
        ar: "ادعُ أصدقاءك"
      },
      description: {
        en: "Share your Jam3a link with friends and family via WhatsApp, Snapchat, or social media.",
        ar: "شارك رابط جمعتك مع الأصدقاء والعائلة عبر واتساب أو سناب شات أو وسائل التواصل الاجتماعي."
      }
    },
    {
      icon: <Timer className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Fill the Group",
        ar: "أكمل المجموعة"
      },
      description: {
        en: "Complete your group within the time limit to unlock the group discount.",
        ar: "أكمل مجموعتك ضمن الوقت المحدد للحصول على الخصم الجماعي."
      }
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Everyone Saves",
        ar: "الجميع يوفر"
      },
      description: {
        en: "Once the group is complete, everyone pays the discounted price and receives their order.",
        ar: "بمجرد اكتمال المجموعة، يدفع الجميع السعر المخفض ويستلمون طلباتهم."
      }
    }
  ];

  return (
    <section id="how-it-works" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3 text-gradient-green">
            {language === 'en' ? 'How Jam3a Works' : 'كيف تعمل جمعة'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'en' 
              ? 'Simple steps to save money through the power of group buying' 
              : 'خطوات بسيطة لتوفير المال من خلال قوة الشراء الجماعي'}
          </p>
        </div>
        
        {/* Desktop zigzag path */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
            <svg className="w-full" height="50" viewBox="0 0 1000 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,25 Q250,0 500,25 T1000,25" stroke="#146B3A" strokeWidth="2" strokeDasharray="5,5" fill="none"/>
            </svg>
          </div>
        </div>
        
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center card-hover bg-white p-6 rounded-xl border border-royal-green/10"
            >
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-royal-green/10 mb-4 animate-bounce-light">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-royal-green text-white text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-royal-green">{step.title[language]}</h3>
              <p className="mt-2 text-muted-foreground">{step.description[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
