
interface PaymentContent {
  title: string;
  subtitle: string;
  product: string;
  groupSize: string;
  people: string;
  total: string;
  payNow: string;
  securePayment: string;
}

interface PaymentTranslations {
  en: PaymentContent;
  ar: PaymentContent;
}

export const paymentContent: PaymentTranslations = {
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

