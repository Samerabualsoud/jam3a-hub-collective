
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, PlusCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './Header';
import Jam3aBenefits from './Jam3aBenefits';

const StartJam3a: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const { toast } = useToast();
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Start Your Own Jam3a",
      subtitle: "Group buying made simple and rewarding",
      description: "Creating a Jam3a is quick and easy. Select a product you love, set your group size, and watch the prices drop as more friends join!",
      steps: [
        {
          title: "Pick Your Product",
          description: "Choose from our curated selection of premium tech gadgets and more.",
          icon: PlusCircle
        },
        {
          title: "Set Your Group Size",
          description: "Decide how many people you want in your group. The bigger the group, the bigger the savings!",
          icon: Users
        },
        {
          title: "Invite Friends",
          description: "Share your unique Jam3a link with friends, family, or colleagues via WhatsApp, social media, or email.",
          icon: TrendingUp
        }
      ],
      cta: "Start Your Jam3a Now",
      orJoin: "or",
      joinExisting: "Join an Existing Jam3a",
      whyStart: "Why Start a Jam3a?"
    },
    ar: {
      title: "ابدأ جمعتك الخاصة",
      subtitle: "الشراء الجماعي بسيط ومجزٍ",
      description: "إنشاء جمعة سريع وسهل. اختر المنتج الذي تحبه، حدد حجم المجموعة، وشاهد الأسعار تنخفض كلما انضم المزيد من الأصدقاء!",
      steps: [
        {
          title: "اختر منتجك",
          description: "اختر من مجموعتنا المنتقاة من أجهزة التكنولوجيا الفاخرة والمزيد.",
          icon: PlusCircle
        },
        {
          title: "حدد حجم مجموعتك",
          description: "قرر عدد الأشخاص الذين تريدهم في مجموعتك. كلما كبرت المجموعة، زادت التوفيرات!",
          icon: Users
        },
        {
          title: "ادعُ أصدقاءك",
          description: "شارك رابط جمعتك الفريد مع الأصدقاء والعائلة أو الزملاء عبر واتساب أو وسائل التواصل الاجتماعي أو البريد الإلكتروني.",
          icon: TrendingUp
        }
      ],
      cta: "ابدأ جمعتك الآن",
      orJoin: "أو",
      joinExisting: "انضم إلى جمعة موجودة",
      whyStart: "لماذا تبدأ جمعة؟"
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-white to-royal-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Background decoration elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-royal-blue/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-royal-blue-accent/5 rounded-full filter blur-3xl"></div>
        
        <div className="flex flex-col items-center text-center mb-12 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3 bg-gradient-to-r from-royal-blue to-royal-blue-light text-transparent bg-clip-text">
              {content[language].title}
            </h2>
            <p className="text-lg text-royal-blue font-medium mb-3">
              {content[language].subtitle}
            </p>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {content[language].description}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          {/* Step selector for mobile */}
          <div className="md:hidden mb-4">
            <div className="w-full border rounded-lg shadow-sm p-1 flex">
              {content[language].steps.map((_, index) => (
                <button 
                  key={index} 
                  className={`flex-1 py-2 rounded-md ${selectedStepIndex === index ? 'bg-royal-blue text-white' : 'bg-transparent text-foreground'}`}
                  onClick={() => setSelectedStepIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <Card className="mt-4 border-2 border-royal-blue/10 hover:border-royal-blue/30 transition-colors shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-royal-blue/10 text-royal-blue">
                    {React.createElement(content[language].steps[selectedStepIndex].icon, { size: 24 })}
                  </div>
                  <h3 className="font-semibold text-lg ml-3">{content[language].steps[selectedStepIndex].title}</h3>
                </div>
                <p className="text-muted-foreground">{content[language].steps[selectedStepIndex].description}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Desktop steps */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {content[language].steps.map((step, index) => (
              <Card 
                key={index} 
                className="border-2 border-royal-blue/10 hover:border-royal-blue/30 card-hover shadow-sm hover:shadow-md transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-royal-blue/10 text-royal-blue relative">
                      {React.createElement(step.icon, { size: 24 })}
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-royal-blue text-white text-sm font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl ml-4 text-royal-blue">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-royal-blue to-royal-blue-light rounded-2xl p-8 text-white mb-12 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-6">
              {content[language].whyStart}
            </h3>
            <Jam3aBenefits className="text-white" />
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Link to="/start-jam3a" className="w-full max-w-xs">
            <Button 
              variant="green"
              size="lg" 
              className="w-full text-white px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <span className="flex items-center gap-2">
                {content[language].cta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-muted-foreground">{content[language].orJoin}</span>
            <Button variant="link" className="text-royal-blue hover:text-royal-blue-dark">
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
