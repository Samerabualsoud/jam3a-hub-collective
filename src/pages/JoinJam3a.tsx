import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const JoinJam3a = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setProduct(params.get('product') || '');
    setPrice(params.get('price') || '');
    setDiscount(params.get('discount') || '');
    setCategory(params.get('category') || '');
  }, [location.search]);

  const content = {
    en: {
      title: "Join an Existing Jam3a",
      subtitle: "Complete the group and unlock exclusive savings!",
      productDetails: "Product Details",
      groupDetails: "Group Details",
      confirmation: "Confirmation",
      productName: "Product Name",
      price: "Price",
      discount: "Discount",
      category: "Category",
      groupProgress: "Group Progress",
      participants: "Participants",
      timeLeft: "Time Left",
      joinNow: "Join Now",
      shareWithFriends: "Share with Friends",
      congratulations: "Congratulations!",
      youJoined: "You've successfully joined the Jam3a!",
      viewMyJam3as: "View My Jam3as",
      orStartOne: "or start your own!",
      steps: [
        "Review Details",
        "Confirm Participation",
        "Share & Invite"
      ]
    },
    ar: {
      title: "انضم إلى جمعة حالية",
      subtitle: "أكمل المجموعة وافتح مدخرات حصرية!",
      productDetails: "تفاصيل المنتج",
      groupDetails: "تفاصيل المجموعة",
      confirmation: "التأكيد",
      productName: "اسم المنتج",
      price: "السعر",
      discount: "الخصم",
      category: "الفئة",
      groupProgress: "تقدم المجموعة",
      participants: "المشاركون",
      timeLeft: "الوقت المتبقي",
      joinNow: "انضم الآن",
      shareWithFriends: "شارك مع الأصدقاء",
      congratulations: "تهانينا!",
      youJoined: "لقد انضممت بنجاح إلى الجمعة!",
      viewMyJam3as: "عرض جمعيتي",
      orStartOne: "أو ابدأ واحدة خاصة بك!",
      steps: [
        "مراجعة التفاصيل",
        "تأكيد المشاركة",
        "شارك وادعُ"
      ]
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold text-center mb-4">
          {content[language].title}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          {content[language].subtitle}
        </p>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="justify-center">
            <TabsTrigger value="details">{content[language].steps[0]}</TabsTrigger>
            <TabsTrigger value="confirm">{content[language].steps[1]}</TabsTrigger>
            <TabsTrigger value="share">{content[language].steps[2]}</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardContent className="space-y-2">
                <h2 className="text-xl font-semibold">{content[language].productDetails}</h2>
                <Separator />
                <p><strong>{content[language].productName}:</strong> {product}</p>
                <p><strong>{content[language].price}:</strong> {price}</p>
                <p><strong>{content[language].discount}:</strong> {discount}</p>
                <p><strong>{content[language].category}:</strong> {category}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <p><strong>{content[language].groupProgress}:</strong> 3/5</p>
                <p><strong>{content[language].timeLeft}:</strong> 24 hours</p>
              </CardFooter>
            </Card>
            <Button>{content[language].joinNow}</Button>
          </TabsContent>
          <TabsContent value="confirm">
            <Card>
              <CardContent>
                <p>{content[language].confirmation} Content</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="share">
            <Card>
              <CardContent>
                <p>{content[language].shareWithFriends} Content</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default JoinJam3a;
