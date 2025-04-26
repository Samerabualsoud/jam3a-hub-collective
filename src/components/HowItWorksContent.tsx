
import React from 'react';
import { Users, Timer, Share2, ShoppingBag, Gift, CreditCard, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const HowItWorksContent = () => {
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

  const benefits = [
    {
      icon: <TrendingDown className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Lower Prices",
        ar: "أسعار أقل"
      },
      description: {
        en: "Get discounts of 10-30% off retail prices through the power of group buying.",
        ar: "احصل على خصومات من 10-30% على أسعار التجزئة من خلال قوة الشراء الجماعي."
      }
    },
    {
      icon: <Gift className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Exclusive Offers",
        ar: "عروض حصرية"
      },
      description: {
        en: "Access to limited-time deals and products available only to Jam3a members.",
        ar: "الوصول إلى صفقات منتجات محدودة الوقت المتاحة فقط لأعضاء جمعة."
      }
    },
    {
      icon: <CreditCard className="h-10 w-10 text-royal-green" />,
      title: {
        en: "Secure Payments",
        ar: "مدفوعات آمنة"
      },
      description: {
        en: "Your payment is secure and only processed when the group is complete.",
        ar: "دفعتك آمنة ويتم معالجتها فقط عند اكتمال المجموعة."
      }
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-br from-white to-green-50">
        <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6 text-royal-green">
              {language === 'en' ? 'How Jam3a Works' : 'كيف تعمل جمعة'}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {language === 'en' 
                ? 'Group buying made easy, fun, and rewarding. Save money on all your favorite products.' 
                : 'الشراء الجماعي أصبح سهلاً، ممتعًا، ومجزيًا. وفر المال على جميع منتجاتك المفضلة.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-royal-green hover:bg-royal-green/90">
                <Link to="/start-jam3a">
                  {language === 'en' ? 'Start a Jam3a' : 'ابدأ جمعة جديدة'}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-royal-green text-royal-green hover:bg-royal-green/10">
                <Link to="/join-jam3a">
                  {language === 'en' ? 'Join a Jam3a' : 'انضم إلى جمعة'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3 text-gradient-green">
              {language === 'en' ? 'Simple 4-Step Process' : 'عملية بسيطة من 4 خطوات'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'en' 
                ? 'Join forces with others to unlock better prices on premium products' 
                : 'انضم إلى الآخرين لفتح أسعار أفضل للمنتجات المميزة'}
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

      {/* Benefits Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3 text-gradient-green">
              {language === 'en' ? 'The Benefits of Jam3a' : 'فوائد جمعة'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'en' 
                ? 'Why choosing Jam3a makes sense for smart shoppers' 
                : 'لماذا اختيار جمعة يعتبر منطقي للمتسوقين الأذكياء'}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center card-hover bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-royal-green/10 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-royal-green mb-2">{benefit.title[language]}</h3>
                <p className="text-muted-foreground">{benefit.description[language]}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-royal-green hover:bg-royal-green/90">
              <Link to="/start-jam3a">
                {language === 'en' ? 'Get Started Now' : 'ابدأ الآن'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-4">
              {language === 'en' ? 'Have Questions?' : 'لديك أسئلة؟'}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {language === 'en' 
                ? 'Check our FAQs for more information about how Jam3a works' 
                : 'تحقق من الأسئلة الشائعة لمزيد من المعلومات حول كيفية عمل جمعة'}
            </p>
            <Button variant="outline" className="border-royal-green text-royal-green hover:bg-royal-green/10">
              <Link to="/faq">
                {language === 'en' ? 'View FAQ' : 'عرض الأسئلة الشائعة'}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksContent;
