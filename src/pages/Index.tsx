
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
            className="fixed top-24 right-4 z-50 bg-royal-blue text-white p-4 rounded-full shadow-xl hover:bg-royal-blue-dark transition-colors border-3 border-white"
            title="Admin Panel"
            aria-label="Admin Panel"
            style={{boxShadow: '0 0 15px rgba(14, 165, 233, 0.7)'}}
          >
            <SettingsIcon className="h-8 w-8" />
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
