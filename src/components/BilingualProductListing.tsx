import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Timer, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  BadgePercent,
  Clock,
  Shield,
  Star,
  TrendingUp,
  Tag
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
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

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
  rating?: number;
  features?: string[];
}

const BilingualProductListing: React.FC = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const productData: Product[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1609654984575-f64878202abf?auto=format&fit=crop&w=600&q=80",
      title: {
        en: "iPhone 16 Pro Max 256GB",
        ar: "آيفون 16 برو ماكس 256 جيجابايت"
      },
      category: {
        en: "Mobile",
        ar: "جوال"
      },
      description: {
        en: "Experience the latest innovation with revolutionary camera and A18 Pro chip.",
        ar: "استمتع بأحدث الابتكارات مع كاميرا ثورية وشريحة A18 برو."
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
      },
      rating: 4.9,
      features: ["A18 Pro Chip", "48MP Camera", "Dynamic Island", "Always-on Display"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?auto=format&fit=crop&w=600&q=80",
      title: {
        en: "Samsung 75\" 4K QLED TV",
        ar: "تلفاز سامسونج 75 بوصة QLED 4K"
      },
      category: {
        en: "TV",
        ar: "تلفاز"
      },
      description: {
        en: "Immersive viewing experience with Quantum Processor and Object Tracking Sound.",
        ar: "تجربة مشاهدة غامرة مع معالج كوانتم وتتبع الصوت للأجسام."
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
      progress: 67,
      rating: 4.7,
      features: ["4K QLED", "Quantum HDR", "Dolby Atmos", "SmartThings Compatible"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
      title: {
        en: "MacBook Pro 16\" M3 Max",
        ar: "ماك بوك برو 16 بوصة M3 ماكس"
      },
      category: {
        en: "Laptop",
        ar: "لابتوب"
      },
      description: {
        en: "Revolutionary performance with M3 Max chip and stunning Liquid Retina XDR display.",
        ar: "أداء ثوري مع شريحة M3 ماكس وشاشة ليكويد ريتينا XDR المذهلة."
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
      },
      rating: 4.8,
      features: ["M3 Max Chip", "16\" Liquid Retina XDR", "Up to 38-core GPU", "Up to 128GB RAM"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
      title: {
        en: "LG 65\" OLED TV",
        ar: "تلفاز إل جي 65 بوصة OLED"
      },
      category: {
        en: "TV",
        ar: "تلفاز"
      },
      description: {
        en: "Perfect blacks and infinite contrast with self-lit pixels technology.",
        ar: "أسود مثالي وتباين لا نهائي مع تقنية البكسلات ذاتية الإضاءة."
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
      },
      rating: 4.6,
      features: ["OLED Display", "α9 Gen5 AI Processor", "Dolby Vision IQ", "Filmmaker Mode"]
    }
  ];

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-gradient-to-br from-white to-royal-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4 text-center mb-12"
        >
          <Badge variant="outline" className="px-4 py-1.5 border-royal-blue text-royal-blue font-medium">
            {language === 'en' ? 'Smart Shopping' : 'تسوق ذكي'}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-royal-blue to-royal-blue-dark bg-clip-text text-transparent" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'en' ? 'Dynamic Group Deals' : 'عروض المجموعات الديناميكية'}
          </h2>
          <p className="text-muted-foreground max-w-[800px] text-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {language === 'en' 
              ? 'Watch prices drop as more people join. The bigger the group, the bigger the savings!'
              : 'شاهد انخفاض الأسعار مع انضمام المزيد من الأشخاص. كلما كبرت المجموعة، زادت التوفير!'}
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
          onSelect={(index) => setActiveIndex(index)}
        >
          <CarouselContent>
            {productData.map((product, index) => {
              const formattedTitle = {
                en: `${product.category.en} Jam3a: ${product.title.en}`,
                ar: `جمعة ${product.category.ar}: ${product.title.ar}`
              };
              
              return (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border border-royal-blue-50 h-full transition-all duration-300 shadow-jam3a hover:shadow-jam3a-lg bg-gradient-to-br from-white via-royal-blue-50/30 to-white group">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title[language]}
                          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                          <Badge 
                            variant="default" 
                            className="bg-black/70 backdrop-blur-sm px-3 py-1.5 font-medium"
                          >
                            {Math.round((product.originalPrice - product.groupPrices[product.groupPrices.length - 1].price) / product.originalPrice * 100)}% {language === 'en' ? 'OFF' : 'تخفيض'}
                          </Badge>
                          
                          {product.tag && (
                            <Badge 
                              variant={product.tag.color as any} 
                              className="px-3 py-1.5 font-medium animate-pulse"
                            >
                              {product.tag[language]}
                            </Badge>
                          )}
                        </div>
                        
                        {product.rating && (
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-5">
                        <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-3">
                          <div className="mb-1">
                            <span className="text-xs text-royal-blue font-semibold flex items-center gap-1">
                              <Tag className="h-3.5 w-3.5" />
                              {product.category[language]} {language === 'en' ? 'Jam3a' : 'جمعة'}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg line-clamp-1">{formattedTitle[language]}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description[language]}</p>
                          
                          <div className="mt-2 flex items-end gap-2">
                            <span className="text-2xl font-bold text-jam3a-purple">
                              {product.groupPrices[product.groupPrices.length - 1].price} {language === 'en' ? 'SAR' : 'ريال'}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice} {language === 'en' ? 'SAR' : 'ريال'}
                            </span>
                          </div>

                          <div className="mt-3 space-y-3 bg-gray-50/80 p-4 rounded-lg border border-royal-blue-50">
                            <h4 className="text-sm font-medium flex items-center text-royal-blue-dark">
                              <BadgePercent className="h-4 w-4 mr-1" />
                              {language === 'en' ? 'Group Pricing' : 'أسعار المجموعة'}
                            </h4>
                            <div className="space-y-1.5 text-sm">
                              {product.groupPrices.map((pricing, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                    {pricing.minCount}+ {language === 'en' ? 'people' : 'أشخاص'}
                                  </span>
                                  <span className="font-medium">{pricing.price} {language === 'en' ? 'SAR' : 'ريال'}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {product.features && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {product.features.slice(0, 3).map((feature, idx) => (
                                <span key={idx} className="inline-flex items-center text-xs bg-royal-blue-50 text-royal-blue-dark px-2 py-1 rounded-full">
                                  {feature}
                                </span>
                              ))}
                              {product.features.length > 3 && (
                                <span className="inline-flex items-center text-xs bg-royal-blue-50 text-royal-blue-dark px-2 py-1 rounded-full">
                                  +{product.features.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1 text-muted-foreground font-semibold">
                                <Users className="h-3.5 w-3.5" />
                                <span>
                                  {product.joinedCount} / {product.totalCount} {language === 'en' ? 'joined' : 'انضموا'}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground font-semibold">
                                <Timer className="h-3.5 w-3.5" />
                                <span>{product.timeLeft[language]}</span>
                              </div>
                            </div>
                            <Progress value={product.progress} className="h-1.5 bg-gray-100" />
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-5 pt-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        <div className="w-full space-y-2">
                          <Button 
                            className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple transition-all rounded-xl shadow-md group"
                          >
                            <Link 
                              to={`/join-jam3a?product=${encodeURIComponent(product.title[language])}&price=${product.groupPrices[product.groupPrices.length - 1].price} SAR&discount=${Math.round((product.originalPrice - product.groupPrices[product.groupPrices.length - 1].price) / product.originalPrice * 100)}%&category=${encodeURIComponent(product.category[language])}`}
                              className="flex items-center justify-center w-full"
                            >
                              {language === 'en' ? 'Join Jam3a' : 'انضم للجمعة'}
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="relative static -translate-y-0 left-0 h-11 w-11 border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transition-colors" />
            <div className="flex gap-2 items-center">
              {productData.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index ? "w-8 bg-royal-blue" : "w-2.5 bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <CarouselNext className="relative static -translate-y-0 right-0 h-11 w-11 border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transition-colors" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-10">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transition-colors group shadow-md hover:shadow-lg rounded-full px-8"
          >
            <Link to="/shop" className="flex items-center gap-2">
              {language === 'en' ? (
                <>View All Deals <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></>
              ) : (
                <>عرض جميع الصفقات <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" /></>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BilingualProductListing;
