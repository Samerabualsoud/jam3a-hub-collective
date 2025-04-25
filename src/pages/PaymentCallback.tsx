
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMoyasarPayment } from '@/hooks/useMoyasarPayment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { paymentContent } from '@/translations/paymentContent';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyPayment } = useMoyasarPayment();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const { language } = useLanguage();
  const content = paymentContent[language];
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    const paymentId = searchParams.get('id');
    const paymentStatus = searchParams.get('status');

    if (!paymentId) {
      setStatus('error');
      setErrorMessage('No payment ID found in URL parameters.');
      return;
    }

    console.log("Payment callback received - ID:", paymentId, "Status:", paymentStatus);

    // If payment status is already known from the URL, use it
    if (paymentStatus === 'paid') {
      setStatus('success');
      toast({
        title: 'Payment Successful',
        description: 'Your payment was processed successfully.',
      });
      return;
    } else if (paymentStatus === 'failed') {
      setStatus('error');
      setErrorMessage('Payment failed. Please try again.');
      toast({
        title: 'Payment Failed',
        description: 'Your payment could not be processed.',
        variant: 'destructive',
      });
      return;
    }

    // Otherwise, verify the payment
    const verifyPaymentStatus = async () => {
      try {
        if (!supabase || typeof supabase.functions?.invoke !== 'function') {
          throw new Error("Supabase client is not available");
        }
        
        console.log("Verifying payment with ID:", paymentId);
        const result = await verifyPayment(paymentId);
        console.log("Payment verification result:", result);
        
        setPaymentDetails(result);
        
        if (result.status === 'paid') {
          setStatus('success');
          toast({
            title: 'Payment Verified',
            description: 'Your payment was verified successfully.',
          });
        } else {
          setStatus('error');
          setErrorMessage(`Payment status: ${result.status}`);
        }
      } catch (error: any) {
        console.error("Payment verification error:", error);
        setStatus('error');
        setErrorMessage(error.message || content.paymentVerificationError);
      }
    };

    verifyPaymentStatus();
  }, [searchParams, toast, supabase, verifyPayment, content]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {status === 'success' ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Payment Successful
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Payment Failed
                </>
              ) : (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying Payment
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {status === 'loading' && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-jam3a-purple"></div>
              </div>
            )}
            
            {status === 'success' && (
              <>
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription>
                    Your payment has been processed successfully. Thank you for your purchase!
                  </AlertDescription>
                </Alert>
                
                {paymentDetails && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-2">Payment Details</h3>
                    <p className="text-sm">Amount: {paymentDetails.amount_format}</p>
                    <p className="text-sm">Reference: {paymentDetails.id}</p>
                    <p className="text-sm">Date: {new Date(paymentDetails.created_at).toLocaleString()}</p>
                  </div>
                )}
              </>
            )}
            
            {status === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {errorMessage || 'An error occurred while processing your payment.'}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-end">
              <Button onClick={() => navigate('/')} className="bg-jam3a-purple hover:bg-jam3a-deep-purple">
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentCallback;
