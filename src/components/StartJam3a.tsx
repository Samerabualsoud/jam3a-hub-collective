
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, PlusCircle, TrendingUp, UserPlus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import Jam3aBenefits from './Jam3aBenefits';
import { motion } from 'framer-motion';

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
          icon: UserPlus
        },
        {
          title: "Save Together",
          description: "As more friends join, everyone gets better prices. You'll be notified as each person joins.",
          icon: CheckCircle
        }
      ],
      cta: "Start Your Jam3a Now",
      orJoin: "or",
      joinExisting: "Join an Existing Jam3a",
      whyStart: "Why Start a Jam3a?",
      stats: [
        { value: "25%", label: "Average Savings" },
        { value: "5+", label: "Products Categories" },
        { value: "1K+", label: "Happy Customers" }
      ]
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
          icon: UserPlus
        },
        {
          title: "وفروا معًا",
          description: "كلما انضم المزيد من الأصدقاء، حصل الجميع على أسعار أفضل. سيتم إخطارك عند انضمام كل شخص.",
          icon: CheckCircle
        }
      ],
      cta: "ابدأ جمعتك الآن",
      orJoin: "أو",
      joinExisting: "انضم إلى جمعة موجودة",
      whyStart: "لماذا تبدأ جمعة؟",
      stats: [
        { value: "25%", label: "متوسط التوفير" },
        { value: "5+", label: "فئات المنتجات" },
        { value: "1K+", label: "عميل سعيد" }
      ]
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="start-jam3a" className="py-16 md:py-24 bg-gradient-to-br from-white via-royal-blue-50/50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Background decoration elements */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-royal-blue/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-royal-blue-accent/5 rounded-full filter blur-3xl"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-16 relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-3">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-royal-blue/10 text-royal-blue border border-royal-blue/20">
              {language === 'en' ? "Easy to Use" : "سهل الاستخدام"}
            </span>
          </motion.div>
          <motion.div variants={itemVariants} className="max-w-3xl">
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
          
          {/* Statistics */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 md:gap-16 mt-6 mb-8">
            {content[language].stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-royal-blue">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-16">
          {/* Step selector for mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:hidden mb-6"
          >
            <div className="w-full border rounded-lg shadow-sm p-1 flex">
              {content[language].steps.map((_, index) => (
                <button 
                  key={index} 
                  className={`flex-1 py-2 rounded-md transition-colors duration-300 ${selectedStepIndex === index ? 'bg-royal-blue text-white' : 'bg-transparent text-foreground'}`}
                  onClick={() => setSelectedStepIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <Card className="mt-4 border-2 border-royal-blue/10 hover:border-royal-blue/30 transition-colors shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-blue/10 text-royal-blue">
                    {React.createElement(content[language].steps[selectedStepIndex].icon, { size: 28 })}
                  </div>
                  <h3 className="font-semibold text-lg ml-4">{content[language].steps[selectedStepIndex].title}</h3>
                </div>
                <p className="text-muted-foreground">{content[language].steps[selectedStepIndex].description}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Desktop steps */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {content[language].steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card 
                  className="border-2 border-royal-blue/10 hover:border-royal-blue/30 card-hover shadow-md hover:shadow-lg transition-all h-full"
                >
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
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-r from-royal-blue to-royal-blue-light rounded-3xl p-10 text-white mb-16 shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-6">
              {content[language].whyStart}
            </h3>
            <Jam3aBenefits className="text-white" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <Link to="/start-jam3a" className="w-full max-w-xs">
            <Button 
              variant="green"
              size="lg" 
              className="w-full text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl bg-gradient-to-r from-royal-blue to-royal-blue-light transition-all duration-300 hover:-translate-y-1 group rounded-xl"
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
        </motion.div>
      </div>
    </section>
  );
};

export default StartJam3a;
