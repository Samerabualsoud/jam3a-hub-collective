
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
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
  const { processPayment, isLoading, isSupabaseAvailable } = useMoyasarPayment();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('creditcard');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const { product, groupSize, discountTier } = location.state || {};
  const content = paymentContent[language];
  
  useEffect(() => {
    if (!product) {
      toast({
        title: content.missingInfo,
        description: content.redirecting,
        variant: 'destructive'
      });
      
      const timeout = setTimeout(() => {
        navigate('/start-jam3a');
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [product, navigate, toast, language, content]);

  if (!product) {
    return null;
  }

  const discountPrice = product.discounts?.[discountTier]?.price || product.price;
  
  const handlePayment = async () => {
    try {
      setPaymentError(null);
      
      console.log("Processing payment with method:", selectedMethod);
      console.log("Amount:", discountPrice);
      
      if (!isSupabaseAvailable) {
        setPaymentError('Supabase integration is not configured properly. Please check your Supabase connection.');
        toast({
          title: content.paymentError,
          description: 'Supabase integration is not configured properly.',
          variant: 'destructive'
        });
        return;
      }
      
      // Create a customer object with some default values
      // In a real app, you should collect this information from the user
      const customerInfo = {
        name: 'Customer Name',
        email: 'customer@example.com',
        phone: '+966500000000' // Optional but recommended for Saudi payments
      };
      
      const paymentResult = await processPayment({
        amount: discountPrice,
        currency: 'SAR',
        description: `Jam3a Payment for ${product.name} - Group of ${groupSize}`,
        source: {
          type: selectedMethod,
        },
        customer: customerInfo
      });

      if (paymentResult?.url) {
        console.log("Redirecting to payment URL:", paymentResult.url);
        window.location.href = paymentResult.url;
      } else {
        setPaymentError('Payment processed but no redirect URL was returned.');
        console.error('No payment URL returned:', paymentResult);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentError(error.message || content.paymentErrorMessage);
      toast({
        title: content.paymentError,
        description: error.message || content.paymentErrorMessage,
        variant: 'destructive'
      });
    }
  };

  const handleMethodChange = (value: string) => {
    if (value === 'creditcard' || value === 'mada' || value === 'applepay' || value === 'stcpay') {
      setSelectedMethod(value as PaymentMethodType);
      setPaymentError(null); // Clear any previous errors when changing payment method
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
            {!isSupabaseAvailable && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Supabase integration is not configured. Payment processing is unavailable.
                </AlertDescription>
              </Alert>
            )}
            
            {paymentError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {paymentError}
                </AlertDescription>
              </Alert>
            )}
            
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
              disabled={isLoading || !isSupabaseAvailable}
              variant="green"
            >
              {isLoading ? content.processing : content.payNow}
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
