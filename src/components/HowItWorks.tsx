
import React from 'react';
import { Users, Timer, Share2, ShoppingBag } from 'lucide-react';

const steps = [
  {
    icon: <Users className="h-10 w-10 text-jam3a-purple" />,
    title: "Start or Join a Jam3a",
    description: "Create your own group or join an existing one for the product you want."
  },
  {
    icon: <Share2 className="h-10 w-10 text-jam3a-purple" />,
    title: "Invite Friends",
    description: "Share your Jam3a link with friends and family via WhatsApp, Snapchat, or social media."
  },
  {
    icon: <Timer className="h-10 w-10 text-jam3a-purple" />,
    title: "Fill the Group",
    description: "Complete your group within the time limit to unlock the group discount."
  },
  {
    icon: <ShoppingBag className="h-10 w-10 text-jam3a-purple" />,
    title: "Everyone Saves",
    description: "Once the group is complete, everyone pays the discounted price and receives their order."
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How Jam3a Works</h2>
          <p className="mt-3 text-muted-foreground">
            Simple steps to save money through the power of group buying
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-jam3a-purple/10">
                {step.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
