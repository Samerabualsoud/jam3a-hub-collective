
import React from 'react';
import { Users, Timer, Share2, ShoppingBag } from 'lucide-react';
import { useLanguage } from './Header';

const HowItWorks = () => {
  const { language } = useLanguage();

  const steps = [
    {
      icon: <Users className="h-10 w-10 text-jam3a-purple" />,
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
      icon: <Share2 className="h-10 w-10 text-jam3a-purple" />,
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
      icon: <Timer className="h-10 w-10 text-jam3a-purple" />,
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
      icon: <ShoppingBag className="h-10 w-10 text-jam3a-purple" />,
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
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {language === 'en' ? 'How Jam3a Works' : 'كيف تعمل جمعة'}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {language === 'en' 
              ? 'Simple steps to save money through the power of group buying' 
              : 'خطوات بسيطة لتوفير المال من خلال قوة الشراء الجماعي'}
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-jam3a-purple/10">
                {step.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title[language]}</h3>
              <p className="mt-2 text-muted-foreground">{step.description[language]}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
