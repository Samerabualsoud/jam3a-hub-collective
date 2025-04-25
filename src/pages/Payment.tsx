import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMoyasarPayment } from '@/hooks/useMoyasarPayment';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet } from 'lucide-react';

type PaymentMethodType = 'creditcard' | 'mada' | 'applepay' | 'stcpay';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { processPayment, isLoading } = useMoyasarPayment();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('creditcard');

  const { product, groupSize, discountTier } = location.state || {};

  const paymentMethods = [
    {
      id: 'creditcard' as PaymentMethodType,
      name: language === 'en' ? 'Credit Card' : 'بطاقة ائتمان',
      description: language === 'en' ? 'Pay with Visa or Mastercard' : 'ادفع باستخدام فيزا أو ماستركارد',
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      id: 'mada' as PaymentMethodType,
      name: 'mada بطاقة مدى',
      description: language === 'en' ? 'Pay with Saudi debit card' : 'ادفع باستخدام بطاقة مدى',
      icon: <img src="/mada-logo.svg" alt="Mada" className="h-6" />
    },
    {
      id: 'applepay' as PaymentMethodType,
      name: 'Apple Pay',
      description: language === 'en' ? 'Quick and secure payment' : 'دفع سريع وآمن',
      icon: <img src="/apple-pay.svg" alt="Apple Pay" className="h-6" />
    },
    {
      id: 'stcpay' as PaymentMethodType,
      name: 'STC Pay',
      description: language === 'en' ? 'Pay with STC Pay wallet' : 'ادفع باستخدام محفظة STC Pay',
      icon: <Wallet className="h-6 w-6" />
    }
  ];
  
  useEffect(() => {
    if (!product) {
      console.error("No product data found in location state");
      toast({
        title: language === 'en' ? 'Missing product information' : 'معلومات المنتج مفقودة',
        description: language === 'en' ? 'Redirecting back to start page' : 'جاري إعادة التوجيه إلى صفحة البداية',
        variant: 'destructive'
      });
      
      const timeout = setTimeout(() => {
        navigate('/start-jam3a');
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [product, navigate, toast, language]);

  if (!product) {
    return null;
  }

  const discountPrice = product.discounts?.[discountTier]?.price || product.price;
  
  const handlePayment = async () => {
    try {
      console.log("Processing payment with method:", selectedMethod);
      console.log("Amount:", discountPrice);
      
      const paymentResult = await processPayment({
        amount: discountPrice,
        currency: 'SAR',
        description: `Jam3a Payment for ${product.name} - Group of ${groupSize}`,
        source: {
          type: selectedMethod,
        },
        customer: {
          name: 'Customer Name', // You might want to get this from user profile
          email: 'customer@example.com' // You might want to get this from user profile
        }
      });

      if (paymentResult?.url) {
        console.log("Redirecting to payment URL:", paymentResult.url);
        window.location.href = paymentResult.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: language === 'en' ? 'Payment Error' : 'خطأ في الدفع',
        description: language === 'en' 
          ? 'There was an error processing your payment'
          : 'حدث خطأ أثناء معالجة الدفع',
        variant: 'destructive'
      });
    }
  };

  const content = {
    en: {
      title: 'Payment Details',
      subtitle: 'Choose your preferred payment method',
      product: 'Product',
      groupSize: 'Group Size',
      people: 'people',
      total: 'Total',
      payNow: 'Pay Now',
      securePayment: 'Secure payment powered by Moyasar',
    },
    ar: {
      title: 'تفاصيل الدفع',
      subtitle: 'اختر طريقة الدفع المفضلة لديك',
      product: 'المنتج',
      groupSize: 'حجم المجموعة',
      people: 'أشخاص',
      total: 'المجموع',
      payNow: 'ادفع الآن',
      securePayment: 'دفع آمن مدعوم من ميسر',
    }
  };

  const handleMethodChange = (value: string) => {
    if (value === 'creditcard' || value === 'mada' || value === 'applepay' || value === 'stcpay') {
      setSelectedMethod(value);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              {content[language].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{content[language].product}:</span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{content[language].groupSize}:</span>
                  <span className="font-medium">{groupSize} {content[language].people}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
                  <span>{content[language].total}:</span>
                  <span className="text-royal-blue">{discountPrice} SAR</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{content[language].subtitle}</h3>
              <RadioGroup
                value={selectedMethod}
                onValueChange={handleMethodChange}
                className="space-y-3"
              >
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:border-royal-blue transition-colors ${
                      selectedMethod === method.id ? 'border-royal-blue bg-royal-blue/5' : ''
                    }`}
                    onClick={() => handleMethodChange(method.id)}
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="flex-1 flex items-center gap-4">
                      {method.icon}
                      <div>
                        <Label htmlFor={method.id} className="text-base font-medium">
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full"
              size="lg"
              disabled={isLoading}
              variant="green"
            >
              {isLoading 
                ? (language === 'en' ? 'Processing...' : 'جاري المعالجة...')
                : content[language].payNow}
            </Button>

            <div className="text-center text-sm text-gray-500 mt-4">
              {content[language].securePayment}
            </div>

            <div className="flex justify-center space-x-4 items-center mt-6">
              <img src="/images/payment-logos/visa.svg" alt="Visa" className="h-6" />
              <img src="/images/payment-logos/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/images/payment-logos/mada.svg" alt="Mada" className="h-6" />
              <img src="/images/payment-logos/apple-pay.svg" alt="Apple Pay" className="h-6" />
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
