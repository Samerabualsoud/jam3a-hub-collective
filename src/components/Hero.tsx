
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/Header';

const Hero = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      badge: "Saudi Arabia's first group-buying platform",
      title: "Buy Together, Save Together",
      description: "Join forces with friends and family to unlock exclusive discounts on premium tech products and more.",
      shopDeals: "Shop Deals",
      startJam3a: "Start Your Own Jam3a",
      benefits: [
        "Save up to 30% on the latest tech gadgets",
        "100% money-back guarantee if the group doesn't form",
        "Trusted by 10,000+ shoppers across Saudi Arabia",
      ],
      groupPrice: "Group price",
      timeLeft: "Time left",
      joined: "of 5 joined",
      complete: "80% complete",
      joinThis: "Join This Jam3a"
    },
    ar: {
      badge: "أول منصة للشراء الجماعي في المملكة العربية السعودية",
      title: "اشتروا معًا، وفروا معًا",
      description: "انضم مع الأصدقاء والعائلة للحصول على خصومات حصرية على منتجات التكنولوجيا المتميزة والمزيد.",
      shopDeals: "تسوق العروض",
      startJam3a: "ابدأ جمعتك الخاصة",
      benefits: [
        "وفر حتى 30% على أحدث الأجهزة التقنية",
        "ضمان استرداد الأموال 100% إذا لم تتشكل المجموعة",
        "موثوق به من قبل أكثر من 10,000 متسوق في جميع أنحاء المملكة",
      ],
      groupPrice: "سعر المجموعة",
      timeLeft: "الوقت المتبقي",
      joined: "من 5 انضموا",
      complete: "اكتمل 80%",
      joinThis: "انضم إلى هذه الجمعة"
    }
  };

  // Define sample product details for the hero section
  const productDetails = {
    product: "iPhone 16 Pro",
    price: "3499",
    discount: "15%"
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-royal-blue-50 pt-6 pb-10 md:pt-8 md:pb-16">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI5MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDEwODBWOTAwSDB6Ii8+PHBhdGggZD0iTTAgMGwxMDgwIDkwMEgweiIgZmlsbD0idXJsKCNhKSIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIxMDAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjAlIj48c3RvcCBzdG9wLWNvbG9yPSIjMEVBNUU5IiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzM4QkRGOCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+')]" style={{ opacity: '0.05' }}></div>
      <div className="container relative z-10 mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-center space-y-3">
            <div className="inline-flex items-center rounded-full border border-royal-blue/30 bg-royal-blue/10 px-4 py-1 text-sm font-medium text-royal-blue animate-fade-in">
              <TrendingUp className="mr-2 h-4 w-4" />
              {content[language].badge}
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-slide-in">
              {language === 'en' ? (
                <>
                  Buy Together,<br />
                  <span className="text-royal-blue">Save Together</span>
                </>
              ) : (
                <>
                  اشتروا معًا،<br />
                  <span className="text-royal-blue">وفروا معًا</span>
                </>
              )}
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              {content[language].description}
            </p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-royal-blue hover:bg-royal-blue-dark text-white">
                <Link to="/shop" className="flex items-center gap-2">
                  {content[language].shopDeals}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue/10">
                <Link to="/start-jam3a">{content[language].startJam3a}</Link>
              </Button>
            </div>
            <div className="mt-4 flex flex-col space-y-2 text-sm text-muted-foreground">
              {content[language].benefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-royal-blue" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative animate-float">
              <div className="absolute -left-4 -top-4 h-64 w-64 rounded-full bg-royal-blue/20 blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 h-64 w-64 rounded-full bg-royal-blue-accent/20 blur-3xl"></div>
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl hover-scale">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-blue">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold">iPhone 16 Pro Jam3a</span>
                    </div>
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 animate-pulse-soft">
                      Active
                    </div>
                  </div>
                  <div className="mt-3 relative overflow-hidden rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80"
                      alt="iPhone 16 Pro"
                      className="h-56 w-full rounded-lg object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-royal-blue text-white text-xs font-bold px-2 py-1 rounded-full">
                      -15%
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">{content[language].groupPrice}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">3,499 SAR</span>
                          <span className="text-sm text-muted-foreground line-through">3,999 SAR</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{content[language].timeLeft}</p>
                        <p className="font-medium text-royal-blue">23:45:12</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>4 {content[language].joined}</span>
                      <span className="text-royal-blue">{content[language].complete}</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-royal-blue animate-pulse-soft" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button className="w-full bg-royal-blue hover:bg-royal-blue-dark text-white transition-all duration-300 hover:shadow-jam3a">
                      <Link to={`/join-jam3a?product=${productDetails.product}&price=${productDetails.price} SAR&discount=${productDetails.discount}`}>
                        {content[language].joinThis}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
