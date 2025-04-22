
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/Header';
import { getContent } from '@/utils/jam3aContent';

interface SuccessStateProps {
  onViewJam3as: () => void;
  onCreateAnother: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ onViewJam3as, onCreateAnother }) => {
  const { language } = useLanguage();
  const content = getContent(language);

  return (
    <div className="text-center space-y-6">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-4">
        <Check className="h-12 w-12" />
      </div>
      
      <h2 className="text-2xl font-bold">{content.successTitle}</h2>
      <p className="text-muted-foreground max-w-lg mx-auto">{content.successText}</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button 
          variant="green" 
          className="text-white"
          onClick={onViewJam3as}
        >
          {content.viewJam3a}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onCreateAnother}
        >
          {content.createAnother}
        </Button>
      </div>
    </div>
  );
};

export default SuccessState;
