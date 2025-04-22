
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/Header';

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const policyContent = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: April 20, 2025",
      sections: [
        {
          title: "1. Information We Collect",
          content: "We collect personal information that you provide to us, such as your name, email address, phone number, and payment information when you register for an account, create or join a Jam3a, or contact our customer service. We also automatically collect certain information about your device and how you interact with our services."
        },
        {
          title: "2. How We Use Your Information",
          content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you related information including confirmations and notifications, respond to your comments and questions, communicate with you about products, services, offers, and events, and provide customer support."
        },
        {
          title: "3. Information Sharing",
          content: "We may share your personal information with third-party service providers to perform functions on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service. We may also share information when we believe it is necessary to comply with law or protect our rights."
        },
        {
          title: "4. Data Security",
          content: "We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security."
        },
        {
          title: "5. Your Choices",
          content: "You can access, update, or delete your account information at any time by logging into your account settings. You can also opt out of receiving promotional communications from us by following the unsubscribe instructions included in these communications."
        },
        {
          title: "6. Cookies",
          content: "We use cookies and similar technologies to collect information about your activity, browser, and device. You can manage your cookie preferences through your browser settings, but this may impact your experience with our services."
        },
        {
          title: "7. Children's Privacy",
          content: "Our service is not directed to children under 18, and we do not knowingly collect personal information from children under 18. If we learn we have collected personal information from a child under 18, we will delete such information."
        },
        {
          title: "8. Changes to This Policy",
          content: "We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page."
        }
      ]
    },
    ar: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: 20 أبريل 2025",
      sections: [
        {
          title: "1. المعلومات التي نجمعها",
          content: "نحن نجمع المعلومات الشخصية التي تقدمها لنا، مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك ومعلومات الدفع عند تسجيلك للحصول على حساب أو إنشاء جمعة أو الانضمام إليها أو الاتصال بخدمة العملاء لدينا. كما نقوم تلقائيًا بجمع معلومات معينة حول جهازك وكيفية تفاعلك مع خدماتنا."
        },
        {
          title: "2. كيف نستخدم معلوماتك",
          content: "نستخدم المعلومات التي نجمعها لتوفير خدماتنا وصيانتها وتحسينها، ومعالجة المعاملات، وإرسال المعلومات ذات الصلة إليك بما في ذلك التأكيدات والإخطارات، والرد على تعليقاتك وأسئلتك، والتواصل معك بشأن المنتجات والخدمات والعروض والأحداث، وتقديم دعم العملاء."
        },
        {
          title: "3. مشاركة المعلومات",
          content: "قد نشارك معلوماتك الشخصية مع مزودي خدمات من جهات خارجية لأداء وظائف نيابة عنا، مثل معالجة الدفع وتحليل البيانات وتسليم البريد الإلكتروني وخدمات الاستضافة وخدمة العملاء. قد نشارك أيضًا المعلومات عندما نعتقد أنه من الضروري الامتثال للقانون أو حماية حقوقنا."
        },
        {
          title: "4. أمن البيانات",
          content: "نحن ننفذ تدابير تقنية وتنظيمية مناسبة لحماية أمن معلوماتك الشخصية. ومع ذلك، لا توجد طريقة للإرسال عبر الإنترنت أو التخزين الإلكتروني آمنة بنسبة 100٪، لذلك لا يمكننا ضمان الأمان المطلق."
        },
        {
          title: "5. خياراتك",
          content: "يمكنك الوصول إلى معلومات حسابك أو تحديثها أو حذفها في أي وقت عن طريق تسجيل الدخول إلى إعدادات حسابك. يمكنك أيضًا إلغاء الاشتراك في تلقي الاتصالات الترويجية منا باتباع تعليمات إلغاء الاشتراك المضمنة في هذه الاتصالات."
        },
        {
          title: "6. ملفات تعريف الارتباط",
          content: "نحن نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لجمع معلومات حول نشاطك ومتصفحك وجهازك. يمكنك إدارة تفضيلات ملفات تعريف الارتباط الخاصة بك من خلال إعدادات المتصفح، ولكن قد يؤثر ذلك على تجربتك مع خدماتنا."
        },
        {
          title: "7. خصوصية الأطفال",
          content: "خدمتنا غير موجهة للأطفال دون سن 18 عامًا، ونحن لا نجمع عن قصد معلومات شخصية من الأطفال دون سن 18 عامًا. إذا علمنا أننا قد جمعنا معلومات شخصية من طفل دون سن 18 عامًا، فسنقوم بحذف هذه المعلومات."
        },
        {
          title: "8. التغييرات على هذه السياسة",
          content: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية أخرى. سنخطرك بأي تغييرات جوهرية عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة."
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
              {policyContent[language].title}
            </h1>
            <p className="text-muted-foreground mb-8">
              {policyContent[language].lastUpdated}
            </p>
            
            <div className="space-y-6">
              {policyContent[language].sections.map((section, index) => (
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

export default PrivacyPolicy;
