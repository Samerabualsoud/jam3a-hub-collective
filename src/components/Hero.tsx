
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDownCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section className="relative flex items-center justify-center min-h-[580px] md:min-h-[680px] lg:min-h-[780px] px-4 overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-blue-50/80 via-white to-royal-blue/10 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.15),transparent_60%)] z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-royal-blue/5 rounded-full filter blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-[15%] right-[10%] w-72 h-72 bg-royal-blue-accent/5 rounded-full filter blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Decorative product images - enhanced with animation and better positioning */}
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80"
        alt="iPhone"
        className="absolute top-32 -left-6 md:left-16 w-40 h-40 md:w-48 md:h-48 object-cover rounded-xl shadow-xl rotate-6 z-10 hidden md:block"
      />
      
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80"
        alt="Samsung Galaxy"
        className="absolute top-56 right-10 w-36 h-36 object-cover rounded-xl shadow-xl -rotate-6 z-10 hidden md:block"
      />
      
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
        alt="Laptop"
        className="absolute bottom-20 -right-10 md:right-24 w-48 h-32 object-cover rounded-xl shadow-xl rotate-3 z-10 hidden lg:block"
      />

      {/* Central content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block px-5 py-2 rounded-full font-medium text-sm bg-gradient-to-r from-royal-blue to-royal-blue-light text-white shadow-lg jam3a-badge">
            {language === 'en'
              ? "Join a Jam3a and save up to 25%"
              : "انضم إلى جمعة ووفر حتى ٢٥٪"}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          {language === 'en'
            ? <>Unlock <span className="text-gradient-blue">Better Prices</span> <br className="hidden md:block" /> with <span className='drop-shadow-lg font-extrabold bg-gradient-to-r from-royal-blue via-royal-blue-accent to-royal-blue-light bg-clip-text text-transparent'>Jam3a</span></>
            : <>احصل على <span className="text-royal-blue-dark">أفضل الأسعار</span> <br className="hidden md:block" /> مع <span className='drop-shadow-lg font-extrabold bg-gradient-to-r from-royal-blue via-royal-blue-accent to-royal-blue-light bg-clip-text text-transparent'>جمعة</span></>
          }
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10 max-w-2xl text-lg md:text-2xl text-gray-700 dark:text-gray-200"
        >
          {language === 'en'
            ? "The ultimate group-buying platform: Save more when you shop together for the latest tech devices in Saudi Arabia."
            : "منصة الشراء الجماعي الأفضل – كلما زاد عدد المشاركين، زادت التوفيرات على أحدث أجهزة التقنية في السعودية."
          }
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center"
        >
          <Link to="/shop">
            <Button
              size="lg"
              variant="green"
              className="text-lg shadow-lg px-8 py-6 group rounded-full font-semibold transition-all hover:-translate-y-1 bg-gradient-to-r from-royal-blue to-royal-blue-light"
            >
              <ShoppingBag className="mr-2" />
              {language === 'en' ? 'View All Deals' : 'اعرض جميع العروض'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/start-jam3a">
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white shadow-md px-8 py-6 rounded-full font-semibold transition-all hover:-translate-y-1"
            >
              {language === 'en' ? 'Start a Jam3a' : 'ابدأ جمعة'}
            </Button>
          </Link>
        </motion.div>
        
        {/* Moved Learn More section down and added more space to avoid overlap with buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-3 left-0 right-0 flex justify-center mt-20" 
        >
          <a href="#how-it-works" className="flex flex-col items-center text-royal-blue hover:text-royal-blue-dark transition-colors mt-10">
            <span className="text-sm font-medium mb-1">{language === 'en' ? 'Learn More' : 'اعرف المزيد'}</span>
            <ArrowDownCircle className="h-6 w-6 animate-bounce-light" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
