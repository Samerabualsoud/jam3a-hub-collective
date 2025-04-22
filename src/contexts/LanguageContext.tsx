
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context type
interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  toggleLanguage: () => void;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
});

// Define props for LanguageProvider
interface LanguageProviderProps {
  children: ReactNode;
}

// Create the LanguageProvider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get saved language from localStorage or default to 'en'
  const getSavedLanguage = (): 'en' | 'ar' => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return (savedLanguage === 'en' || savedLanguage === 'ar') ? savedLanguage : 'en';
    }
    return 'en';
  };

  const [language, setLanguageState] = useState<'en' | 'ar'>(getSavedLanguage);

  // Update language in localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      // Update document direction based on language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      // You might also want to add a class to the body for additional styling
      if (language === 'ar') {
        document.body.classList.add('rtl');
      } else {
        document.body.classList.remove('rtl');
      }
    }
  }, [language]);

  // Function to set language
  const setLanguage = (lang: 'en' | 'ar') => {
    setLanguageState(lang);
  };

  // Function to toggle between languages
  const toggleLanguage = () => {
    setLanguageState(prevLang => (prevLang === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
