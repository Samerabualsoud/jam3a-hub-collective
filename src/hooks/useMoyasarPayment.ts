
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface PaymentSource {
  type: 'creditcard' | 'applepay' | 'stcpay' | 'mada';
  name?: string;
  number?: string;
  cvc?: string;
  month?: string;
  year?: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
}

interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  source: PaymentSource;
  customer: CustomerInfo;
  callback_url?: string;
}

interface PaymentResponse {
  id: string;
  status: string;
  amount: number;
  fee: number;
  currency: string;
  refunded: number;
  refunded_at: null | string;
  captured: boolean;
  captured_at: null | string;
  voided_at: null | string;
  description: string;
  amount_format: string;
  fee_format: string;
  refunded_format: string;
  source: {
    type: string;
    company: string;
    name: string;
    number: string;
    message: null | string;
    transaction_url: string;
    url?: string;
  };
  ip: string;
  callback_url: string;
  created_at: string;
  updated_at: string;
  url?: string;
}

export const useMoyasarPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const { toast } = useToast();
  
  const supabase = useSupabaseClient();
  const isSupabaseAvailable = !!supabase && typeof supabase.functions?.invoke === 'function';

  const processPayment = async (paymentDetails: PaymentDetails) => {
    if (!isSupabaseAvailable) {
      toast({
        title: 'Connection error',
        description: 'Payment system is not properly configured.',
        variant: 'destructive',
      });
      throw new Error('Payment system is not configured');
    }
    
    setIsLoading(true);
    try {
      const callback_url = window.location.origin + '/payment-callback';
      
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          ...paymentDetails,
          callback_url
        },
      });
      
      if (error) throw new Error(error.message);
      setPaymentData(data);
      
      toast({
        title: 'Payment processed',
        description: `Payment status: ${data.status}`,
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Payment error',
        description: error.message || 'Failed to process payment',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (paymentId: string) => {
    if (!isSupabaseAvailable) {
      toast({
        title: 'Connection error',
        description: 'Payment verification is not properly configured.',
        variant: 'destructive',
      });
      throw new Error('Payment verification is not configured');
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: {
          payment_id: paymentId
        },
      });
      
      if (error) throw new Error(error.message);
      setPaymentData(data);
      return data;
    } catch (error: any) {
      toast({
        title: 'Verification error',
        description: error.message || 'Failed to verify payment',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    processPayment,
    verifyPayment,
    paymentData,
    isLoading,
    isSupabaseAvailable
  };
};
