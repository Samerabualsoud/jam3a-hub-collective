
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const JoinWaitlist = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been added to the waitlist. We'll notify you soon!",
      });
      setEmail('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="bg-gradient-to-br from-jam3a-purple to-jam3a-accent py-16 md:py-24 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Be Among the First to Experience Jam3a</h2>
          <p className="mt-4 text-white/90">
            Join our exclusive waitlist to get early access, special promotions, and updates on Saudi Arabia's first group buying platform.
          </p>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="youremail@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 bg-white text-jam3a-purple hover:bg-white/90 hover:text-jam3a-deep-purple transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinWaitlist;
