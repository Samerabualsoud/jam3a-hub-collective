import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: March 10, 2024",
      introduction: "Your privacy is important to us. This Privacy Policy explains how Jam3a collects, uses, and protects your information when you use our platform.",
      informationCollection: "Information We Collect",
      personalData: "Personal Data: We collect your name, email address, contact information, and payment details when you register and use our services.",
      usageData: "Usage Data: We collect information about your activity on our platform, including the deals you browse, groups you join, and transactions you make.",
      deviceData: "Device Data: We collect information about the devices you use to access our platform, including device type, operating system, and unique identifiers.",
      howWeUseInformation: "How We Use Your Information",
      serviceDelivery: "To provide and maintain our services, process transactions, and manage your account.",
      communication: "To communicate with you about updates, offers, and support inquiries.",
      improvement: "To improve our platform, personalize your experience, and develop new features.",
      dataSharing: "Data Sharing",
      thirdParties: "We share your information with trusted third parties who assist us in providing our services, such as payment processors, delivery partners, and marketing agencies.",
      legalCompliance: "We may disclose your information to comply with legal obligations, enforce our policies, or protect our rights and the rights of others.",
      dataSecurity: "Data Security",
      securityMeasures: "We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or alteration.",
      dataRetention: "We retain your information for as long as necessary to provide our services and comply with legal obligations.",
      yourRights: "Your Rights",
      access: "You have the right to access, update, or delete your personal information.",
      optOut: "You can opt out of receiving marketing communications from us at any time.",
      contactUs: "Contact Us",
      questions: "If you have any questions about this Privacy Policy, please contact us at:",
      email: "privacy@jam3a.com",
      changesToPolicy: "Changes to This Policy",
      updateNotice: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our platform.",
    },
    ar: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: 10 مارس 2024",
      introduction: "خصوصيتك مهمة بالنسبة لنا. توضح سياسة الخصوصية هذه كيف تقوم جمعة بجمع واستخدام وحماية معلوماتك عند استخدام منصتنا.",
      informationCollection: "المعلومات التي نجمعها",
      personalData: "البيانات الشخصية: نقوم بجمع اسمك وعنوان بريدك الإلكتروني ومعلومات الاتصال وتفاصيل الدفع عند التسجيل واستخدام خدماتنا.",
      usageData: "بيانات الاستخدام: نقوم بجمع معلومات حول نشاطك على منصتنا، بما في ذلك الصفقات التي تتصفحها والمجموعات التي تنضم إليها والمعاملات التي تجريها.",
      deviceData: "بيانات الجهاز: نقوم بجمع معلومات حول الأجهزة التي تستخدمها للوصول إلى منصتنا، بما في ذلك نوع الجهاز ونظام التشغيل والمعرفات الفريدة.",
      howWeUseInformation: "كيف نستخدم معلوماتك",
      serviceDelivery: "لتوفير خدماتنا وصيانتها ومعالجة المعاملات وإدارة حسابك.",
      communication: "للتواصل معك بشأن التحديثات والعروض واستفسارات الدعم.",
      improvement: "لتحسين منصتنا وتخصيص تجربتك وتطوير ميزات جديدة.",
      dataSharing: "مشاركة البيانات",
      thirdParties: "نحن نشارك معلوماتك مع أطراف ثالثة موثوقة تساعدنا في تقديم خدماتنا، مثل معالجات الدفع وشركاء التوصيل ووكالات التسويق.",
      legalCompliance: "يجوز لنا الكشف عن معلوماتك للامتثال للالتزامات القانونية أو لفرض سياساتنا أو لحماية حقوقنا وحقوق الآخرين.",
      dataSecurity: "أمن البيانات",
      securityMeasures: "نقوم بتنفيذ تدابير أمنية قياسية في الصناعة لحماية معلوماتك من الوصول غير المصرح به أو الكشف عنها أو تغييرها.",
      dataRetention: "نحتفظ بمعلوماتك طالما كان ذلك ضروريًا لتقديم خدماتنا والامتثال للالتزامات القانونية.",
      yourRights: "حقوقك",
      access: "لديك الحق في الوصول إلى معلوماتك الشخصية أو تحديثها أو حذفها.",
      optOut: "يمكنك إلغاء الاشتراك في تلقي رسائل تسويقية منا في أي وقت.",
      contactUs: "اتصل بنا",
      questions: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، فيرجى الاتصال بنا على:",
      email: "privacy@jam3a.com",
      changesToPolicy: "التغييرات في هذه السياسة",
      updateNotice: "يجوز لنا تحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات عن طريق نشر السياسة الجديدة على منصتنا.",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Card className="max-w-3xl mx-auto">
          <Card className="p-6">
            <h1 className="text-3xl font-bold mb-4">{content[language].title}</h1>
            <p className="text-sm text-gray-500 mb-6">{content[language].lastUpdated}</p>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{content[language].introduction}</h2>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">{content[language].informationCollection}</h2>
              <Separator className="mb-4" />
              <p className="mb-2 font-medium">{content[language].personalData}</p>
              <p className="mb-2 font-medium">{content[language].usageData}</p>
              <p className="mb-2 font-medium">{content[language].deviceData}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">{content[language].howWeUseInformation}</h2>
              <Separator className="mb-4" />
              <p className="mb-2 font-medium">{content[language].serviceDelivery}</p>
              <p className="mb-2 font-medium">{content[language].communication}</p>
              <p className="mb-2 font-medium">{content[language].improvement}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">{content[language].dataSharing}</h2>
              <Separator className="mb-4" />
              <p className="mb-2 font-medium">{content[language].thirdParties}</p>
              <p className="mb-2 font-medium">{content[language].legalCompliance}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">{content[language].dataSecurity}</h2>
              <Separator className="mb-4" />
              <p className="mb-2 font-medium">{content[language].securityMeasures}</p>
              <p className="mb-2 font-medium">{content[language].dataRetention}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">{content[language].yourRights}</h2>
              <Separator className="mb-4" />
              <p className="mb-2 font-medium">{content[language].access}</p>
              <p className="mb-2 font-medium">{content[language].optOut}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">{content[language].contactUs}</h2>
              <Separator className="mb-4" />
              <p className="mb-2">{content[language].questions} <a href={`mailto:${content[language].email}`} className="text-blue-500">{content[language].email}</a></p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{content[language].changesToPolicy}</h2>
              <Separator className="mb-4" />
              <p>{content[language].updateNotice}</p>
            </section>
          </Card>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
