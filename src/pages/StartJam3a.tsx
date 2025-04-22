import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import Jam3aBenefits from './Jam3aBenefits';

const StartJam3aPage = () => {
  const [activeTab, setActiveTab] = React.useState("category");
  const { language } = useLanguage();
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-center mb-8">
            {language === 'en' ? 'Start Your Jam3a' : 'ابدأ جمعتك'}
          </h1>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full">
              <TabsTrigger value="category" className="w-1/3">
                {language === 'en' ? '1. Choose Category' : '1. اختر الفئة'}
              </TabsTrigger>
              <TabsTrigger value="product" className="w-1/3">
                {language === 'en' ? '2. Select Product' : '2. اختر المنتج'}
              </TabsTrigger>
              <TabsTrigger value="details" className="w-1/3">
                {language === 'en' ? '3. Add Details' : '3. أضف التفاصيل'}
              </TabsTrigger>
            </TabsList>
            <Separator className="my-4" />
            <TabsContent value="category">
              <Card>
                <CardContent>
                  {language === 'en' ? 'Category Content' : 'محتوى الفئة'}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="product">
              <Card>
                <CardContent>
                  {language === 'en' ? 'Product Content' : 'محتوى المنتج'}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card>
                <CardContent>
                  {language === 'en' ? 'Details Content' : 'محتوى التفاصيل'}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button variant="outline" disabled={activeTab === "category"}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Previous' : 'السابق'}
            </Button>
            <Button variant="green" disabled={activeTab === "details"}>
              {language === 'en' ? 'Next' : 'التالي'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartJam3aPage;
