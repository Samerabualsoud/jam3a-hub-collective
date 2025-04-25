
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import BilingualProductListing from '@/components/BilingualProductListing';
import WhyChooseUs from '@/components/WhyChooseUs';
import JoinWaitlist from '@/components/JoinWaitlist';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import StartJam3aCTA from '@/components/jam3a/StartJam3aCTA';
import { useAuth } from '@/contexts/AuthContext';
import AdminButton from '@/components/AdminButton';

const Index = () => {
  const { user, isAdmin } = useAuth();
  
  useEffect(() => {
    // Log auth state on index page load
    console.log("Index page auth state:", { 
      user, 
      isAdmin, 
      userRole: user?.role,
      isUserAdmin: user?.role === 'admin'
    });
  }, [user, isAdmin]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 relative">
        {isAdmin && <AdminButton />}
        <Hero />
        <HowItWorks />
        <BilingualProductListing />
        <section className="container mx-auto py-16 px-4">
          <StartJam3aCTA />
        </section>
        <WhyChooseUs />
        <JoinWaitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
