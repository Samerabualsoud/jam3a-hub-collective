
import React from 'react';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const JoinWaitlist = () => {
  return (
    <section className="bg-gradient-to-br from-jam3a-purple to-jam3a-accent py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Users className="h-8 w-8 text-jam3a-purple" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Join the Jam3a Revolution
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Be among the first to experience the future of group buying in Saudi Arabia.
            Sign up now to receive exclusive early access and special offers.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-grow">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 w-full bg-white/95 placeholder-gray-500"
              />
            </div>
            <Button
              size="lg"
              className="h-12 bg-white font-semibold text-jam3a-purple hover:bg-white/90"
            >
              Join Waitlist
            </Button>
          </div>
          <p className="mt-4 text-sm text-white/70">
            By joining, you agree to receive updates from Jam3a. 
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinWaitlist;
