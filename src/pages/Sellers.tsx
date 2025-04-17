import React from 'react';
import { BadgeInfo } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/Header';

const Sellers = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      bannerText: "Become a Jam3a Seller",
      title: "Sell More, Earn More with Jam3a",
      subtitle: "Join our group buying platform and unlock new sales opportunities",
    },
    ar: {
      bannerText: "كن بائعًا في جمعة",
      title: "بيع أكثر، واكسب أكثر مع جمعة",
      subtitle: "انضم إلى منصة الشراء الجماعي واكتشف فرص مبيعات جديدة"
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 relative">
        {/* Blue Banner */}
        <div className="absolute top-0 left-0 w-full bg-royal-blue text-white py-3 text-center flex items-center justify-center gap-2">
          <BadgeInfo className="h-5 w-5" />
          <span className="text-sm font-medium">
            {content[language].bannerText}
          </span>
        </div>

        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {content[language].title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {content[language].subtitle}
            </p>

            {/* Add more seller-related content here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sellers;
