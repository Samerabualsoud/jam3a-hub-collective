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
  
  // Translations
  const content = {
    en: {
      title: "Start Your Own Jam3a",
      subtitle: "Create a group buying deal and invite others to join",
      stepTitles: [
        "Select Category",
        "Choose Product",
        "Set Group Size",
        "Payment & Publish"
      ],
      categories: [
        { id: "smartphones", name: "Smartphones", icon: "📱" },
        { id: "laptops", name: "Laptops", icon: "💻" },
        { id: "audio", name: "Audio", icon: "🎧" },
        { id: "tvs", name: "TVs", icon: "📺" },
        { id: "wearables", name: "Wearables", icon: "⌚" }
      ],
      products: {
        smartphones: [
          { id: 1, name: "iPhone 16 Pro Max 256GB", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80", price: 4999, discounts: [
            { minCount: 3, price: 4799, savings: "4%" },
            { minCount: 5, price: 4599, savings: "8%" },
            { minCount: 10, price: 4199, savings: "16%" }
          ]},
          { id: 2, name: "Samsung Galaxy S25 Ultra", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80", price: 4599, discounts: [
            { minCount: 3, price: 4399, savings: "4%" },
            { minCount: 5, price: 4199, savings: "9%" },
            { minCount: 10, price: 3899, savings: "15%" }
          ]}
        ],
        laptops: [
          { id: 3, name: "MacBook Pro 16\" M3 Max", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80", price: 11999, discounts: [
            { minCount: 2, price: 11399, savings: "5%" },
            { minCount: 3, price: 10799, savings: "10%" },
            { minCount: 5, price: 9999, savings: "17%" }
          ]},
          { id: 4, name: "Dell XPS 15", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=80", price: 7999, discounts: [
            { minCount: 3, price: 7599, savings: "5%" },
            { minCount: 5, price: 7299, savings: "9%" },
            { minCount: 10, price: 6799, savings: "15%" }
          ]}
        ],
        tvs: [
          { id: 5, name: "Samsung 75\" 4K QLED TV", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", price: 7999, discounts: [
            { minCount: 3, price: 7599, savings: "5%" },
            { minCount: 5, price: 7199, savings: "10%" },
            { minCount: 10, price: 6399, savings: "20%" }
          ]},
          { id: 6, name: "LG 65\" OLED TV", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80", price: 5999, discounts: [
            { minCount: 3, price: 5699, savings: "5%" },
            { minCount: 5, price: 5399, savings: "10%" },
            { minCount: 10, price: 4799, savings: "20%" }
          ]}
        ],
        audio: [
          { id: 7, name: "AirPods Pro 2", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1600&q=80", price: 1099, discounts: [
            { minCount: 5, price: 999, savings: "9%" },
            { minCount: 10, price: 949, savings: "14%" },
            { minCount: 20, price: 879, savings: "20%" }
          ]}
        ],
        wearables: [
          { id: 8, name: "Apple Watch Ultra 2", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=1600&q=80", price: 3499, discounts: [
            { minCount: 3, price: 3299, savings: "6%" },
            { minCount: 5, price: 3149, savings: "10%" },
            { minCount: 10, price: 2799, savings: "20%" }
          ]}
        ]
      },
      groupSizeTitle: "Set Your Group Size",
      groupSizeText: "Select how many people need to join for the deal to activate. Larger groups lead to better discounts!",
      nextButton: "Continue",
      backButton: "Back",
      selectCategoryText: "Select a product category to start your Jam3a",
      selectProductText: "Choose the product you want to create a group for",
      paymentTitle: "Payment & Publication",
      paymentText: "Pay the deposit fee (SAR 50) to create your Jam3a. This amount will be deducted from your final purchase.",
      serviceFeesText: "Service fee (refundable): SAR 50",
      totalText: "Total to pay now: SAR 50",
      publishButton: "Pay & Publish Jam3a",
      successTitle: "Jam3a Created Successfully!",
      successText: "Your Jam3a has been created and is now visible to others. Share the link to invite others to join.",
      viewJam3a: "View My Jam3a",
      createAnother: "Create Another Jam3a",
      savingsText: "Group discount:",
      finalPriceText: "Your final price:",
      originalPriceText: "Original price:",
      minPeopleText: "Minimum people:",
    },
    ar: {
      title: "ابدأ جمعتك الخاصة",
      subtitle: "أنشئ صفقة شراء جماعية وادعُ الآخرين للانضمام",
      stepTitles: [
        "اختر الفئة",
        "اختر المنتج",
        "حدد حجم المجموعة",
        "الدفع والنشر"
      ],
      categories: [
        { id: "smartphones", name: "الهواتف الذكية", icon: "📱" },
        { id: "laptops", name: "أجهزة الكمبيوتر المحمولة", icon: "💻" },
        { id: "audio", name: "الصوتيات", icon: "🎧" },
        { id: "tvs", name: "التلفزيونات", icon: "📺" },
        { id: "wearables", name: "الأجهزة القابلة للارتداء", icon: "⌚" }
      ],
      products: {
        smartphones: [
          { id: 1, name: "آيفون 16 برو ماكس 256 جيجابايت", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80", price: 4999, discounts: [
            { minCount: 3, price: 4799, savings: "4%" },
            { minCount: 5, price: 4599, savings: "8%" },
            { minCount: 10, price: 4199, savings: "16%" }
          ]},
          { id: 2, name: "سامسونج جالاكسي S25 ألترا", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80", price: 4599, discounts: [
            { minCount: 3, price: 4399, savings: "4%" },
            { minCount: 5, price: 4199, savings: "9%" },
            { minCount: 10, price: 3899, savings: "15%" }
          ]}
        ],
        laptops: [
          { id: 3, name: "ماك بوك برو 16 بوصة M3 ماكس", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80", price: 11999, discounts: [
            { minCount: 2, price: 11399, savings: "5%" },
            { minCount: 3, price: 10799, savings: "10%" },
            { minCount: 5, price: 9999, savings: "17%" }
          ]},
          { id: 4, name: "ديل إكس بي إس 15", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=80", price: 7999, discounts: [
            { minCount: 3, price: 7599, savings: "5%" },
            { minCount: 5, price: 7299, savings: "9%" },
            { minCount: 10, price: 6799, savings: "15%" }
          ]}
        ],
        tvs: [
          { id: 5, name: "تلفاز سامسونج 75 بوصة QLED 4K", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", price: 7999, discounts: [
            { minCount: 3, price: 7599, savings: "5%" },
            { minCount: 5, price: 7199, savings: "10%" },
            { minCount: 10, price: 6399, savings: "20%" }
          ]},
          { id: 6, name: "تلفاز إل جي 65 بوصة OLED", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80", price: 5999, discounts: [
            { minCount: 3, price: 5699, savings: "5%" },
            { minCount: 5, price: 5399, savings: "10%" },
            { minCount: 10, price: 4799, savings: "20%" }
          ]}
        ],
        audio: [
          { id: 7, name: "إيربودز برو 2", image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1600&q=80", price: 1099, discounts: [
            { minCount: 5, price: 999, savings: "9%" },
            { minCount: 10, price: 949, savings: "14%" },
            { minCount: 20, price: 879, savings: "20%" }
          ]}
        ],
        wearables: [
          { id: 8, name: "ساعة أبل ألترا 2", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=1600&q=80", price: 3499, discounts: [
            { minCount: 3, price: 3299, savings: "6%" },
            { minCount: 5, price: 3149, savings: "10%" },
            { minCount: 10, price: 2799, savings: "20%" }
          ]}
        ]
      },
      groupSizeTitle: "حدد حجم مجموعتك",
      groupSizeText: "حدد عدد الأشخاص المطلوب انضمامهم لتفعيل الصفقة. المجموعات الأكبر تؤدي إلى خصومات أفضل!",
      nextButton: "متابعة",
      backButton: "رجوع",
      selectCategoryText: "اختر فئة المنتج لبدء الجمعة",
      selectProductText: "اختر المنتج الذي تريد إنشاء مجموعة له",
      paymentTitle: "الدفع والنشر",
      paymentText: "ادفع رسوم التأمين (50 ريال) لإنشاء الجمعة. سيتم خصم هذا المبلغ من مشترياتك النهائية.",
      serviceFeesText: "رسوم الخدمة (قابلة للاسترداد): 50 ريال",
      totalText: "المجموع للدفع الآن: 50 ريال",
      publishButton: "دفع ونشر الجمعة",
      successTitle: "تم إنشاء الجمعة بنجاح!",
      successText: "تم إنشاء الجمعة وهي الآن مرئية للآخرين. شارك الرابط لدعوة الآخرين للانضمام.",
      viewJam3a: "عرض جمعتي",
      createAnother: "إنشاء جمعة أخرى",
      savingsText: "خصم المجموعة:",
      finalPriceText: "السعر النهائي لك:",
      originalPriceText: "السعر الأصلي:",
      minPeopleText: "الحد الأدنى للأشخاص:",
    }
  };
  
  // Get content based on selected language
  const currentContent = content[language];
  
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
    const discountIndex = selectedProduct.discounts.findIndex(
      d => size >= d.minCount && (size < selectedProduct.discounts[discountIndex + 1]?.minCount || discountIndex === selectedProduct.discounts.length - 1)
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
      <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <h2 className="text-2xl font-bold">{currentContent.stepTitles[0]}</h2>
        <p className="text-muted-foreground">{currentContent.selectCategoryText}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentContent.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-all hover:border-royal-blue hover:bg-royal-blue/5"
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <span className="text-sm font-medium text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  // Render product selection step
  const renderProductSelection = () => {
    const products = getProducts();
    
    return (
      <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{currentContent.stepTitles[1]}</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentStep(0)}
            className="flex items-center gap-1"
          >
            {language === 'ar' ? (
              <>
                {currentContent.categories.find(c => c.id === selectedCategory)?.name} <ChevronRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <ChevronRight className="h-4 w-4 rotate-180" /> {currentContent.categories.find(c => c.id === selectedCategory)?.name}
              </>
            )}
          </Button>
        </div>
        
        <p className="text-muted-foreground">{currentContent.selectProductText}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className={`overflow-hidden cursor-pointer transition-all ${
                selectedProduct?.id === product.id ? 'border-royal-blue ring-2 ring-royal-blue/30' : 'hover:border-royal-blue/50'
              }`}
              onClick={() => handleProductSelect(product)}
            >
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-royal-blue">
                  {language === 'en' ? 'Up to ' : 'يصل إلى '}
                  {product.discounts[product.discounts.length - 1].savings} {language === 'en' ? 'OFF' : 'تخفيض'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-royal-blue">{product.price} {language === 'en' ? 'SAR' : 'ريال'}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  variant={selectedProduct?.id === product.id ? "green" : "outline"}
                  size="wide"
                  className={selectedProduct?.id === product.id ? "text-white" : ""}
                >
                  {selectedProduct?.id === product.id 
                    ? (language === 'en' ? 'Selected' : 'تم الاختيار')
                    : (language === 'en' ? 'Select This Product' : 'اختر هذا المنتج')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(0)}
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
          
          {selectedProduct && (
            <Button 
              variant="green" 
              onClick={() => setCurrentStep(2)}
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
        )}
      </div>
    </div>
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
                          onClick={() => setGroupSize(count)}
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
                          ? 'Deposit is fully refundable
