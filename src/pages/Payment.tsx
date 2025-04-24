
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMoyasarPayment } from '@/hooks/useMoyasarPayment';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { processPayment, isLoading } = useMoyasarPayment();

  const { product, groupSize, discountTier } = location.state || {};

  if (!product) {
    navigate('/start-jam3a');
    return null;
  }

  const discountPrice = product.discounts?.[discountTier]?.price || product.price;
  
  const handlePayment = async () => {
    try {
      const paymentResult = await processPayment({
        amount: discountPrice,
        currency: 'SAR',
        description: `Jam3a Payment for ${product.name} - Group of ${groupSize}`,
        source: {
          type: 'creditcard'
        },
        customer: {
          name: 'Customer Name', // You might want to get this from user profile
          email: 'customer@example.com' // You might want to get this from user profile
        }
      });

      // Redirect to payment processing
      if (paymentResult?.url) {
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Payment Details' : 'تفاصيل الدفع'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? `Group Size: ${groupSize} people`
                  : `حجم المجموعة: ${groupSize} أشخاص`}
              </p>
              <div className="text-2xl font-bold text-royal-blue">
                {discountPrice} {language === 'en' ? 'SAR' : 'ريال'}
              </div>
            </div>
            
            <Button
              onClick={handlePayment}
              className="w-full"
              disabled={isLoading}
              variant="green"
            >
              {isLoading 
                ? (language === 'en' ? 'Processing...' : 'جاري المعالجة...')
                : (language === 'en' ? 'Proceed to Payment' : 'المتابعة للدفع')}
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
