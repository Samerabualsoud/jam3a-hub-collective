
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const { language } = useLanguage();

  const testimonials = {
    en: [
      {
        name: "Ahmed S.",
        location: "Riyadh",
        image: "https://i.pravatar.cc/150?img=11",
        text: "I saved 25% on my new smartphone by joining a Jam3a! The process was so smooth and the support team was super helpful.",
        stars: 5
      },
      {
        name: "Layla M.",
        location: "Jeddah",
        image: "https://i.pravatar.cc/150?img=32",
        text: "Started my first Jam3a last month for a gaming console. Filled the group in just 2 days and everyone received their items on time!",
        stars: 5
      },
      {
        name: "Khalid A.",
        location: "Dammam",
        image: "https://i.pravatar.cc/150?img=53",
        text: "Jam3a has changed how I shop for tech. I've participated in 3 Jam3as so far and saved thousands of riyals.",
        stars: 4
      }
    ],
    ar: [
      {
        name: "أحمد س.",
        location: "الرياض",
        image: "https://i.pravatar.cc/150?img=11",
        text: "وفرت 25% على هاتفي الذكي الجديد من خلال الانضمام إلى جمعة! كانت العملية سلسة للغاية وكان فريق الدعم متعاونًا جدًا.",
        stars: 5
      },
      {
        name: "ليلى م.",
        location: "جدة",
        image: "https://i.pravatar.cc/150?img=32",
        text: "بدأت أول جمعة لي الشهر الماضي لشراء جهاز ألعاب. امتلأت المجموعة في يومين فقط وتلقى الجميع أغراضهم في الوقت المحدد!",
        stars: 5
      },
      {
        name: "خالد أ.",
        location: "الدمام",
        image: "https://i.pravatar.cc/150?img=53",
        text: "غيرت جمعة طريقتي في التسوق للتقنية. لقد شاركت في 3 جمعات حتى الآن ووفرت آلاف الريالات.",
        stars: 4
      }
    ]
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-3 text-gradient-green">
            {language === 'en' ? 'What Our Users Say' : 'ماذا يقول مستخدمونا'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'en'
              ? "Join thousands of satisfied shoppers across Saudi Arabia"
              : "انضم إلى آلاف المتسوقين الراضين في جميع أنحاء المملكة العربية السعودية"}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials[language].map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-royal-green/10 shadow-sm card-hover relative"
            >
              <div className="absolute -top-3 -left-3">
                <div className="bg-royal-green text-white rounded-full p-2 shadow-md">
                  <Quote size={20} />
                </div>
              </div>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`inline-block ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-royal-green text-white">
                    {testimonial.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-royal-green">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
