import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Timer, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  BadgePercent,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useLanguage } from './Header';

interface Product {
  id: number;
  image: string;
  title: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  originalPrice: number;
  groupPrices: {
    minCount: number;
    price: number;
  }[];
  timeLeft: {
    en: string;
    ar: string;
  };
  joinedCount: number;
  totalCount: number;
  progress: number;
  tag?: {
    en: string;
    ar: string;
    color: string;
  };
}

const BilingualProductListing: React.FC = () => {
  const { language } = useLanguage();

  const productData: Product[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
      title: {
        en: "iPhone 16 Pro Max 256GB",
        ar: "آيفون 16 برو ماكس 256 جيجابايت"
      },
      category: {
        en: "Mobile",
        ar: "جوال"
      },
      description: {
        en: "Experience the latest innovation with revolutionary camera and A18 Pro chip",
        ar: "استمتع بأحدث الابتكارات مع كاميرا ثورية وشريحة A18 برو"
      },
      originalPrice: 4999,
      groupPrices: [
        { minCount: 2, price: 4799 },
        { minCount: 3, price: 4599 },
        { minCount: 5, price: 4199 }
      ],
      timeLeft: {
        en: "1 day left",
        ar: "باقي يوم واحد"
      },
      joinedCount: 3,
      totalCount: 5,
      progress: 60,
      tag: {
        en: "HOT SALE",
        ar: "صفقة ساخنة",
        color: "destructive"
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1577975882846-431adc8c2009?auto=format&fit=crop&w=1600&q=80",
      title: {
        en: "Samsung 75\" 4K QLED TV",
        ar: "تلفاز سامسونج 75 بوصة QLED 4K"
      },
      category: {
        en: "TV",
        ar: "تلفاز"
      },
      description: {
        en: "Immersive viewing experience with Quantum Processor and Object Tracking Sound",
        ar: "تجربة مشاهدة غامرة مع معالج كوانتم وتتبع الصوت للأجسام"
      },
      originalPrice: 7999,
      groupPrices: [
        { minCount: 2, price: 7599 },
        { minCount: 4, price: 7199 },
        { minCount: 6, price: 6799 }
      ],
      timeLeft: {
        en: "2 days left",
        ar: "باقي يومان"
      },
      joinedCount: 4,
      totalCount: 6,
      progress: 67
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80",
      title: {
        en: "MacBook Pro 16\" M3 Max",
        ar: "ماك بوك برو 16 بوصة M3 ماكس"
      },
      category: {
        en: "Laptop",
        ar: "لابتوب"
      },
      description: {
        en: "Revolutionary performance with M3 Max chip and stunning Liquid Retina XDR display",
        ar: "أداء ثوري مع شريحة M3 ماكس وشاشة ليكويد ريتينا XDR المذهلة"
      },
      originalPrice: 11999,
      groupPrices: [
        { minCount: 3, price: 11399 },
        { minCount: 5, price: 10799 },
        { minCount: 7, price: 10299 }
      ],
      timeLeft: {
        en: "12 hours left",
        ar: "باقي 12 ساعة"
      },
      joinedCount: 7,
      totalCount: 10,
      progress: 70,
      tag: {
        en: "TRENDING",
        ar: "رائج",
        color: "default"
      }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?auto=format&fit=crop&w=1600&q=80",
      title: {
        en: "LG 65\" OLED TV",
        ar: "تلفاز إل جي 65 بوصة OLED"
      },
      category: {
        en: "TV",
        ar: "تلفاز"
      },
      description: {
        en: "Perfect blacks and infinite contrast with self-lit pixels technology",
        ar: "أسود مثالي وتباين لا نهائي مع تقنية البكسلات ذاتية الإضاءة"
      },
      originalPrice: 6999,
      groupPrices: [
        { minCount: 2, price: 6599 },
        { minCount: 3, price: 6299 },
        { minCount: 5, price: 5899 }
      ],
      timeLeft: {
        en: "3 days left",
        ar: "باقي 3 أيام"
      },
      joinedCount: 2,
      totalCount: 5,
      progress: 40,
      tag: {
        en: "NEW ARRIVAL",
        ar: "وصل حديثاً",
        color: "secondary"
      }
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'en' ? 'Dynamic Group Deals' : 'عروض المجموعات الديناميكية'}
          </h2>
          <p className="text-muted-foreground max-w-[800px]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'en' 
              ? 'Watch prices drop as more people join. The bigger the group, the bigger the savings!'
              : 'شاهد انخفاض الأسعار مع انضمام المزيد من الأشخاص. كلما كبرت المجموعة، زادت التوفير!'}
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {productData.map((product) => {
              const formattedTitle = {
                en: `${product.category.en} Jam3a: ${product.title.en}`,
                ar: `جمعة ${product.category.ar}: ${product.title.ar}`
              };
              
              return (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border border-gray-200 h-full transition-all duration-300 hover:shadow-lg">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title[language]}
                        className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <Badge 
                          variant="default" 
                          className="bg-black/70 backdrop-blur-sm px-2 py-1 text-xs"
                        >
                          {Math.round((product.originalPrice - product.groupPrices[product.groupPrices.length - 1].price) / product.originalPrice * 100)}% {language === 'en' ? 'OFF' : 'خ��م'}
                        </Badge>
                        
                        {product.tag && (
                          <Badge 
                            variant={product.tag.color as any} 
                            className="px-2 py-1 text-xs animate-pulse"
                          >
                            {product.tag[language]}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-3">
                        <div className="mb-1">
                          <span className="text-xs text-muted-foreground">
                            {product.category[language]} {language === 'en' ? 'Jam3a' : 'جمعة'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg line-clamp-1">{formattedTitle[language]}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description[language]}</p>
                        
                        <div className="mt-2 flex items-end gap-2">
                          <span className="text-xl font-bold text-jam3a-purple">
                            {product.groupPrices[product.groupPrices.length - 1].price} {language === 'en' ? 'SAR' : 'ريال'}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice} {language === 'en' ? 'SAR' : 'ريال'}
                          </span>
                        </div>

                        <div className="mt-3 space-y-3 bg-gray-50 p-3 rounded-lg border">
                          <h4 className="text-sm font-medium flex items-center">
                            <BadgePercent className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Group Pricing' : 'أسعار المجموعة'}
                          </h4>
                          <div className="space-y-1 text-sm">
                            {product.groupPrices.map((pricing, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>{pricing.minCount}+ {language === 'en' ? 'people' : 'أشخاص'}</span>
                                <span className="font-medium">{pricing.price} {language === 'en' ? 'SAR' : 'ريال'}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users className="h-3.5 w-3.5" />
                              <span>
                                {product.joinedCount} / {product.totalCount} {language === 'en' ? 'joined' : 'انضموا'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Timer className="h-3.5 w-3.5" />
                              <span>{product.timeLeft[language]}</span>
                            </div>
                          </div>
                          <Progress value={product.progress} className="h-1.5 bg-gray-100" />
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      <div className="w-full space-y-2">
                        <Button className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple">
                          <Link to={`/join-jam3a?product=${encodeURIComponent(product.title[language])}&price=${product.groupPrices[product.groupPrices.length - 1].price} SAR&discount=${Math.round((product.originalPrice - product.groupPrices[product.groupPrices.length - 1].price) / product.originalPrice * 100)}%&category=${encodeURIComponent(product.category[language])}`}>
                            {language === 'en' ? 'Join Jam3a' : 'انضم للجمعة'}
                          </Link>
                        </Button>
                        <div className="flex justify-center items-center gap-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {language === 'en' ? 'Limited Time' : 'وقت محدود'}
                          </span>
                          <span className="flex items-center">
                            <Shield className="h-3 w-3 mr-1" /> {language === 'en' ? 'Money-back Guarantee' : 'ضمان استعادة الأموال'}
                          </span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-2">
            <CarouselPrevious className="relative static -translate-y-0 left-0" />
            <CarouselNext className="relative static -translate-y-0 right-0" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            <Link to="/shop" className="flex items-center gap-2">
              {language === 'en' ? (
                <>View All Deals <ChevronRight className="h-4 w-4" /></>
              ) : (
                <>عرض جميع الصفقات <ChevronLeft className="h-4 w-4" /></>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BilingualProductListing;
