
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StepIndicator } from '@/components/ui/step-indicator';
import { useLanguage } from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Plus, 
  RotateCw, 
  ShoppingBag, 
  CreditCard, 
  ShoppingCart, 
  Send, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import Jam3aBenefits from '@/components/Jam3aBenefits';
import { useNavigate } from 'react-router-dom';
import { useJam3aCreation } from '@/hooks/useJam3aCreation';
import CategorySelection from '@/components/jam3a/CategorySelection';
import ProductSelection from '@/components/jam3a/ProductSelection';
import SuccessState from '@/components/jam3a/SuccessState';
import { getContent } from '@/utils/jam3aContent';

const StartJam3a = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State for the wizard steps
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [groupSize, setGroupSize] = useState(5);
  const [discountTier, setDiscountTier] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get content based on selected language
  const currentContent = getContent(language);
  
  // Get products for selected category
  const getProducts = () => {
    if (!selectedCategory || !currentContent.products[selectedCategory]) {
      return [];
    }
    return currentContent.products[selectedCategory];
  };
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedProduct(null); // Reset product selection when category changes
    setCurrentStep(1); // Move to product selection step
  };
  
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentStep(2); // Move to group size step
  };
  
  const handleGroupSizeChange = (size) => {
    setGroupSize(size);
    // Find the appropriate discount tier based on group size
    if (!selectedProduct) return;
    
    const discountIndex = selectedProduct.discounts.findIndex(
      d => size >= d.minCount && (d === selectedProduct.discounts[selectedProduct.discounts.length - 1] || 
        size < selectedProduct.discounts[selectedProduct.discounts.findIndex(x => x === d) + 1]?.minCount)
    );
    
    setDiscountTier(Math.max(0, discountIndex));
  };
  
  const handlePayAndPublish = () => {
    setIsLoading(true);
    
    // Simulate payment process
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4); // Move to success step
      
      toast({
        title: currentContent.successTitle,
        description: currentContent.successText,
        duration: 5000,
      });
    }, 2000);
  };
  
  const resetForm = () => {
    setCurrentStep(0);
    setSelectedCategory('');
    setSelectedProduct(null);
    setGroupSize(5);
    setDiscountTier(0);
  };
  
  // Get the icon for each step
  const getStepIcon = (stepIndex) => {
    switch (stepIndex) {
      case 0: return <Plus className="h-5 w-5" />;
      case 1: return <ShoppingBag className="h-5 w-5" />;
      case 2: return <Users className="h-5 w-5" />;
      case 3: return <CreditCard className="h-5 w-5" />;
      default: return <Check className="h-5 w-5" />;
    }
  };
  
  // Render different content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderCategorySelection();
      case 1:
        return renderProductSelection();
      case 2:
        return renderGroupSizeSelection();
      case 3:
        return renderPaymentAndPublish();
      case 4:
        return renderSuccess();
      default:
        return null;
    }
  };
  
  // Render category selection step
  const renderCategorySelection = () => {
    return (
      <CategorySelection onSelect={handleCategorySelect} />
    );
  };
  
  // Render product selection step
  const renderProductSelection = () => {
    const products = getProducts();
    
    return (
      <ProductSelection 
        products={products}
        selectedProduct={selectedProduct}
        selectedCategory={selectedCategory}
        onSelect={handleProductSelect}
        onBack={() => setCurrentStep(0)}
      />
    );
  };
  
  // Render group size selection step
  const renderGroupSizeSelection = () => {
    if (!selectedProduct) return null;
    
    const getPrice = (count) => {
      // Find the appropriate discount based on count
      for (let i = selectedProduct.discounts.length - 1; i >= 0; i--) {
        if (count >= selectedProduct.discounts[i].minCount) {
          return selectedProduct.discounts[i].price;
        }
      }
      return selectedProduct.price; // No discount applies
    };
    
    const selectedDiscount = selectedProduct.discounts.find(d => groupSize >= d.minCount) || { price: selectedProduct.price, savings: "0%" };
    
    return (
      <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <h2 className="text-2xl font-bold">{currentContent.groupSizeTitle}</h2>
        <p className="text-muted-foreground">{currentContent.groupSizeText}</p>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full aspect-video object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{selectedProduct.name}</h3>
              </div>
              
              <div className="md:w-2/3 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{currentContent.originalPriceText}</span>
                    <span>{selectedProduct.price} {language === 'en' ? 'SAR' : 'ريال'}</span>
                  </div>
                  
                  <div className="flex justify-between font-medium">
                    <span>{currentContent.savingsText}</span>
                    <span className="text-royal-blue">{selectedDiscount.savings}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>{currentContent.finalPriceText}</span>
                    <span className="text-royal-blue">{getPrice(groupSize)} {language === 'en' ? 'SAR' : 'ريال'}</span>
                  </div>
                  
                  <Progress 
                    value={(groupSize / 10) * 100} 
                    className="h-2 mt-2" 
                  />
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-3">{currentContent.minPeopleText}</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {[3, 5, 7, 10, 15].map((count) => (
                        <button
                          key={count}
                          onClick={() => handleGroupSizeChange(count)}
                          className={`px-4 py-2 rounded-full text-center transition-all ${
                            groupSize === count
                              ? 'bg-royal-blue text-white font-medium'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">
                        {language === 'en' 
                          ? `Group Size: ${groupSize} people` 
                          : `حجم المجموعة: ${groupSize} أشخاص`}
                      </h4>
                      <p className="text-sm text-green-700">
                        {language === 'en' 
                          ? `At this group size, each person pays ${getPrice(groupSize)} SAR instead of ${selectedProduct.price} SAR!` 
                          : `عند هذا الحجم من المجموعة، يدفع كل شخص ${getPrice(groupSize)} ريال بدلاً من ${selectedProduct.price} ريال!`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-1"
          >
            {language === 'ar' ? (
              <>
                {currentContent.backButton} <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4" /> {currentContent.backButton}
              </>
            )}
          </Button>
          
          <Button 
            variant="green" 
            onClick={() => setCurrentStep(3)}
            className="group text-white"
          >
            {language === 'ar' ? (
              <>
                {currentContent.nextButton} <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </>
            ) : (
              <>
                {currentContent.nextButton} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };
  
  // Render payment and publish step
  const renderPaymentAndPublish = () => {
    if (!selectedProduct) return null;
    
    return (
      <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <h2 className="text-2xl font-bold">{currentContent.paymentTitle}</h2>
        <p className="text-muted-foreground">{currentContent.paymentText}</p>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden border mb-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-3 bg-gray-50">
                    <h3 className="font-medium text-sm">{selectedProduct.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {language === 'en' 
                        ? `Group size: ${groupSize} people` 
                        : `حجم المجموعة: ${groupSize} أشخاص`}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-5">
                <div className="border-b pb-4 space-y-3">
                  <div className="flex justify-between">
                    <span>{currentContent.serviceFeesText}</span>
                    <span>50 {language === 'en' ? 'SAR' : 'ريال'}</span>
                  </div>
                </div>
                
                <div className="pt-2 space-y-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{currentContent.totalText}</span>
                    <span className="text-royal-blue">50 {language === 'en' ? 'SAR' : 'ريال'}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">
                        {language === 'en' 
                          ? 'Deposit is fully refundable' 
                          : 'مبلغ التأمين قابل للاسترداد بالكامل'}
                      </h4>
                      <p className="text-sm text-blue-700">
                        {language === 'en'
                          ? 'The deposit will be deducted from your final purchase price when the group deal completes.'
                          : 'سيتم خصم مبلغ التأمين من سعر شرائك النهائي عند اكتمال صفقة المجموعة.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <div className="w-full flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(2)}
                className="flex items-center justify-center gap-1"
              >
                {language === 'ar' ? (
                  <>
                    {currentContent.backButton} <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <ArrowLeft className="h-4 w-4" /> {currentContent.backButton}
                  </>
                )}
              </Button>
              
              <Button 
                variant="green" 
                onClick={handlePayAndPublish}
                className="flex items-center justify-center gap-1 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RotateCw className="h-4 w-4 animate-spin" />
                    {language === 'en' ? 'Processing...' : 'جاري المعالجة...'}
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    {currentContent.publishButton}
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  // Render success state
  const renderSuccess = () => {
    return (
      <SuccessState 
        onViewJam3as={() => navigate('/my-jam3as')}
        onCreateAnother={resetForm}
      />
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">{currentContent.title}</h1>
            <p className="text-muted-foreground">{currentContent.subtitle}</p>
          </div>
          
          {currentStep < 4 && (
            <div className="mb-8">
              <StepIndicator
                currentStep={currentStep}
                steps={currentContent.stepTitles.map((title) => ({
                  label: title
                }))}
              />
            </div>
          )}
          
          {renderStepContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StartJam3a;
