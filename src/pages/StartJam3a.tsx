
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import StartJam3aHeader from '@/components/jam3a/StartJam3aHeader';
import StartJam3aSteps from '@/components/jam3a/StartJam3aSteps';
import StartJam3aCTA from '@/components/jam3a/StartJam3aCTA';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/ui/step-indicator';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CategorySelection from '@/components/jam3a/CategorySelection';
import ProductSelection from '@/components/jam3a/ProductSelection';
import GroupDetailsForm from '@/components/jam3a/GroupDetailsForm';
import ConfirmationStep from '@/components/jam3a/ConfirmationStep';
import { Product, useJam3aCreation } from '@/hooks/useJam3aCreation';

const StartJam3a: React.FC = () => {
  const { language } = useLanguage();
  const {
    currentStep,
    selectedCategory,
    selectedProduct,
    groupSize,
    discountTier,
    isLoading,
    handleCategorySelect,
    handleProductSelect,
    handleGroupSizeChange,
    handlePayAndPublish,
    goToNextStep,
    goToPreviousStep
  } = useJam3aCreation();

  // Sample products data - would come from API in production
  const sampleProducts = [
    {
      id: 1,
      name: "iPhone 16 Pro Max 256GB",
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
      price: 4999,
      categoryId: "smartphones",
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
      categoryId: "smartphones",
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
      categoryId: "smartphones",
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
      categoryId: "laptops",
      discounts: [
        { minCount: 3, price: 9499, savings: "5%" },
        { minCount: 5, price: 8999, savings: "10%" },
        { minCount: 8, price: 8499, savings: "15%" }
      ]
    }
  ];

  // Get products based on selected category
  const filteredProducts = selectedCategory 
    ? sampleProducts.filter(product => product.categoryId === selectedCategory)
    : sampleProducts;

  const content = {
    en: {
      steps: ["Choose Category", "Select Product", "Set Group Details", "Review & Confirm"],
      next: "Next",
      previous: "Back",
      pay: "Pay & Publish"
    },
    ar: {
      steps: ["اختر الفئة", "حدد المنتج", "حدد تفاصيل المجموعة", "مراجعة وتأكيد"],
      next: "التالي",
      previous: "السابق",
      pay: "الدفع والنشر"
    }
  };

  // Form values for the group details step
  const [groupDetailsValues, setGroupDetailsValues] = useState({
    groupSize: 5,
    duration: 1,
    isPublic: true,
    paymentType: "upfront",
    notificationPreference: "email"
  });

  const handleGroupDetailsChange = (values: any) => {
    setGroupDetailsValues(values);
    handleGroupSizeChange(values.groupSize);
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Show landing page with benefits and information when no steps are started yet
  if (currentStep === 0) {
    return (
      <section id="start-jam3a" className="py-16 md:py-24 bg-gradient-to-br from-white via-royal-blue-50/50 to-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {/* Background decoration elements */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-royal-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-royal-blue-accent/5 rounded-full filter blur-3xl"></div>
          
          <StartJam3aHeader stats={language === 'en' ? [
            { value: "25%", label: "Average Savings" },
            { value: "5+", label: "Products Categories" },
            { value: "1K+", label: "Happy Customers" }
          ] : [
            { value: "25%", label: "متوسط التوفير" },
            { value: "5+", label: "فئات المنتجات" },
            { value: "1K+", label: "عميل سعيد" }
          ]} />
          <StartJam3aSteps />
          <StartJam3aCTA />
        </div>
      </section>
    );
  }

  // Show the step-by-step jam3a creation process
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 lg:py-12 bg-gradient-to-br from-white via-royal-blue-50/50 to-white">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-royal-blue to-royal-blue-light text-transparent bg-clip-text">
              {language === 'en' ? "Start Your Own Jam3a" : "ابدأ جمعتك الخاصة"}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? "Group buying made simple and rewarding" 
                : "الشراء الجماعي بسيط ومجزٍ"}
            </p>
            <div className="mb-8">
              <StepIndicator 
                steps={content[language].steps} 
                currentStep={currentStep - 1} 
                className="mt-6"
              />
            </div>
          </div>

          <Card className="border-2 border-gray-100 shadow-md">
            <CardContent className="p-6 md:p-8">
              {currentStep === 1 && (
                <CategorySelection onSelect={handleCategorySelect} />
              )}
              
              {currentStep === 2 && (
                <ProductSelection 
                  products={filteredProducts}
                  selectedProductId={selectedProduct?.id || null}
                  onSelect={handleProductSelect}
                />
              )}
              
              {currentStep === 3 && selectedProduct && (
                <GroupDetailsForm
                  initialValues={groupDetailsValues}
                  onValuesChange={handleGroupDetailsChange}
                  maxGroupSize={10}
                  product={selectedProduct}
                />
              )}
              
              {currentStep === 4 && selectedProduct && (
                <ConfirmationStep
                  product={selectedProduct}
                  groupSize={groupSize}
                  duration={groupDetailsValues.duration}
                  isPublic={groupDetailsValues.isPublic}
                  paymentType={groupDetailsValues.paymentType}
                  onShare={() => {}}
                />
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={goToPreviousStep}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {content[language].previous}
            </Button>
            <Button 
              variant="green"
              onClick={currentStep === 4 ? handlePayAndPublish : goToNextStep}
              className="gap-2"
              disabled={isLoading}
            >
              {currentStep === 4 ? content[language].pay : content[language].next}
              {currentStep !== 4 && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default StartJam3a;
