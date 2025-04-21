import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/Header';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMoyasarPayment } from '@/hooks/useMoyasarPayment';
import { Loader2, ArrowRight, ArrowLeft, Users, Clock, ShieldCheck } from 'lucide-react';
import { StepIndicator } from '@/components/ui/step-indicator';
import Jam3aBenefits from '@/components/Jam3aBenefits';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const JoinJam3a = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('details');
  const { processPayment, isLoading } = useMoyasarPayment();
  const supabase = useSupabaseClient();
  
  const productName = searchParams.get('product') || 'Jam3a Deal';
  const productPrice = searchParams.get('price') || '4999 SAR';
  const productDiscount = searchParams.get('discount') || '16%';
  const productCategory = searchParams.get('category') || 'Mobile';
  
  const formattedTitle = language === 'en' 
    ? `${productCategory} Jam3a: ${productName.replace(`${productCategory} Jam3a: `, '')}`
    : `جمعة ${productCategory}: ${productName.replace(`جمعة ${productCategory}: `, '')}`;
  
  useEffect(() => {
    console.log("URL Parameters:", {
      product: productName,
      price: productPrice,
      discount: productDiscount,
      category: productCategory
    });
  }, [productName, productPrice, productDiscount, productCategory]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleNextStep = () => {
    if (activeTab === 'details') {
      setActiveTab('info');
    } else if (activeTab === 'info') {
      setActiveTab('payment');
    }
  };
  
  const handlePrevStep = () => {
    if (activeTab === 'info') {
      setActiveTab('details');
    } else if (activeTab === 'payment') {
      setActiveTab('info');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Check if Supabase client is available
      if (!supabase) {
        toast({
          title: language === 'en' ? 'Connection Error' : 'خطأ في الاتصال',
          description: language === 'en' ? 'Payment system is not properly configured.' : 'نظام الدفع غير مهيأ بشكل صحيح.',
          variant: 'destructive',
        });
        return;
      }
      
      const amount = parseFloat(productPrice.replace(/[^0-9.]/g, ''));
      
      let source: any = { type: 'creditcard' };
      
      if (formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'mada') {
        const [month, year] = formData.cardExpiry.split('/');
        source = {
          type: formData.paymentMethod === 'credit-card' ? 'creditcard' : 'mada',
          name: formData.cardName,
          number: formData.cardNumber.replace(/\s/g, ''),
          cvc: formData.cardCvc,
          month: month?.trim(),
          year: `20${year?.trim()}`
        };
      } else if (formData.paymentMethod === 'apple-pay') {
        source = { type: 'applepay' };
      } else if (formData.paymentMethod === 'stc-pay') {
        source = { type: 'stcpay' };
      }
      
      // Direct invocation of the edge function
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          amount,
          currency: 'SAR',
          description: `Payment for ${formattedTitle}`,
          callback_url: `${window.location.origin}/payment-callback`,
          source,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          }
        },
      });
      
      if (error) throw new Error(error.message);
      
      if (data && data.url) {
        // For redirect-based payment methods
        window.location.href = data.url;
      } else {
        toast({
          title: language === 'en' ? 'Success!' : 'تم بنجاح!',
          description: language === 'en' 
            ? `You have successfully joined the ${formattedTitle} Jam3a!` 
            : `لقد انضممت بنجاح إلى جمعة ${formattedTitle}!`,
          variant: 'default',
        });
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: language === 'en' ? 'Payment Failed' : 'فشل الدفع',
        description: language === 'en' 
          ? 'There was an issue processing your payment. Please try again.' 
          : 'حدثت مشكلة أثناء معالجة الدفع الخاص بك. حاول مرة اخرى.',
        variant: 'destructive',
      });
    }
  };
  
  const [relatedProducts, setRelatedProducts] = useState<{
    id: number;
    name: string;
    price: number;
    image: string;
  }[]>([]);

  const getProductImage = () => {
    const category = productCategory.toLowerCase();
    if (category === 'mobile' || category === 'phone') {
      return "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80";
    } else if (category === 'tv' || category === 'television') {
      return "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80";
    } else if (category === 'laptop') {
      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80";
    }
    return "https://placehold.co/400x400/purple/white?text=Product+Image";
  };

  useEffect(() => {
    const getRelatedProducts = () => {
      const category = productCategory.toLowerCase();
      let products = [];
      
      if (category === 'tv') {
        products = [
          { id: 1, name: 'Samsung 75" 4K QLED TV', price: 6799, image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1600&q=80" },
          { id: 2, name: 'LG 65" OLED TV', price: 5899, image: "https://images.unsplash.com/photo-1577975882846-431adc8c2009?auto=format&fit=crop&w=1600&q=80" }
        ];
      } else if (category === 'laptop') {
        products = [
          { id: 1, name: 'MacBook Pro 16" M3 Max', price: 10299, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80" },
          { id: 2, name: 'Dell XPS 15', price: 8999, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1600&q=80" }
        ];
      } else if (category === 'mobile') {
        products = [
          { id: 1, name: 'iPhone 16 Pro Max 256GB', price: 4199, image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80" },
          { id: 2, name: 'Samsung Galaxy S25 Ultra', price: 4599, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80" }
        ];
      }
      
      setRelatedProducts(products);
    };

    getRelatedProducts();
  }, [productCategory]);

  const steps = [
    { label: language === 'en' ? 'Deal Details' : 'تفاصيل الصفقة' },
    { label: language === 'en' ? 'Your Info' : 'معلوماتك' },
    { label: language === 'en' ? 'Payment' : 'الدفع' },
  ];

  const getActiveIndex = () => {
    switch (activeTab) {
      case 'details': return 0;
      case 'info': return 1;
      case 'payment': return 2;
      default: return 0;
    }
  };

  const renderDetailsContent = () => (
    <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
      <div className="md:w-1/3">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img 
            src={getProductImage()} 
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <Jam3aBenefits variant="compact" className="mt-4" />
      </div>
      
      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-royal-blue to-royal-blue-light text-transparent bg-clip-text">
          {formattedTitle}
        </h2>
        
        <div className="mb-4 flex items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-royal-blue mr-2">
              {productPrice.replace('SAR', '')} SAR
            </span>
            {productDiscount && (
              <span className="text-sm bg-royal-blue-50 text-royal-blue px-2 py-1 rounded-full font-medium">
                {productDiscount} OFF
              </span>
            )}
          </div>
          {productDiscount && (
            <div className="text-sm text-gray-500 line-through ml-4">
              {Math.round(parseInt(productPrice) / (1 - parseInt(productDiscount) / 100))} SAR
            </div>
          )}
        </div>
        
        <div className="mb-6 p-4 bg-royal-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">
            {language === 'en' ? 'Deal Description' : 'وصف الصفقة'}
          </h3>
          <p className="text-gray-600">
            {language === 'en' 
              ? `Join this Jam3a to get ${formattedTitle} at a discounted price of ${productPrice}. By joining with others, you'll save ${productDiscount} off the regular price!`
              : `انضم إلى هذه الجمعة للحصول على ${formattedTitle} بسعر مخفض قدره ${productPrice}. من خلال الانضمام مع الآخرين، ستوفر ${productDiscount} من السعر العادي!`
            }
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">
            {language === 'en' ? 'Jam3a Details' : 'تفاصيل الجمعة'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Users className="text-royal-blue h-5 w-5" />
              <span>{language === 'en' ? 'Current members: 8/10' : 'الأعضاء الحاليون: 8/10'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <Clock className="text-royal-blue h-5 w-5" />
              <span>{language === 'en' ? 'Delivery: 2-3 weeks' : 'التسليم: 2-3 أسابيع'}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">
            {language === 'en' ? 'Available Products in this Category' : 'المنتجات المتوفرة في هذه الفئة'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  product.name === productName ? 'border-royal-blue bg-royal-blue-50' : 'hover:border-royal-blue hover:bg-gray-50'
                }`}
                onClick={() => {
                  const searchParams = new URLSearchParams(window.location.search);
                  searchParams.set('product', `${productCategory} Jam3a: ${product.name}`);
                  searchParams.set('price', `${product.price} SAR`);
                  window.history.replaceState(null, '', `?${searchParams.toString()}`);
                  window.location.reload();
                }}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-royal-blue font-semibold mt-1">
                      {product.price} SAR
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Jam3aBenefits />
        
        <Button 
          variant="green"
          size="wide"
          onClick={handleNextStep}
          className="mt-6 group shadow-md hover:shadow-lg"
        >
          <span className="flex items-center justify-center">
            {language === 'en' ? 'Continue to Your Information' : 'المتابعة إلى معلوماتك'}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </div>
  );

  const renderUserInfoContent = () => (
    <form className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
          </Label>
          <Input 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={language === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
            className="border-royal-blue/20 focus:border-royal-blue"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">
            {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
          </Label>
          <Input 
            id="email" 
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
            className="border-royal-blue/20 focus:border-royal-blue"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">
            {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
          </Label>
          <Input 
            id="phone" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={language === 'en' ? 'Enter your phone number' : 'أدخل رقم هاتفك'}
            className="border-royal-blue/20 focus:border-royal-blue"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">
            {language === 'en' ? 'Delivery Address' : 'عنوان التسليم'}
          </Label>
          <Input 
            id="address" 
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder={language === 'en' ? 'Enter your address' : 'أدخل عنوانك'}
            className="border-royal-blue/20 focus:border-royal-blue"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button"
          variant="outline"
          onClick={handlePrevStep}
          className="group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {language === 'en' ? 'Back to Details' : 'رجوع إلى التفاصيل'}
        </Button>
        
        <Button 
          type="button"
          variant="green"
          onClick={handleNextStep}
          className="group shadow-sm hover:shadow-md"
        >
          {language === 'en' ? 'Continue to Payment' : 'المتابعة إلى الدفع'}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </form>
  );

  const renderPaymentContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'Select Payment Method' : 'اختر طريقة الدفع'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['credit-card', 'mada', 'apple-pay', 'stc-pay'].map((method) => {
            const methodInfo = {
              'credit-card': {
                title: language === 'en' ? 'Credit Card' : 'بطاقة ائتمان',
                subtitle: 'Visa, Mastercard'
              },
              'mada': {
                title: 'MADA',
                subtitle: language === 'en' ? 'Saudi Debit Cards' : 'بطاقات مدى'
              },
              'apple-pay': {
                title: 'Apple Pay',
                subtitle: language === 'en' ? 'Quick & Secure' : 'سريع وآمن'
              },
              'stc-pay': {
                title: 'STC Pay',
                subtitle: language === 'en' ? 'Mobile Payment' : 'الدفع عبر الجوال'
              }
            };
            
            return (
              <div 
                key={method}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.paymentMethod === method 
                    ? 'border-royal-blue bg-royal-blue-50 shadow-sm' 
                    : 'hover:border-royal-blue hover:bg-gray-50'
                }`}
                onClick={() => handlePaymentMethodChange(method)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">
                    {methodInfo[method].title}
                  </div>
                  <div className="w-5 h-5 rounded-full border border-royal-blue flex items-center justify-center">
                    {formData.paymentMethod === method && (
                      <div className="w-3 h-3 rounded-full bg-royal-blue"></div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{methodInfo[method].subtitle}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'mada') && (
        <div className="space-y-4 bg-royal-blue-50/50 p-4 rounded-lg border border-royal-blue/10">
          <div className="space-y-2">
            <Label htmlFor="cardName">
              {language === 'en' ? 'Name on Card' : 'الاسم على البطاقة'}
            </Label>
            <Input 
              id="cardName" 
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder={language === 'en' ? 'Enter name on card' : 'أدخل الاسم على البطاقة'}
              className="border-royal-blue/20 focus:border-royal-blue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">
              {language === 'en' ? 'Card Number' : 'رقم البطاقة'}
            </Label>
            <Input 
              id="cardNumber" 
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className="border-royal-blue/20 focus:border-royal-blue"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">
                {language === 'en' ? 'Expiry Date' : 'تاريخ الانتهاء'}
              </Label>
              <Input 
                id="cardExpiry" 
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="border-royal-blue/20 focus:border-royal-blue"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardCvc">CVC</Label>
              <Input 
                id="cardCvc" 
                name="cardCvc"
                value={formData.cardCvc}
                onChange={handleInputChange}
                placeholder="123"
                className="border-royal-blue/20 focus:border-royal-blue"
                required
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between mb-2">
          <span>{language === 'en' ? 'Subtotal' : 'المجموع الفرعي'}</span>
          <span>{productPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>{language === 'en' ? 'Shipping' : 'الشحن'}</span>
          <span>0 SAR</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>{language === 'en' ? 'Total' : 'المجموع'}</span>
          <span className="text-royal-blue">{productPrice}</span>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button"
          variant="outline"
          onClick={handlePrevStep}
          disabled={isLoading}
          className="group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {language === 'en' ? 'Back' : 'رجوع'}
        </Button>
        
        <Button 
          type="submit"
          variant="green"
          disabled={isLoading}
          className="relative shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {language === 'en' ? 'Processing...' : 'جاري المعالجة...'}
            </>
          ) : (
            <span className="flex items-center">
              {language === 'en' ? 'Complete Purchase' : 'إتمام الشراء'} 
              <ShieldCheck className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-royal-blue to-royal-blue-light text-transparent bg-clip-text">
            {language === 'en' ? 'Join This Jam3a' : 'انضم إلى هذه الجمعة'}
          </h1>
          
          <StepIndicator currentStep={getActiveIndex()}>
            {steps.map((step, index) => (
              <div key={index}>{step.label}</div>
            ))}
          </StepIndicator>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mt-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="hidden">
                <TabsTrigger value="details">
                  {language === 'en' ? 'Deal Details' : 'تفاصيل الصفقة'}
                </TabsTrigger>
                <TabsTrigger value="info">
                  {language === 'en' ? 'Your Information' : 'معلوماتك'}
                </TabsTrigger>
                <TabsTrigger value="payment">
                  {language === 'en' ? 'Payment' : 'الدفع'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="p-6">
                {renderDetailsContent()}
              </TabsContent>
              
              <TabsContent value="info" className="p-6">
                {renderUserInfoContent()}
              </TabsContent>
              
              <TabsContent value="payment" className="p-6">
                {renderPaymentContent()}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JoinJam3a;
