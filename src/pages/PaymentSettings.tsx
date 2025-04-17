
import React from 'react';
import PaymentIntegration from '@/components/admin/PaymentIntegration';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentSettings = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PaymentIntegration />
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSettings;
