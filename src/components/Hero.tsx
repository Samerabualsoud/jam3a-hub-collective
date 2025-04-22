
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  return (
    <section className="relative flex items-center justify-center min-h-[480px] md:min-h-[600px] lg:min-h-[700px] px-4 overflow-hidden bg-gradient-to-br from-royal-blue-50 via-white to-royal-blue/10 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.12),transparent_60%)] before:z-0">
      {/* Decorative product images */}
      <img
        src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80"
        alt="iPhone"
        className="absolute top-8 left-16 w-40 h-40 object-cover rounded-xl shadow-royal-blue/10 opacity-80 animate-float z-10 hidden md:block"
        style={{ filter: 'blur(0.5px)' }}
      />
      <img
        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
        alt="Laptop"
        className="absolute bottom-12 right-20 w-48 h-32 object-cover rounded-xl shadow-royal-blue/10 opacity-60 animate-float z-10 hidden lg:block"
        style={{ filter: 'blur(0.7px)' }}
      />

      {/* Central content */}
      <div className="relative z-20 flex flex-col items-center text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-1 rounded-full font-medium text-sm bg-royal-blue/90 text-white shadow jam3a-badge animate-fade-in">
            {language === 'en'
              ? "Join a Jam3a and save up to 25%"
              : "انضم إلى جمعة ووفر حتى ٢٥٪"}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 text-gradient-blue animate-fade-in drop-shadow">
          {language === 'en'
            ? <>Unlock <span className="text-royal-blue-dark">Better Prices</span> <br /> with <span className='drop-shadow font-extrabold text-gradient-blue'>Jam3a</span></>
            : <>احصل على <span className="text-royal-blue-dark">أفضل الأسعار</span> <br /> مع <span className='drop-shadow font-extrabold text-gradient-blue'>جمعة</span></>
          }
        </h1>
        <p className="mb-8 max-w-xl text-lg md:text-2xl text-gray-700 dark:text-gray-200 animate-fade-in">
          {language === 'en'
            ? "The ultimate group-buying platform: Save more when you shop together for the latest tech devices in Saudi Arabia."
            : "منصة الشراء الجماعي الأفضل – كلما زاد عدد المشاركين، زادت التوفيرات على أحدث أجهزة التقنية في السعودية."
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link to="/shop">
            <Button
              size="lg"
              variant="green"
              className="text-lg shadow-lg px-8 py-6 group rounded-full font-semibold"
            >
              {language === 'en' ? 'View All Deals' : 'اعرض جميع العروض'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/start-jam3a">
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white shadow px-8 py-6 rounded-full font-semibold"
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
