import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const MyJam3as = () => {
  const { language } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'en' ? 'My Jam3as' : 'جمعاتي'}
        </h1>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="active">
              {language === 'en' ? 'Active' : 'نشطة'}
            </TabsTrigger>
            <TabsTrigger value="completed">
              {language === 'en' ? 'Completed' : 'مكتملة'}
            </TabsTrigger>
            <TabsTrigger value="expired">
              {language === 'en' ? 'Expired' : 'منتهية'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'You don\'t have any active Jam3as yet.' 
                  : 'ليس لديك أي جمعات نشطة حتى الآن.'}
              </p>
              <p className="mt-2">
                {language === 'en'
                  ? 'Start or join a Jam3a to see it here.'
                  : 'ابدأ أو انضم إلى جمعة لتراها هنا.'}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'You don\'t have any completed Jam3as yet.'
                  : 'ليس لديك أي جمعات مكتملة حتى الآن.'}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="expired" className="space-y-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'You don\'t have any expired Jam3as.'
                  : 'ليس لديك أي جمعات منتهية.'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MyJam3as;
