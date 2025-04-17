
import React from 'react';
import { BadgeInfo } from 'lucide-react';
import { useLanguage } from './Header';

interface BlueBannerProps {
  text?: {
    en: string;
    ar: string;
  };
}

export const BlueBanner: React.FC<BlueBannerProps> = ({ text }) => {
  const { language } = useLanguage();

  // If no text is provided, return null
  if (!text) return null;

  return (
    <div className="absolute top-0 left-0 w-full bg-royal-blue text-white py-3 text-center flex items-center justify-center gap-2">
      <BadgeInfo className="h-5 w-5" />
      <span className="text-sm font-medium">
        {text[language]}
      </span>
    </div>
  );
};
