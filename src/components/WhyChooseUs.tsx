
import React from 'react';
import { BadgePercent, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { useLanguage } from './Header';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: <BadgePercent className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Better Prices",
        ar: "أسعار أفضل"
      },
      description: {
        en: "Unlock discounts of up to 30% when you buy together with others.",
        ar: "احصل على خصومات تصل إلى 30% عند الشراء مع آخرين."
      }
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-royal-green" />,
      title: {
        en: "100% Secure",
        ar: "آمن 100%"
      },
      description: {
        en: "Your payment is only processed when the group is successfully formed.",
        ar: "يتم معالجة الدفع فقط عند تكوين المجموعة بنجاح."
      }
    },
    {
      icon: <Clock className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Fast Delivery",
        ar: "توصيل سريع"
      },
      description: {
        en: "Receive your products within 2-5 business days across Saudi Arabia.",
        ar: "استلم منتجاتك خلال 2-5 أيام عمل في جميع أنحاء المملكة العربية السعودية."
      }
    },
    {
      icon: <CreditCard className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Multiple Payment Options",
        ar: "خيارات دفع متعددة"
      },
      description: {
        en: "Pay with Mada, STC Pay, Apple Pay, or credit cards.",
        ar: "ادفع باستخدام مدى، STC Pay، Apple Pay، أو بطاقات الائتمان."
      }
    }
  ];

  return (
    <section className="bg-royal-green-50 py-12 md:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-green/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-royal-green/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3 text-gradient-green">
            {language === 'en' ? 'Why Choose Jam3a' : 'لماذا تختار جمعة'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'en'
              ? "We're revolutionizing shopping in Saudi Arabia through the power of group buying"
              : "نحن نُحدث ثورة في التسوق في المملكة العربية السعودية من خلال قوة الشراء الجماعي"}
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="rounded-xl border border-royal-green/10 bg-white p-6 shadow-sm card-hover"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-royal-green/10 animate-bounce-light">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-royal-green">{feature.title[language]}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
