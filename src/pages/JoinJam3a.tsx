
import React, { useState } from 'react';
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
import { Loader2 } from 'lucide-react';

const JoinJam3a = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('details');
  const { processPayment, isLoading } = useMoyasarPayment();
  
  // Get product details from URL params
  const productName = searchParams.get('product') || 'Jam3a Deal';
  const productPrice = searchParams.get('price') || '4999 SAR';
  const productDiscount = searchParams.get('discount') || '16%';
  
  // Form state
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
  
  // Prevent tab change when clicking on tab triggers directly
  const handleTabChange = (value: string) => {
    // Don't allow direct tab navigation through clicks
    return;
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
      // Extract the numeric amount from the price string
      const amount = parseFloat(productPrice.replace(/[^0-9.]/g, ''));
      
      // Prepare payment source based on selected method
      let source: any = { type: 'creditcard' };
      
      if (formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'mada') {
        // Process credit card / mada payment
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
      
      // Process payment
      await processPayment({
        amount,
        currency: 'SAR',
        description: `Payment for ${productName}`,
        source,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }
      });
      
      // If we reach here, payment was successful
      toast({
        title: language === 'en' ? 'Success!' : 'تم بنجاح!',
        description: language === 'en' 
          ? `You have successfully joined the ${productName} Jam3a!` 
          : `لقد انضممت بنجاح إلى جمعة ${productName}!`,
      });
      
      // Redirect to home page after successful join
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      // Error handling is handled by the useMoyasarPayment hook
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {language === 'en' ? 'Join This Jam3a' : 'انضم إلى هذه الجمعة'}
          </h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3 pointer-events-none">
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
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <img 
                        src="/images/products/iphone_16_pro.jpg" 
                        alt={productName}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/purple/white?text=Product+Image';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">{productName}</h2>
                    
                    <div className="mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-royal-blue mr-2">
                          {productPrice.replace('SAR', '')} SAR
                        </span>
                        {productDiscount && (
                          <span className="text-sm bg-royal-blue-50 text-royal-blue px-2 py-1 rounded">
                            {productDiscount} OFF
                          </span>
                        )}
                      </div>
                      {productDiscount && (
                        <div className="text-sm text-gray-500 line-through">
                          {Math.round(parseInt(productPrice) / (1 - parseInt(productDiscount) / 100))} SAR
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? 'Deal Description' : 'وصف الصفقة'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'en' 
                          ? `Join this Jam3a to get ${productName} at a discounted price of ${productPrice}. By joining with others, you'll save ${productDiscount} off the regular price!`
                          : `انضم إلى هذه الجمعة للحصول على ${productName} بسعر مخفض قدره ${productPrice}. من خلال الانضمام مع الآخرين، ستوفر ${productDiscount} من السعر العادي!`
                        }
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? 'Jam3a Details' : 'تفاصيل الجمعة'}
                      </h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>{language === 'en' ? 'Current members: 8/10' : 'الأعضاء الحاليون: 8/10'}</li>
                        <li>{language === 'en' ? 'Estimated delivery: 2-3 weeks' : 'التسليم المتوقع: 2-3 أسابيع'}</li>
                        <li>{language === 'en' ? 'Payment options: Credit Card, Apple Pay, STC Pay' : 'خيارات الدفع: بطاقة ائتمان، آبل باي، STC Pay'}</li>
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={handleNextStep}
                      className="w-full bg-royal-blue hover:bg-royal-blue-dark"
                    >
                      {language === 'en' ? 'Continue to Next Step' : 'المتابعة إلى الخطوة التالية'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="info" className="p-6">
                <form className="space-y-6">
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
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      {language === 'en' ? 'Back' : 'رجوع'}
                    </Button>
                    
                    <Button 
                      type="button"
                      onClick={handleNextStep}
                      className="bg-royal-blue hover:bg-royal-blue-dark"
                    >
                      {language === 'en' ? 'Continue to Payment' : 'المتابعة إلى الدفع'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="payment" className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {language === 'en' ? 'Select Payment Method' : 'اختر طريقة الدفع'}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${formData.paymentMethod === 'credit-card' ? 'border-royal-blue bg-royal-blue-50' : ''}`}
                        onClick={() => handlePaymentMethodChange('credit-card')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">
                            {language === 'en' ? 'Credit Card' : 'بطاقة ائتمان'}
                          </div>
                          <div className="w-5 h-5 rounded-full border border-royal-blue flex items-center justify-center">
                            {formData.paymentMethod === 'credit-card' && (
                              <div className="w-3 h-3 rounded-full bg-royal-blue"></div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">Visa, Mastercard</div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${formData.paymentMethod === 'mada' ? 'border-royal-blue bg-royal-blue-50' : ''}`}
                        onClick={() => handlePaymentMethodChange('mada')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">MADA</div>
                          <div className="w-5 h-5 rounded-full border border-royal-blue flex items-center justify-center">
                            {formData.paymentMethod === 'mada' && (
                              <div className="w-3 h-3 rounded-full bg-royal-blue"></div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Saudi Debit Cards' : 'بطاقات مدى'}
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${formData.paymentMethod === 'apple-pay' ? 'border-royal-blue bg-royal-blue-50' : ''}`}
                        onClick={() => handlePaymentMethodChange('apple-pay')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">Apple Pay</div>
                          <div className="w-5 h-5 rounded-full border border-royal-blue flex items-center justify-center">
                            {formData.paymentMethod === 'apple-pay' && (
                              <div className="w-3 h-3 rounded-full bg-royal-blue"></div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Quick & Secure' : 'سريع وآمن'}
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${formData.paymentMethod === 'stc-pay' ? 'border-royal-blue bg-royal-blue-50' : ''}`}
                        onClick={() => handlePaymentMethodChange('stc-pay')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">STC Pay</div>
                          <div className="w-5 h-5 rounded-full border border-royal-blue flex items-center justify-center">
                            {formData.paymentMethod === 'stc-pay' && (
                              <div className="w-3 h-3 rounded-full bg-royal-blue"></div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {language === 'en' ? 'Mobile Payment' : 'الدفع عبر الجوال'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'mada') && (
                    <div className="space-y-4">
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
                      <span>{productPrice}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={isLoading}
                    >
                      {language === 'en' ? 'Back' : 'رجوع'}
                    </Button>
                    
                    <Button 
                      type="submit"
                      className="bg-royal-blue hover:bg-royal-blue-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {language === 'en' ? 'Processing...' : 'جاري المعالجة...'}
                        </>
                      ) : (
                        language === 'en' ? 'Complete Purchase' : 'إتمام الشراء'
                      )}
                    </Button>
                  </div>
                </form>
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
