
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart2 } from 'lucide-react';

const SellerAnalytics = () => {
  const { language } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              {language === 'en' ? 'Seller Analytics' : 'تحليلات البائع'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{language === 'en' ? 'View your performance metrics here.' : 'اعرض مقاييس أدائك هنا.'}</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SellerAnalytics;
