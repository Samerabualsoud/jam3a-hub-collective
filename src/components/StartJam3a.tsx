
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, PlusCircle, TrendingUp, BadgePercent, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const StartJam3a: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const { toast } = useToast();

  const content = {
    title: "Start Your Own Jam3a",
    subtitle: "Group buying made simple and rewarding",
    description: "Creating a Jam3a is quick and easy. Select a product you love, set your group size, and watch the prices drop as more friends join!",
    steps: [
      {
        title: "Pick Your Product",
        description: "Choose from our curated selection of premium tech gadgets and more.",
        icon: PlusCircle
      },
      {
        title: "Set Your Group Size",
        description: "Decide how many people you want in your group. The bigger the group, the bigger the savings!",
        icon: Users
      },
      {
        title: "Invite Friends",
        description: "Share your unique Jam3a link with friends, family, or colleagues via WhatsApp, social media, or email.",
        icon: TrendingUp
      }
    ],
    benefits: [
      {
        text: "Save up to 30% on retail prices",
        icon: BadgePercent
      },
      {
        text: "No payment until the group is complete",
        icon: Clock
      },
      {
        text: "Full refund if the group doesn't fill",
        icon: ShieldCheck
      },
      {
        text: "Secure transactions and guaranteed delivery",
        icon: ShieldCheck
      }
    ],
    cta: "Start Your Jam3a Now",
    orJoin: "or",
    joinExisting: "Join an Existing Jam3a"
  };

  return (
    <section className="py-10 md:py-14 bg-gradient-to-br from-white to-jam3a-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Background decoration elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-jam3a-purple/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-jam3a-accent/5 rounded-full filter blur-3xl"></div>
        
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-jam3a-deep-purple to-jam3a-accent">
              {content.title}
            </h2>
            <p className="text-lg text-jam3a-purple font-medium mb-3">
              {content.subtitle}
            </p>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-8">
          {/* Step selector for mobile */}
          <div className="md:hidden mb-4">
            <div className="w-full border rounded-lg shadow-sm p-1 flex">
              {content.steps.map((_, index) => (
                <button 
                  key={index} 
                  className={`flex-1 py-2 rounded-md ${selectedStepIndex === index ? 'bg-jam3a-purple text-white' : 'bg-transparent text-foreground'}`}
                  onClick={() => setSelectedStepIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <Card className="mt-4 border-2 border-jam3a-purple/10 hover:border-jam3a-purple/30 transition-colors shadow-jam3a">
              <CardContent className="p-5">
                <div className="flex items-center mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-jam3a-purple/10 text-jam3a-purple">
                    {React.createElement(content.steps[selectedStepIndex].icon, { size: 20 })}
                  </div>
                  <h3 className="font-semibold text-lg ml-3">{content.steps[selectedStepIndex].title}</h3>
                </div>
                <p className="text-muted-foreground">{content.steps[selectedStepIndex].description}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Desktop steps */}
          <div className="hidden md:grid md:grid-cols-3 gap-5">
            {content.steps.map((step, index) => (
              <Card 
                key={index} 
                className="border-2 border-jam3a-purple/10 hover:border-jam3a-purple/30 transition-all duration-300 hover:shadow-jam3a transform hover:-translate-y-1"
              >
                <CardContent className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-jam3a-purple/10 text-jam3a-purple">
                      {React.createElement(step.icon, { size: 20 })}
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-jam3a-purple text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg ml-3">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-jam3a-purple to-jam3a-accent rounded-2xl p-6 text-white mb-8 shadow-jam3a-lg transform hover:-translate-y-1 transition-transform duration-300">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-4">
              Why Start a Jam3a?
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {content.benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center text-center hover:bg-white/20 transition-colors duration-300"
                >
                  {React.createElement(benefit.icon, { className: "h-5 w-5 mb-2" })}
                  {benefit.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3">
          <Button 
            size="lg" 
            className="bg-jam3a-purple hover:bg-jam3a-deep-purple text-white px-6 py-5 text-lg shadow-jam3a hover:shadow-jam3a-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Link to="/start-jam3a" className="flex items-center gap-2">
              {content.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">{content.orJoin}</span>
            <Button variant="link" className="text-jam3a-purple hover:text-jam3a-deep-purple">
              <Link to="/shop" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {content.joinExisting}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartJam3a;
