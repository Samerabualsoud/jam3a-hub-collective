
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
            className="fixed top-24 right-4 z-50 bg-jam3a-purple text-white p-2 rounded-full shadow-lg hover:bg-jam3a-deep-purple transition-colors"
            title="Admin Panel"
          >
            <SettingsIcon className="h-6 w-6" />
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
