
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/Header';
import { useMoyasarPayment } from '@/hooks/useMoyasarPayment';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const { verifyPayment, isLoading } = useMoyasarPayment();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failure' | 'pending' | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const paymentId = searchParams.get('id');

  useEffect(() => {
    const checkPayment = async () => {
      if (!paymentId) {
        setPaymentStatus('failure');
        return;
      }

      try {
        const result = await verifyPayment(paymentId);
        
        if (result.status === 'paid') {
          setPaymentStatus('success');
        } else if (result.status === 'failed') {
          setPaymentStatus('failure');
        } else {
          setPaymentStatus('pending');
        }

        setPaymentDetails(result);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setPaymentStatus('failure');
      }
    };

    checkPayment();
  }, [paymentId, verifyPayment]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {language === 'en' ? 'Payment Status' : 'حالة الدفع'}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'en' ? 'Processing your payment' : 'جاري معالجة الدفع الخاص بك'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-6">
            {isLoading || paymentStatus === null ? (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-16 w-16 animate-spin text-purple-600" />
                <p>{language === 'en' ? 'Processing your payment...' : 'جاري معالجة الدفع...'}</p>
              </div>
            ) : paymentStatus === 'success' ? (
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h2 className="text-xl font-bold text-green-500">
                  {language === 'en' ? 'Payment Successful!' : 'تم الدفع بنجاح!'}
                </h2>
                {paymentDetails && (
                  <div className="w-full space-y-2 text-center">
                    <p className="text-gray-700">{language === 'en' ? 'Transaction ID:' : 'رقم العملية:'} {paymentDetails.id}</p>
                    <p className="text-gray-700">{language === 'en' ? 'Amount:' : 'المبلغ:'} {(paymentDetails.amount / 100).toFixed(2)} {paymentDetails.currency}</p>
                  </div>
                )}
              </div>
            ) : paymentStatus === 'failure' ? (
              <div className="flex flex-col items-center space-y-4">
                <XCircle className="h-16 w-16 text-red-500" />
                <h2 className="text-xl font-bold text-red-500">
                  {language === 'en' ? 'Payment Failed' : 'فشل الدفع'}
                </h2>
                <p className="text-center text-gray-700">
                  {language === 'en' 
                    ? 'Sorry, there was a problem processing your payment. Please try again.' 
                    : 'نأسف، كانت هناك مشكلة في معالجة دفعتك. يرجى المحاولة مرة أخرى.'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-16 w-16 animate-spin text-yellow-500" />
                <h2 className="text-xl font-bold text-yellow-500">
                  {language === 'en' ? 'Payment Pending' : 'الدفع قيد الانتظار'}
                </h2>
                <p className="text-center text-gray-700">
                  {language === 'en' 
                    ? 'Your payment is being processed. Please wait a moment.' 
                    : 'جاري معالجة دفعتك. يرجى الانتظار لحظة.'}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate('/')}
            >
              {language === 'en' ? 'Return to Home' : 'العودة إلى الصفحة الرئيسية'}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentCallback;
