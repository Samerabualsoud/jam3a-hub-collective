
import { Wallet } from 'lucide-react';

export type PaymentMethodType = 'creditcard' | 'mada' | 'applepay' | 'stcpay';

interface PaymentMethod {
  id: PaymentMethodType;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: string | typeof Wallet;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'creditcard',
    name: 'Credit Card',
    nameAr: 'بطاقة ائتمان',
    description: 'Pay with Visa or Mastercard',
    descriptionAr: 'ادفع باستخدام فيزا أو ماستركارد',
    icon: 'credit-cards'
  },
  {
    id: 'mada',
    name: 'Mada',
    nameAr: 'مدى',
    description: 'Pay with Saudi debit card',
    descriptionAr: 'ادفع باستخدام بطاقة مدى',
    icon: 'mada'
  },
  {
    id: 'applepay',
    name: 'Apple Pay',
    nameAr: 'Apple Pay',
    description: 'Quick and secure payment',
    descriptionAr: 'دفع سريع وآمن',
    icon: 'apple-pay'
  },
  {
    id: 'stcpay',
    name: 'STC Pay',
    nameAr: 'STC Pay',
    description: 'Pay with STC Pay wallet',
    descriptionAr: 'ادفع باستخدام محفظة STC Pay',
    icon: Wallet
  }
];

