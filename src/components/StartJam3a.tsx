
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const StartJam3a: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const content = {
    en: {
      title: "Start Your Own Jam3a",
      subtitle: "Group buying made simple and rewarding",
      description: "Creating a Jam3a is quick and easy. Select a product you love, set your group size, and watch the prices drop as more friends join!",
      steps: [
        {
          title: "Pick Your Product",
          description: "Choose from our curated selection of premium tech gadgets and more."
        },
        {
          title: "Set Your Group Size",
          description: "Decide how many people you want in your group. The bigger the group, the bigger the savings!"
        },
        {
          title: "Invite Friends",
          description: "Share your unique Jam3a link with friends, family, or colleagues via WhatsApp, social media, or email."
        }
      ],
      benefits: [
        "Save up to 30% on retail prices",
        "No payment until the group is complete",
        "Full refund if the group doesn't fill",
        "Secure transactions and guaranteed delivery"
      ],
      cta: "Start Your Jam3a Now",
      orJoin: "or",
      joinExisting: "Join an Existing Jam3a"
    },
    ar: {
      title: "ابدأ جمعتك الخاصة",
      subtitle: "الشراء الجماعي أصبح سهلاً ومجزياً",
      description: "إنشاء جمعة سريع وسهل. اختر منتجًا تحبه، وحدد حجم مجموعتك، وشاهد انخفاض الأسعار مع انضمام المزيد من الأصدقاء!",
      steps: [
        {
          title: "اختر منتجك",
          description: "اختر من بين مجموعتنا المنتقاة من الأجهزة التقنية الفاخرة والمزيد."
        },
        {
          title: "حدد حجم المجموعة",
          description: "قرر عدد الأشخاص الذين تريدهم في مجموعتك. كلما كبرت المجموعة، زادت التوفير!"
        },
        {
          title: "ادعُ أصدقائك",
          description: "شارك رابط جمعتك الفريد مع الأصدقاء أو العائلة أو الزملاء عبر واتساب أو وسائل التواصل الاجتماعي أو البريد الإلكتروني."
        }
      ],
      benefits: [
        "وفر حتى 30٪ من أسعار التجزئة",
        "لا دفع حتى تكتمل المجموعة",
        "استرداد كامل إذا لم تكتمل المجموعة",
        "معاملات آمنة وتسليم مضمون"
      ],
      cta: "ابدأ جمعتك الآن",
      orJoin: "أو",
      joinExisting: "انضم إلى جمعة موجودة"
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <Button variant="outline" size="sm" onClick={toggleLanguage} className="mb-6">
            <Globe className="h-4 w-4 mr-2" />
            {language === 'en' ? 'عربي' : 'English'}
          </Button>
          
          <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3">
              {content[language].title}
            </h2>
            <p className="text-lg text-jam3a-purple font-medium mb-4">
              {content[language].subtitle}
            </p>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
              {content[language].description}
            </p>
          </div>
        </div>

        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="grid md:grid-cols-3 gap-6 mb-12">
          {content[language].steps.map((step, index) => (
            <Card key={index} className="border-2 border-jam3a-purple/10 hover:border-jam3a-purple/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-jam3a-purple/10 text-jam3a-purple">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-lg ml-3">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="bg-gradient-to-r from-jam3a-purple to-jam3a-accent rounded-2xl p-8 text-white mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Why Start a Jam3a?' : 'لماذا تبدأ جمعة؟'}
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {content[language].benefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Button size="lg" className="bg-jam3a-purple hover:bg-jam3a-deep-purple text-white px-8">
            <Link to="/start-jam3a" className="flex items-center gap-2">
              {content[language].cta}
              {language === 'en' ? <ArrowRight className="h-4 w-4" /> : null}
              {language === 'ar' ? null : null}
            </Link>
          </Button>
          <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="flex items-center gap-2">
            <span className="text-muted-foreground">{content[language].orJoin}</span>
            <Button variant="link" className="text-jam3a-purple">
              <Link to="/shop" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {content[language].joinExisting}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartJam3a;
