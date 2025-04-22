
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  return (
    <section className="relative flex items-center justify-center min-h-[420px] md:min-h-[500px] lg:min-h-[600px] px-4 overflow-hidden bg-gradient-to-br from-royal-blue-50 via-white to-royal-blue/5">
      {/* Animated Gradient Blobs */}
      <div
        aria-hidden
        className="absolute left-1/2 top-8 -translate-x-1/2 w-[540px] h-[540px] bg-gradient-to-br from-royal-blue via-royal-blue-light to-white rounded-full opacity-40 blur-3xl animate-float z-0"
        style={{
          filter: 'blur(96px)',
        }}
      />
      <div
        aria-hidden
        className="absolute right-10 bottom-0 w-[220px] h-[220px] bg-royal-blue-dark rounded-full opacity-20 blur-2xl animate-fade-in"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-gradient-blue animate-fade-in">
          {language === 'en'
            ? <>Unlock <span className="text-royal-blue-dark">Better Prices</span> <br /> with <span className='drop-shadow font-extrabold text-gradient-blue'>Jam3a</span></>
            : <>احصل على <span className="text-royal-blue-dark">أفضل الأسعار</span> <br /> مع <span className='drop-shadow font-extrabold text-gradient-blue'>جمعة</span></>
          }
        </h1>
        <p className="mb-8 max-w-xl text-lg md:text-xl text-gray-700 dark:text-gray-200 animate-fade-in">
          {language === 'en'
            ? "The ultimate group-buying platform: Save more when you shop together in Saudi Arabia."
            : "منصة الشراء الجماعي الأفضل – كلما زاد عدد المشاركين، زادت التوفيرات في السعودية."
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link to="/shop">
            <Button
              size="lg"
              variant="green"
              className="text-lg shadow-md px-8 py-6 group"
            >
              {language === 'en' ? 'View All Deals' : 'اعرض جميع العروض'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/start-jam3a">
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white shadow px-8 py-6"
            >
              {language === 'en' ? 'Start a Jam3a' : 'ابدأ جمعة'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
