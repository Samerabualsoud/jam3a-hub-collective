
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Jam3aBenefits from '../Jam3aBenefits';
import { useJam3aCreation } from '@/hooks/useJam3aCreation';

const StartJam3aCTA = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { setCurrentStep } = useJam3aCreation();

  const content = {
    en: {
      whyStart: "Why Start a Jam3a?",
      cta: "Start Your Jam3a Now",
      orJoin: "or",
      joinExisting: "Join an Existing Jam3a"
    },
    ar: {
      whyStart: "لماذا تبدأ جمعة؟",
      cta: "ابدأ جمعتك الآن",
      orJoin: "أو",
      joinExisting: "انضم إلى جمعة موجودة"
    }
  };

  const handleStartJam3a = () => {
    // Set the step to 1 to start the process and navigate
    setCurrentStep(1);
    navigate('/start-jam3a');
    console.log("Starting Jam3a creation process");
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-gradient-to-r from-royal-blue to-royal-blue-light rounded-3xl p-10 text-white mb-16 shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-6">
            {content[language].whyStart}
          </h3>
          <Jam3aBenefits className="text-white" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="flex flex-col items-center space-y-4"
      >
        <Button 
          variant="green"
          size="lg" 
          className="w-full max-w-xs text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl bg-gradient-to-r from-royal-blue to-royal-blue-light transition-all duration-300 hover:-translate-y-1 group rounded-xl"
          onClick={handleStartJam3a}
        >
          <span className="flex items-center gap-2">
            {content[language].cta}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-muted-foreground">{content[language].orJoin}</span>
          <Button variant="link" className="text-royal-blue hover:text-royal-blue-dark">
            <Link to="/join-jam3a" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {content[language].joinExisting}
            </Link>
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default StartJam3aCTA;
