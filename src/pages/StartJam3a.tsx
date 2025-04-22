
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useJam3aCreation } from '@/hooks/useJam3aCreation';
import CategorySelection from '@/components/jam3a/CategorySelection';
import ProductSelection from '@/components/jam3a/ProductSelection';
import GroupDetailsForm from '@/components/jam3a/GroupDetailsForm';
import ConfirmationStep from '@/components/jam3a/ConfirmationStep';
import { StepIndicator } from '@/components/ui/step-indicator';
import { motion } from 'framer-motion';

const StartJam3aPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const {
    selectedCategory,
    selectedProduct,
    handleCategorySelect,
    handleProductSelect,
  } = useJam3aCreation();
  
  const [formValues, setFormValues] = useState({
    groupSize: 5,
    duration: 1, // 1 = 24 hours, 2 = 3 days, etc.
    isPublic: true,
    paymentType: "upfront",     // Always "upfront"
    notificationPreference: "email"
  });
  
  const sampleProducts = [
    {
      id: 1,
      name: "iPhone 16 Pro Max 256GB",
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
      price: 4999,
      discounts: [
        { minCount: 3, price: 4599, savings: "8%" },
        { minCount: 5, price: 4399, savings: "12%" },
        { minCount: 8, price: 4199, savings: "16%" }
      ]
    },
    {
      id: 2,
      name: "Samsung Galaxy S25 Ultra 256GB",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80",
      price: 4599,
      discounts: [
        { minCount: 3, price: 4299, savings: "7%" },
        { minCount: 5, price: 4099, savings: "11%" },
        { minCount: 8, price: 3899, savings: "15%" }
      ]
    },
    {
      id: 3,
      name: "Galaxy Z Fold 6",
      image: "https://images.unsplash.com/photo-1615380547903-c456276b7702?auto=format&fit=crop&w=1600&q=80",
      price: 6999,
      discounts: [
        { minCount: 3, price: 6499, savings: "7%" },
        { minCount: 5, price: 6199, savings: "11%" },
        { minCount: 10, price: 5799, savings: "17%" }
      ]
    },
    {
      id: 4,
      name: "MacBook Pro 16\" M3 Pro",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=1600&q=80",
      price: 9999,
      discounts: [
        { minCount: 3, price: 9499, savings: "5%" },
        { minCount: 5, price: 8999, savings: "10%" },
        { minCount: 8, price: 8499, savings: "15%" }
      ]
    }
  ];

  const content = {
    en: {
      title: "Start Your Jam3a",
      steps: ["Choose Category", "Select Product", "Add Details", "Confirm & Share"],
      next: "Next",
      previous: "Back",
      startJam3a: "Start Jam3a",
    },
    ar: {
      title: "ابدأ جمعتك",
      steps: ["اختر الفئة", "اختر المنتج", "أضف التفاصيل", "التأكيد والمشاركة"],
      next: "التالي",
      previous: "السابق",
      startJam3a: "ابدأ الجمعة",
    }
  };

  const handleNext = () => {
    if (step === 0 && !selectedCategory) {
      toast({
        title: language === 'en' ? "Please select a category" : "الرجاء اختيار فئة",
        variant: "destructive"
      });
      return;
    }

    if (step === 1 && !selectedProduct) {
      toast({
        title: language === 'en' ? "Please select a product" : "الرجاء اختيار منتج",
        variant: "destructive"
      });
      return;
    }

    setStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleShareJam3a = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'en' ? 'Join my Jam3a' : 'انضم إلى جمعتي',
        text: language === 'en' 
          ? `Join my Jam3a for ${selectedProduct?.name}. Let's save together!` 
          : `انضم إلى جمعتي لـ ${selectedProduct?.name}. دعونا نوفر معاً!`,
        url: window.location.href,
      });
    } else {
      toast({
        title: language === 'en' ? "Share using the link above" : "شارك باستخدام الرابط أعلاه",
      });
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 lg:py-12">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              {content[language].title}
            </h1>
            <div className="mb-8">
              <StepIndicator
                steps={content[language].steps}
                currentStep={step}
                className="mt-6"
              />
            </div>
          </div>

          <Card className="border-2 border-gray-100 shadow-md">
            <CardContent className="p-6 md:p-8">
              {step === 0 && (
                <CategorySelection
                  onSelect={handleCategorySelect}
                />
              )}

              {step === 1 && (
                <ProductSelection
                  products={sampleProducts}
                  selectedProductId={selectedProduct?.id || null}
                  onSelect={handleProductSelect}
                />
              )}

              {step === 2 && selectedProduct && (
                <GroupDetailsForm
                  initialValues={{ ...formValues, paymentType: "upfront" }}
                  onValuesChange={(v) => setFormValues({ ...v, paymentType: "upfront" })}
                  maxGroupSize={10}
                  product={selectedProduct}
                />
              )}

              {step === 3 && selectedProduct && (
                <ConfirmationStep
                  product={selectedProduct}
                  groupSize={formValues.groupSize}
                  duration={formValues.duration}
                  isPublic={formValues.isPublic}
                  paymentType="upfront"
                  onShare={handleShareJam3a}
                  isStartingJam3a={true}
                />
              )}
            </CardContent>
          </Card>

          {step < 3 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {content[language].previous}
              </Button>
              <Button
                variant="green"
                onClick={handleNext}
                className="gap-2"
              >
                {content[language].next}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default StartJam3aPage;
