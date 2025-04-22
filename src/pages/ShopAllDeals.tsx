
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Clock, Filter, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShopAllDeals = () => {
  const { language } = useLanguage();
  const isRtl = language === 'ar';
  const navigate = useNavigate();
  const { toast } = useToast();

  const content = {
    en: {
      title: "Shop All Deals",
      subtitle: "Browse active group-buying deals",
      description: "Join existing Jam3a deals and save big on premium products. Prices drop as more people join the group!",
      filters: {
        title: "Filters",
        category: "Category",
        categories: ["All", "Smartphones", "Laptops", "Audio", "Wearables", "Home Tech"],
        sort: "Sort By",
        sortOptions: ["Popularity", "Ending Soon", "Biggest Discount", "Newest"],
        priceRange: "Price Range",
        groupSize: "Group Size",
        timeLeft: "Time Left",
        timeOptions: ["Any Time", "Ending Today", "1-3 Days", "3+ Days"],
        apply: "Apply Filters",
        reset: "Reset"
      },
      deals: [
        {
          title: "iPhone 16 Pro Max 256GB",
          originalPrice: 4999,
          currentPrice: 4199,
          discount: "16%",
          joined: 4,
          total: 5,
          timeLeft: "23:45:12",
          category: "Smartphones",
          image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
          buttonText: "Join This Jam3a"
        },
        {
          title: "Samsung Galaxy S25 Ultra",
          originalPrice: 4599,
          currentPrice: 3899,
          discount: "15%",
          joined: 3,
          total: 6,
          timeLeft: "11:23:45",
          category: "Smartphones",
          image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80",
          buttonText: "Join This Jam3a"
        },
        {
          title: "Galaxy Z Fold 6",
          originalPrice: 6999,
          currentPrice: 5799,
          discount: "17%",
          joined: 7,
          total: 10,
          timeLeft: "12:00:00",
          category: "Smartphones",
          image: "https://images.unsplash.com/photo-1615380547903-c456276b7702?auto=format&fit=crop&w=1600&q=80",
          buttonText: "Join This Jam3a"
        },
        {
          title: "Galaxy Z Flip 6",
          originalPrice: 3999,
          currentPrice: 3299,
          discount: "18%",
          joined: 2,
          total: 5,
          timeLeft: "35:12:33",
          category: "Smartphones",
          image: "https://images.unsplash.com/photo-1598327105854-c8674faddf79?auto=format&fit=crop&w=1600&q=80",
          buttonText: "Join This Jam3a"
        },
        {
          title: "MacBook Pro 16\" M3 Pro",
          originalPrice: 9999,
          currentPrice: 8499,
          discount: "15%",
          joined: 3,
          total: 8,
          timeLeft: "47:23:11",
          category: "Laptops",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=1600&q=80",
          buttonText: "Join This Jam3a"
        },
        {
          title: "AirPods Pro 2",
          originalPrice: 999,
          currentPrice: 799,
          discount: "20%",
          joined: 6,
          total: 10,
          timeLeft: "8:45:22",
          category: "Audio",
          image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1600&q=80",
          buttonText: "Join This Jam3a"
        }
      ],
      tabs: {
        all: "All Deals",
        ending: "Ending Soon",
        popular: "Most Popular",
        new: "New Arrivals"
      },
      noDeals: "No deals found matching your filters. Try adjusting your criteria.",
      startJam3a: "Start Your Own Jam3a"
    },
    ar: {
      title: "تسوق جميع العروض",
      subtitle: "تصفح عروض الشراء الجماعي النشطة",
      description: "انضم إلى صفقات جمعة الحالية ووفر على المنتجات المميزة. تنخفض الأسعار كلما انضم المزيد من الأشخاص إلى المجموعة!",
      filters: {
        title: "التصفية",
        category: "الفئة",
        categories: ["الكل", "الهواتف الذكية", "أجهزة الكمبيوتر المحمولة", "الصوتيات", "الأجهزة القابلة للارتداء", "تقنيات المنزل"],
        sort: "ترتيب حسب",
        sortOptions: ["الشعبية", "ينتهي قريبًا", "أكبر خصم", "الأحدث"],
        priceRange: "نطاق السعر",
        groupSize: "حجم المجموعة",
        timeLeft: "الوقت المتبقي",
        timeOptions: ["أي وقت", "ينتهي اليوم", "1-3 أيام", "أكثر من 3 أيام"],
        apply: "تطبيق الفلاتر",
        reset: "إعادة ضبط"
      },
      deals: [
        {
          title: "آيفون 16 برو ماكس 256 جيجابايت",
          originalPrice: 4999,
          currentPrice: 4199,
          discount: "16%",
          joined: 4,
          total: 5,
          timeLeft: "23:45:12",
          category: "الهواتف الذكية",
          image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
          buttonText: "انضم إلى هذه الجمعة"
        },
        {
          title: "سامسونج جالاكسي S25 ألترا",
          originalPrice: 4599,
          currentPrice: 3899,
          discount: "15%",
          joined: 3,
          total: 6,
          timeLeft: "11:23:45",
          category: "الهواتف الذكية",
          image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80",
          buttonText: "انضم إلى هذه الجمعة"
        },
        {
          title: "جالاكسي Z فولد 6",
          originalPrice: 6999,
          currentPrice: 5799,
          discount: "17%",
          joined: 7,
          total: 10,
          timeLeft: "12:00:00",
          category: "الهواتف الذكية",
          image: "https://images.unsplash.com/photo-1615380547903-c456276b7702?auto=format&fit=crop&w=1600&q=80",
          buttonText: "انضم إلى هذه الجمعة"
        },
        {
          title: "جالاكسي Z فليب 6",
          originalPrice: 3999,
          currentPrice: 3299,
          discount: "18%",
          joined: 2,
          total: 5,
          timeLeft: "35:12:33",
          category: "الهواتف الذكية",
          image: "https://images.unsplash.com/photo-1598327105854-c8674faddf79?auto=format&fit=crop&w=1600&q=80",
          buttonText: "انضم إلى هذه الجمعة"
        },
        {
          title: "ماك بوك برو 16 بوصة M3 برو",
          originalPrice: 9999,
          currentPrice: 8499,
          discount: "15%",
          joined: 3,
          total: 8,
          timeLeft: "47:23:11",
          category: "أجهزة الكمبيوتر المحمولة",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=1600&q=80",
          buttonText: "انضم إلى هذه الجمعة"
        },
        {
          title: "إيربودز برو 2",
          originalPrice: 999,
          currentPrice: 799,
          discount: "20%",
          joined: 6,
          total: 10,
          timeLeft: "8:45:22",
          category: "الصوتيات",
          image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1600&q=80",
          buttonText: "انضم إلى هذه الجمعة"
        }
      ],
      tabs: {
        all: "جميع العروض",
        ending: "تنتهي قريبًا",
        popular: "الأكثر شعبية",
        new: "الوافدة الجديدة"
      },
      noDeals: "لم يتم العثور على صفقات تطابق عوامل التصفية الخاصة بك. حاول تعديل معاييرك.",
      startJam3a: "ابدأ جمعتك الخاصة"
    }
  };

  const currentContent = content[language];

  const handleJoinJam3a = (deal) => {
    navigate(`/join-jam3a?product=${encodeURIComponent(deal.title)}&price=${deal.currentPrice}`);
    toast({
      title: language === 'en' ? "Joining Jam3a" : "الانضمام إلى الجمعة",
      description: language === 'en' 
        ? `You're joining the Jam3a for ${deal.title}` 
        : `أنت تنضم إلى الجمعة لـ ${deal.title}`
    });
  };

  const renderProductCard = (deal, index) => (
    <Card key={index} className="overflow-hidden border border-gray-200 shadow-md flex flex-col">
      <div className="relative">
        <img 
          src={deal.image} 
          alt={deal.title} 
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-royal-blue text-white font-bold">{deal.discount} OFF</Badge>
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2">{deal.title}</h3>
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <span className="font-bold text-lg">{deal.currentPrice} SAR</span>
            <span className="text-muted-foreground line-through text-sm ml-2">{deal.originalPrice} SAR</span>
          </div>
        </div>
        
        <div className="space-y-3 mt-auto">
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{deal.joined} of {deal.total} joined</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{deal.timeLeft}</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-royal-blue h-2.5 rounded-full" 
              style={{ width: `${(deal.joined / deal.total) * 100}%` }}
            ></div>
          </div>
          
          <Button 
            variant="green" 
            size="wide"
            className="font-medium text-white mt-4"
            onClick={() => handleJoinJam3a(deal)}
          >
            {deal.buttonText || (language === 'en' ? 'Join This Jam3a' : 'انضم إلى هذه الجمعة')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`flex min-h-screen flex-col ${isRtl ? 'rtl' : 'ltr'}`}>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-royal-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">{currentContent.title}</h1>
              <p className="text-xl text-muted-foreground">{currentContent.subtitle}</p>
              <p className="mt-4 max-w-2xl mx-auto">{currentContent.description}</p>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{currentContent.filters.title}</h3>
                      <Filter className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-1 block">{currentContent.filters.category}</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder={currentContent.filters.categories[0]} />
                          </SelectTrigger>
                          <SelectContent>
                            {currentContent.filters.categories.map((category, index) => (
                              <SelectItem key={index} value={category.toLowerCase().replace(/\s+/g, '-')}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">{currentContent.filters.sort}</label>
                        <Select defaultValue="popularity">
                          <SelectTrigger>
                            <SelectValue placeholder={currentContent.filters.sortOptions[0]} />
                          </SelectTrigger>
                          <SelectContent>
                            {currentContent.filters.sortOptions.map((option, index) => (
                              <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">{currentContent.filters.priceRange}</label>
                        <div className="pt-2 pb-6">
                          <Slider defaultValue={[0, 10000]} min={0} max={10000} step={100} />
                          <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>0 SAR</span>
                            <span>10,000 SAR</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">{currentContent.filters.groupSize}</label>
                        <div className="pt-2 pb-6">
                          <Slider defaultValue={[0, 10]} min={0} max={10} step={1} />
                          <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>0</span>
                            <span>10+</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">{currentContent.filters.timeLeft}</label>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder={currentContent.filters.timeOptions[0]} />
                          </SelectTrigger>
                          <SelectContent>
                            {currentContent.filters.timeOptions.map((option, index) => (
                              <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="pt-2 space-y-2">
                        <Button className="w-full">{currentContent.filters.apply}</Button>
                        <Button variant="outline" className="w-full">{currentContent.filters.reset}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <Tabs defaultValue="all" className="mb-8">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">{currentContent.tabs.all}</TabsTrigger>
                    <TabsTrigger value="ending">{currentContent.tabs.ending}</TabsTrigger>
                    <TabsTrigger value="popular">{currentContent.tabs.popular}</TabsTrigger>
                    <TabsTrigger value="new">{currentContent.tabs.new}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentContent.deals.map((deal, index) => renderProductCard(deal, index))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ending" className="mt-6">
                    {currentContent.deals.filter((deal, index) => index % 3 === 0).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentContent.deals
                          .filter((deal, index) => index % 3 === 0)
                          .map((deal, index) => renderProductCard(deal, index))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">{currentContent.noDeals}</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="popular" className="mt-6">
                    {currentContent.deals.filter((deal, index) => index % 2 === 0).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentContent.deals
                          .filter((deal, index) => index % 2 === 0)
                          .map((deal, index) => renderProductCard(deal, index))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">{currentContent.noDeals}</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="new" className="mt-6">
                    {currentContent.deals.filter((deal, index) => index >= 4).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentContent.deals
                          .filter((deal, index) => index >= 4)
                          .map((deal, index) => renderProductCard(deal, index))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">{currentContent.noDeals}</p>
                    )}
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-center mt-8">
                  <Button 
                    variant="green" 
                    className="text-white font-medium"
                  >
                    <Link to="/start-jam3a" className="text-white w-full inline-block px-6">
                      {currentContent.startJam3a}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopAllDeals;
