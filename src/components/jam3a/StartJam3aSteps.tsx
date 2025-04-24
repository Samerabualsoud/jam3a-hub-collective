
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { PlusCircle, Users, UserPlus, CheckCircle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface StepsContent {
  [key: string]: { steps: Step[] };
}

const content: StepsContent = {
  en: {
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
        icon: UserPlus
      },
      {
        title: "Save Together",
        description: "As more friends join, everyone gets better prices. You'll be notified as each person joins.",
        icon: CheckCircle
      }
    ]
  },
  ar: {
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
        icon: UserPlus
      },
      {
        title: "وفروا معًا",
        description: "كلما انضم المزيد من الأصدقاء، حصل الجميع على أسعار أفضل. سيتم إخطارك عند انضمام كل شخص.",
        icon: CheckCircle
      }
    ]
  }
};

const StartJam3aSteps = () => {
  const { language } = useLanguage();
  const steps = content[language].steps;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { staggerChildren: 0.2 }
        }
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
    >
      {steps.map((step, index) => (
        <motion.div 
          key={index}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
        >
          <Card className="border-2 border-royal-blue/10 hover:border-royal-blue/30 card-hover shadow-md hover:shadow-lg transition-all h-full">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-blue/10 text-royal-blue relative">
                  {React.createElement(step.icon, { size: 28 })}
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-royal-blue text-white text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-xl ml-4 text-royal-blue">{step.title}</h3>
              </div>
              <p className="text-muted-foreground text-base">{step.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StartJam3aSteps;
