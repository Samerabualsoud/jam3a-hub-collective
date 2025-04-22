import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

const TermsOfService = () => {
  const { language } = useLanguage();

  const termsContent = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: April 20, 2025",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing and using Jam3a's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
        },
        {
          title: "2. User Registration",
          content: "To use certain features of our service, you must register for an account. You agree to provide accurate and complete information when creating your account and to update such information to keep it accurate and current."
        },
        {
          title: "3. Group Buying Process",
          content: "Jam3a facilitates group buying opportunities. When creating or joining a Jam3a (group purchase), you agree to fulfill payment obligations if the minimum group size is reached. Jam3a reserves the right to cancel any purchase that doesn't reach its minimum group size requirement."
        },
        {
          title: "4. Payment and Fees",
          content: "Payment for purchases is collected when joining a Jam3a. A service fee may be applied to transactions. Refunds are processed according to our refund policy if a group purchase doesn't reach the required minimum participants."
        },
        {
          title: "5. Privacy",
          content: "Your use of our service is governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding your personal information."
        },
        {
          title: "6. Modifications to the Service",
          content: "Jam3a reserves the right to modify or discontinue, temporarily or permanently, the service or any features or portions thereof without prior notice. You agree that Jam3a will not be liable for any modification, suspension, or discontinuance of the service."
        },
        {
          title: "7. Limitation of Liability",
          content: "In no event shall Jam3a be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service."
        },
        {
          title: "8. Governing Law",
          content: "These Terms shall be governed by the laws of Saudi Arabia without regard to its conflict of law provisions."
        }
      ]
    },
    ar: {
      title: "شروط الخدمة",
      lastUpdated: "آخر تحديث: 20 أبريل 2025",
      sections: [
        {
          title: "1. قبول الشروط",
          content: "من خلال الوصول إلى خدمات جمعة واستخدامها، فإنك تقر بأنك قد قرأت وفهمت وتوافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا."
        },
        {
          title: "2. تسجيل المستخدم",
          content: "لاستخدام ميزات معينة من خدمتنا، يجب عليك التسجيل للحصول على حساب. أنت توافق على تقديم معلومات دقيقة وكاملة عند إنشاء حسابك وتحديث هذه المعلومات للحفاظ على دقتها وحداثتها."
        },
        {
          title: "3. عملية الشراء الجماعي",
          content: "تُسهّل جمعة فرص الشراء الجماعي. عند إنشاء أو الانضمام إلى جمعة (شراء جماعي)، فإنك توافق على الوفاء بالتزامات الدفع إذا تم الوصول إلى الحد الأدنى لحجم المجموعة. تحتفظ جمعة بالحق في إلغاء أي عملية شراء لا تصل إلى الحد الأدنى المطلوب لحجم المجموعة."
        },
        {
          title: "4. الدفع والرسوم",
          content: "يتم تحصيل مدفوعات المشتريات عند الانضمام إلى جمعة. قد يتم تطبيق رسوم خدمة على المعاملات. تتم معالجة المبالغ المستردة وفقًا لسياسة الاسترداد الخاصة بنا إذا لم يصل الشراء الجماعي إلى الحد الأدنى المطلوب من المشاركين."
        },
        {
          title: "5. الخصوصية",
          content: "يخضع استخدامك لخدمتنا لسياسة الخصوصية الخاصة بنا، والتي تم دمجها في هذه الشروط بالإشارة إليها. يرجى مراجعة سياسة الخصوصية الخاصة بنا لفهم ممارساتنا المتعلقة بمعلوماتك الشخصية."
        },
        {
          title: "6. التعديلات على الخدمة",
          content: "تحتفظ جمعة بالحق في تعديل أو إيقاف الخدمة أو أي ميزات أو أجزاء منها مؤقتًا أو بشكل دائم دون إشعار مسبق. أنت توافق على أن جمعة لن تكون مسؤولة عن أي تعديل أو تعليق أو إيقاف للخدمة."
        },
        {
          title: "7. حدود المسؤولية",
          content: "لن تكون جمعة بأي حال من الأحوال مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو تأديبية، بما في ذلك على سبيل المثال لا الحصر، فقدان الأرباح أو البيانات أو الاستخدام أو السمعة الطيبة أو غيرها من الخسائر غير الملموسة، الناتجة عن وصولك إلى أو استخدامك أو عدم قدرتك على الوصول إلى أو استخدام الخدمة."
        },
        {
          title: "8. القانون الحاكم",
          content: "تخضع هذه الشروط لقوانين المملكة العربية السعودية دون اعتبار لأحكام تضارب القوانين فيها."
        }
      ]
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-2">
              {termsContent[language].title}
            </h1>
            <p className="text-muted-foreground mb-8">
              {termsContent[language].lastUpdated}
            </p>
            
            <div className="space-y-6">
              {termsContent[language].sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-semibold mb-2">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
