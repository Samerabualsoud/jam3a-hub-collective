
interface PaymentContent {
  title: string;
  subtitle: string;
  product: string;
  groupSize: string;
  people: string;
  total: string;
  payNow: string;
  securePayment: string;
  processing: string;
  paymentError: string;
  paymentErrorMessage: string;
  missingInfo: string;
  redirecting: string;
  paymentConnectionError: string;
  paymentVerificationError: string;
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
    processing: 'Processing...',
    paymentError: 'Payment Error',
    paymentErrorMessage: 'There was an error processing your payment',
    missingInfo: 'Missing product information',
    redirecting: 'Redirecting back to start page',
    paymentConnectionError: 'Payment system is not properly configured',
    paymentVerificationError: 'Failed to verify payment'
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
    processing: 'جاري المعالجة...',
    paymentError: 'خطأ في الدفع',
    paymentErrorMessage: 'حدث خطأ أثناء معالجة الدفع',
    missingInfo: 'معلومات المنتج مفقودة',
    redirecting: 'جاري إعادة التوجيه إلى صفحة البداية',
    paymentConnectionError: 'نظام الدفع غير مهيأ بشكل صحيح',
    paymentVerificationError: 'فشل في التحقق من الدفع'
  }
};
