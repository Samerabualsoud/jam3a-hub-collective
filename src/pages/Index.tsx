
import React from 'react';
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
import AdminButton from '@/components/AdminButton';

const Index = () => {
  const { user, isAdmin } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 relative">
        {isAdmin && <AdminButton />}
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
