
import React from 'react';
import { Link } from 'react-router-dom';
import { SettingsIcon } from 'lucide-react';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import FeaturedDeals from '@/components/FeaturedDeals';
import BilingualProductListing from '@/components/BilingualProductListing';
import WhyChooseUs from '@/components/WhyChooseUs';
import JoinWaitlist from '@/components/JoinWaitlist';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StartJam3a from '@/components/StartJam3a';
import Testimonials from '@/components/Testimonials';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, isAdmin } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 relative">
        {isAdmin && (
          <Link 
            to="/admin" 
            className="fixed bottom-6 right-6 z-50 bg-royal-blue text-white p-4 rounded-full shadow-xl hover:bg-royal-blue-dark transition-all duration-300 border-2 border-white flex items-center justify-center"
            title="Admin Panel"
            aria-label="Admin Panel"
          >
            <SettingsIcon className="h-7 w-7" />
          </Link>
        )}
        <Hero />
        <HowItWorks />
        <FeaturedDeals />
        <BilingualProductListing />
        <Testimonials />
        <StartJam3a />
        <WhyChooseUs />
        <JoinWaitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
