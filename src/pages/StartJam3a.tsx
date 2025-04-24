
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
import { useSupabaseApi } from '@/lib/supabase/api';

const StartJam3aPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const {
    currentStep: step,
    setCurrentStep: setStep,
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

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const supabaseApi = useSupabaseApi();

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
    try {
      if (navigator.share) {
        navigator.share({
          title: language === 'en' ? 'Join my Jam3a' : 'انضم إلى جمعتي',
          text: language === 'en' 
            ? `Join my Jam3a for ${selectedProduct?.name}. Let's save together!` 
            : `انضم إلى جمعتي لـ ${selectedProduct?.name}. دعونا نوفر معاً!`,
          url: window.location.href,
        }).catch(error => {
          console.log('Sharing failed:', error);
          fallbackShare();
        });
      } else {
        fallbackShare();
      }
    } catch (error) {
      console.log('Share error:', error);
      fallbackShare();
    }
  };
  
  const fallbackShare = () => {
    toast({
      title: language === 'en' ? "Share using the link above" : "شارك باستخدام الرابط أعلاه",
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  useEffect(() => {
    async function fetchProductsByCategory() {
      if (step === 1 && selectedCategory) {
        setProductsLoading(true);
        console.log("Fetching products for category:", selectedCategory);
        
        try {
          const result = await supabaseApi.products.getProductsByCategorySlug(selectedCategory);
          console.log("Fetched products:", result);
          
          if (!result || result.length === 0) {
            console.log("No products found for category:", selectedCategory);
            // Create a few dummy products for testing if needed
            const dummyProducts = [
              {
                id: "dummy-1",
                name: "Example Product",
                image_url: "https://placehold.co/600x400?text=Example+Product",
                price: 1999,
                category_id: selectedCategory,
                discounts: [
                  { min_count: 3, price: 1899, savings: "5%" },
                  { min_count: 5, price: 1799, savings: "10%" }
                ]
              },
              {
                id: "dummy-2",
                name: "Another Product",
                image_url: "https://placehold.co/600x400?text=Another+Product",
                price: 2999,
                category_id: selectedCategory,
                discounts: [
                  { min_count: 3, price: 2899, savings: "3%" },
                  { min_count: 5, price: 2799, savings: "7%" }
                ]
              }
            ];
            
            const formattedDummyProducts = dummyProducts.map(product => ({
              id: product.id,
              name: product.name,
              image: product.image_url || "https://placehold.co/600x400?text=No+Image",
              price: product.price,
              categoryId: selectedCategory,
              discounts: (product.discounts || []).map(d => ({
                minCount: d.min_count,
                price: d.price,
                savings: d.savings
              }))
            }));
            
            setProducts(formattedDummyProducts);
          } else {
            const formattedProducts = result.map(product => ({
              id: product.id,
              name: product.name,
              image: product.image_url || "https://placehold.co/600x400?text=No+Image",
              price: product.price,
              categoryId: selectedCategory,
              discounts: (product.discounts || []).map(d => ({
                minCount: d.minCount, // Note: This was using minCount (camelCase) from the API
                price: d.price,
                savings: d.savings
              }))
            }));
            
            setProducts(formattedProducts);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          
          // Create fallback dummy products in case of error
          const fallbackProducts = [
            {
              id: "fallback-1",
              name: "Fallback Product",
              image: "https://placehold.co/600x400?text=Fallback+Product",
              price: 1599,
              categoryId: selectedCategory,
              discounts: [
                { minCount: 3, price: 1499, savings: "6%" },
                { minCount: 5, price: 1399, savings: "12%" }
              ]
            },
            {
              id: "fallback-2",
              name: "Backup Product",
              image: "https://placehold.co/600x400?text=Backup+Product",
              price: 3599,
              categoryId: selectedCategory,
              discounts: [
                { minCount: 3, price: 3399, savings: "5%" },
                { minCount: 5, price: 3299, savings: "8%" }
              ]
            }
          ];
          
          setProducts(fallbackProducts);
          toast({
            title: language === 'en' ? "Error loading products" : "خطأ في تحميل المنتجات",
            description: language === 'en' ? "Showing sample products instead" : "عرض منتجات عينة بدلاً من ذلك",
            variant: "destructive"
          });
        } finally {
          setProductsLoading(false);
        }
      }
    }
    
    fetchProductsByCategory();
  }, [step, selectedCategory, supabaseApi, language, toast]);

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
                  onSelect={(categoryId) => {
                    handleCategorySelect(categoryId);
                    // Don't auto-advance, let the Next button handle that
                  }}
                />
              )}

              {step === 1 && (
                <ProductSelection
                  products={products}
                  selectedProductId={selectedProduct?.id || null}
                  onSelect={handleProductSelect}
                  loading={productsLoading}
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
