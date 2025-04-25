
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import CategorySelection from '@/components/jam3a/CategorySelection';
import ProductSelection from '@/components/jam3a/ProductSelection';
import GroupDetailsForm from '@/components/jam3a/GroupDetailsForm';
import ConfirmationStep from '@/components/jam3a/ConfirmationStep';
import StepLayout from '@/components/jam3a/steps/StepLayout';
import StepNavigation from '@/components/jam3a/steps/StepNavigation';
import { useJam3aCreation } from '@/hooks/useJam3aCreation';

const StartJam3a: React.FC = () => {
  const { language } = useLanguage();
  const {
    currentStep,
    selectedCategory,
    selectedProduct,
    groupSize,
    isLoading,
    handleCategorySelect,
    handleProductSelect,
    handleGroupSizeChange,
    handlePayAndPublish,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep
  } = useJam3aCreation();

  // Ensure we're always at step 1 when the component is mounted
  useEffect(() => {
    // Only set to step 1 if we're at step 0 (uninitialized)
    if (currentStep === 0) {
      setCurrentStep(1);
    }
  }, [currentStep, setCurrentStep]);

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

  // Form values for the group details step
  const [groupDetailsValues, setGroupDetailsValues] = React.useState({
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

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 lg:py-12 bg-gradient-to-br from-white via-royal-blue-50/50 to-white">
        <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.4 }}
        >
          <StepLayout currentStep={currentStep}>
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

            <StepNavigation 
              currentStep={currentStep}
              onNext={currentStep === 4 ? handlePayAndPublish : goToNextStep}
              onPrevious={goToPreviousStep}
              isLoading={isLoading}
            />
          </StepLayout>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default StartJam3a;
