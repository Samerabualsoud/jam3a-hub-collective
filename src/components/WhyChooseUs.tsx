
import React from 'react';
import { BadgePercent, ShieldCheck, Clock, CreditCard } from 'lucide-react';

const features = [
  {
    icon: <BadgePercent className="h-10 w-10 text-jam3a-purple" />,
    title: "Better Prices",
    description: "Unlock discounts of up to 30% when you buy together with others."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-jam3a-purple" />,
    title: "100% Secure",
    description: "Your payment is only processed when the group is successfully formed."
  },
  {
    icon: <Clock className="h-10 w-10 text-jam3a-purple" />,
    title: "Fast Delivery",
    description: "Receive your products within 2-5 business days across Saudi Arabia."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-jam3a-purple" />,
    title: "Multiple Payment Options",
    description: "Pay with Mada, STC Pay, Apple Pay, or credit cards."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Choose Jam3a</h2>
          <p className="mt-4 text-muted-foreground">
            We're revolutionizing shopping in Saudi Arabia through the power of group buying
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-jam3a-purple/10">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
