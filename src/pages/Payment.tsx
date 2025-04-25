
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMoyasarPayment } from '@/hooks/useMoyasarPayment';
import { RadioGroup } from "@/components/ui/radio-group";
import PaymentMethodOption from '@/components/payment/PaymentMethodOption';
import PaymentSummary from '@/components/payment/PaymentSummary';
import PaymentFooter from '@/components/payment/PaymentFooter';
import { paymentMethods, type PaymentMethodType } from '@/config/paymentMethods';
import { paymentContent } from '@/translations/paymentContent';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { processPayment, isLoading } = useMoyasarPayment();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('creditcard');

  const { product, groupSize, discountTier } = location.state || {};
  const content = paymentContent[language];
  
  useEffect(() => {
    if (!product) {
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
          name: 'Customer Name',
          email: 'customer@example.com'
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
              {content.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <PaymentSummary
              product={product}
              groupSize={groupSize}
              discountPrice={discountPrice}
              content={{
                product: content.product,
                groupSize: content.groupSize,
                people: content.people,
                total: content.total,
              }}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{content.subtitle}</h3>
              <RadioGroup
                value={selectedMethod}
                onValueChange={handleMethodChange}
                className="space-y-3"
              >
                {paymentMethods.map((method) => (
                  <PaymentMethodOption
                    key={method.id}
                    id={method.id}
                    name={language === 'en' ? method.name : method.nameAr}
                    description={language === 'en' ? method.description : method.descriptionAr}
                    icon={typeof method.icon === 'string' ? (
                      <img 
                        src={`/images/payment-logos/${method.icon}.svg`}
                        alt={method.name}
                        className="h-6"
                      />
                    ) : (
                      <method.icon className="h-6 w-6" />
                    )}
                    isSelected={selectedMethod === method.id}
                    onSelect={() => handleMethodChange(method.id)}
                  />
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
                : content.payNow}
            </Button>

            <PaymentFooter securePayment={content.securePayment} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;

