
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/ui/step-indicator';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Product } from '@/hooks/useJam3aCreation';
import ProductSelection from '@/components/jam3a/ProductSelection';
import ConfirmationStep from '@/components/jam3a/ConfirmationStep';
import Jam3aDetails from '@/components/Jam3aDetails';
import { formatDistanceToNow } from 'date-fns';

const JoinJam3a = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Extract URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productParam = params.get('product');
    const priceParam = params.get('price');
    
    if (productParam && priceParam) {
      // If product was passed in URL, pre-select it
      setSelectedProduct({
        id: Math.floor(Math.random() * 1000),  // Placeholder ID
        name: productParam,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80", // Placeholder image
        price: Number(priceParam),
        discounts: [
          { minCount: 3, price: Number(priceParam) * 0.95, savings: "5%" },
          { minCount: 5, price: Number(priceParam) * 0.9, savings: "10%" }
        ]
      });
    }
  }, [location.search]);

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
  
  // Mock jam3a details data
  const jam3aDetails = {
    name: selectedProduct?.name || "Product Jam3a",
    currentParticipants: 3,
    maxParticipants: 5,
    endDate: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
    startDate: new Date(Date.now() - 172800000).toISOString(), // 48 hours ago
    participants: [
      {
        user_id: "user1",
        product_name: "User 1",
        joined_at: new Date(Date.now() - 172800000).toISOString()
      },
      {
        user_id: "user2",
        product_name: "User 2",
        joined_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        user_id: "user3",
        product_name: "User 3",
        joined_at: new Date(Date.now() - 3600000).toISOString()
      }
    ]
  };

  const content = {
    en: {
      title: "Join a Jam3a",
      subtitle: "Complete the group and unlock exclusive savings!",
      steps: ["Review Jam3a", "Confirm Joining", "Success"],
      next: "Next",
      previous: "Back",
      joinNow: "Join Now",
      startOwn: "Start Your Own",
      success: {
        title: "Successfully Joined!",
        description: "You've successfully joined the Jam3a",
        cta: "Go to My Jam3as",
      }
    },
    ar: {
      title: "انضم إلى جمعة",
      subtitle: "أكمل المجموعة وافتح مدخرات حصرية!",
      steps: ["مراجعة الجمعة", "تأكيد الانضمام", "نجاح"],
      next: "التالي",
      previous: "السابق",
      joinNow: "انضم الآن",
      startOwn: "ابدأ الخاصة بك",
      success: {
        title: "تم الانضمام بنجاح!",
        description: "لقد انضممت بنجاح إلى الجمعة",
        cta: "اذهب إلى جمعياتي",
      }
    }
  };
  
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };
  
  const handleNext = () => {
    if (step === 0 && !selectedProduct) {
      toast({
        title: language === 'en' ? "Please select a Jam3a to join" : "الرجاء اختيار جمعة للانضمام",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 1) {
      // Simulate joining success
      toast({
        title: language === 'en' ? "Successfully joined!" : "تم الانضمام بنجاح!",
        description: language === 'en' 
          ? `You've joined the Jam3a for ${selectedProduct?.name}` 
          : `لقد انضممت إلى الجمعة لـ ${selectedProduct?.name}`
      });
    }
    
    setStep(prev => Math.min(prev + 1, 2));
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleGoToMyJam3as = () => {
    navigate('/my-jam3as');
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
            <p className="text-muted-foreground">
              {content[language].subtitle}
            </p>
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
                <div className="space-y-6">
                  {selectedProduct ? (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <div className="aspect-square w-full max-h-96 overflow-hidden rounded-lg bg-gray-100">
                            <img 
                              src={selectedProduct.image} 
                              alt={selectedProduct.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                            
                            <div className="flex items-center gap-3 mt-2">
                              <div className="text-2xl font-bold text-royal-blue">
                                {selectedProduct.discounts?.[1]?.price || selectedProduct.price} SAR
                              </div>
                              <div className="text-lg text-muted-foreground line-through">
                                {selectedProduct.price} SAR
                              </div>
                            </div>
                            
                            <div className="mt-2 inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm">
                              <span className="font-semibold">{selectedProduct.discounts?.[1]?.savings || "5%"} OFF</span>
                              <span className="text-xs">with Jam3a</span>
                            </div>
                          </div>
                          
                          <Jam3aDetails 
                            name={jam3aDetails.name}
                            currentParticipants={jam3aDetails.currentParticipants}
                            maxParticipants={jam3aDetails.maxParticipants}
                            endDate={jam3aDetails.endDate}
                            startDate={jam3aDetails.startDate}
                            participants={jam3aDetails.participants}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <ProductSelection 
                      products={sampleProducts}
                      selectedProductId={selectedProduct?.id || null}
                      onSelect={handleProductSelect}
                    />
                  )}
                </div>
              )}
              
              {step === 1 && selectedProduct && (
                <ConfirmationStep
                  product={selectedProduct}
                  groupSize={5}
                  duration={1}
                  isPublic={true}
                  paymentType="upfront"
                  onShare={() => {}}
                  isStartingJam3a={false}
                />
              )}
              
              {step === 2 && (
                <div className="text-center py-8 space-y-6">
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">{content[language].success.title}</h2>
                  <p>{content[language].success.description}</p>
                  
                  <div className="py-6 max-w-xs mx-auto">
                    <Button 
                      onClick={handleGoToMyJam3as}
                      variant="green"
                      className="w-full"
                    >
                      {content[language].success.cta}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {step < 2 && (
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
                {step === 1 ? content[language].joinNow : content[language].next}
                {step !== 1 && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default JoinJam3a;
