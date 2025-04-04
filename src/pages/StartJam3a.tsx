import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/Header';
import { CheckCircle2, ShoppingBag, Users, Zap } from 'lucide-react';

const StartJam3a = () => {
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16 px-4">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? 'Start Your Own Jam3a' : 'ابدأ جمعتك الخاصة'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Create a group, invite friends, and save big on premium products together' 
                : 'أنشئ مجموعة، وادعُ الأصدقاء، ووفر الكثير على المنتجات المميزة معًا'}
            </p>
          </div>
        </section>

        {/* Product Selection Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'en' ? 'Select a Product to Start Your Jam3a' : 'اختر منتجًا لبدء جمعتك'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Product Card 1 */}
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src="https://placehold.co/600x400/e9d5ff/6b21a8?text=iPhone+16+Pro+Max" 
                    alt="iPhone 16 Pro Max" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-sm font-bold px-2 py-1 rounded">
                    16% OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">iPhone 16 Pro Max 256GB</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-xl font-bold text-purple-600">4199 SAR</span>
                      <span className="text-sm text-gray-500 line-through ml-2">4999 SAR</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Min 5 people' : 'الحد الأدنى 5 أشخاص'}
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-800">
                    <Link to="/join-jam3a" className="text-white">
                      {language === 'en' ? 'Start Jam3a' : 'ابدأ جمعة'}
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Product Card 2 */}
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src="https://placehold.co/600x400/e9d5ff/6b21a8?text=Samsung+S25+Ultra" 
                    alt="Samsung Galaxy S25 Ultra" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-sm font-bold px-2 py-1 rounded">
                    15% OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Samsung Galaxy S25 Ultra</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-xl font-bold text-purple-600">3899 SAR</span>
                      <span className="text-sm text-gray-500 line-through ml-2">4599 SAR</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Min 6 people' : 'الحد الأدنى 6 أشخاص'}
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-800">
                    <Link to="/join-jam3a" className="text-white">
                      {language === 'en' ? 'Start Jam3a' : 'ابدأ جمعة'}
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Product Card 3 */}
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src="https://placehold.co/600x400/e9d5ff/6b21a8?text=Galaxy+Z+Fold+6" 
                    alt="Galaxy Z Fold 6" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-sm font-bold px-2 py-1 rounded">
                    17% OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Galaxy Z Fold 6</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-xl font-bold text-purple-600">5799 SAR</span>
                      <span className="text-sm text-gray-500 line-through ml-2">6999 SAR</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === 'en' ? 'Min 7 people' : 'الحد الأدنى 7 أشخاص'}
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-800">
                    <Link to="/join-jam3a" className="text-white">
                      {language === 'en' ? 'Start Jam3a' : 'ابدأ جمعة'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link to="/shop-all-deals">
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100">
                  {language === 'en' ? 'View All Products' : 'عرض جميع المنتجات'}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === 'en' ? 'How to Start a Jam3a' : 'كيفية بدء جمعة'}
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {language === 'en' ? 'Choose a Product' : 'اختر منتجًا'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Select from our curated collection of premium products.'
                    : 'اختر من مجموعتنا المنتقاة من المنتجات المميزة.'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {language === 'en' ? 'Set Group Size' : 'حدد حجم المجموعة'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Decide how many people you want in your group.'
                    : 'قرر عدد الأشخاص الذين تريدهم في مجموعتك.'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {language === 'en' ? 'Share Your Link' : 'شارك رابطك'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Invite friends and family via WhatsApp, social media, or email.'
                    : 'ادعُ الأصدقاء والعائلة عبر واتساب أو وسائل التواصل الاجتماعي أو البريد الإلكتروني.'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {language === 'en' ? 'Complete Purchase' : 'أكمل الشراء'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Once your group is full, everyone pays and receives their order.'
                    : 'بمجرد اكتمال مجموعتك، يدفع الجميع ويستلمون طلباتهم.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default StartJam3a;
