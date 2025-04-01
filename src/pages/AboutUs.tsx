
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutUsContent from '@/components/AboutUsContent';

const AboutUs = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutUsContent />
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
