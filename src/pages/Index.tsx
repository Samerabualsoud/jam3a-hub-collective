
import React from 'react';
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
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, isAdmin } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedDeals />
        <BilingualProductListing />
        <Testimonials />
        <StartJam3a />
        <WhyChooseUs />
        <JoinWaitlist />
        
        {isAdmin && (
          <div className="container mx-auto py-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">Admin Tools</h3>
              <div className="mt-2 flex gap-2">
                <Link to="/admin" className="text-sm text-blue-700 hover:underline">
                  Admin Dashboard
                </Link>
                <span className="text-blue-500">•</span>
                <Link to="/payment-settings" className="text-sm text-blue-700 hover:underline">
                  Payment Settings
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
