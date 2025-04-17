
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Timer, Users } from 'lucide-react';
import { useLanguage } from './Header';

interface ProductCardProps {
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
  originalPrice: number;
  discountedPrice: number;
  timeLeft: {
    en: string;
    ar: string;
  };
  joinedCount: number;
  totalCount: number;
  progress: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  category,
  originalPrice,
  discountedPrice,
  timeLeft,
  joinedCount,
  totalCount,
  progress
}) => {
  const { language } = useLanguage();

  return (
    <div className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title[language]}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {Math.round((originalPrice - discountedPrice) / originalPrice * 100)}% {language === 'en' ? 'OFF' : 'خصم'}
        </div>
      </div>
      <div className="p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">
            {category[language]} {language === 'en' ? 'Jam3a' : 'جمعة'}
          </span>
        </div>
        <h3 className="line-clamp-1 text-lg font-medium">{title[language]}</h3>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-2xl font-bold text-jam3a-purple">{discountedPrice} {language === 'en' ? 'SAR' : 'ريال'}</span>
          <span className="text-sm text-muted-foreground line-through">{originalPrice} {language === 'en' ? 'SAR' : 'ريال'}</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {joinedCount} {language === 'en' ? 'of' : 'من'} {totalCount} {language === 'en' ? 'joined' : 'انضموا'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Timer className="h-4 w-4" />
              <span>{timeLeft[language]}</span>
            </div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-jam3a-purple transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <Button className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple">
            <Link to={`/join-jam3a?product=${encodeURIComponent(title.en)}&price=${discountedPrice} SAR&discount=${Math.round((originalPrice - discountedPrice) / originalPrice * 100)}%&category=${encodeURIComponent(category.en)}`}>
              {language === 'en' ? 'Join Jam3a' : 'انضم للجمعة'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedDeals = () => {
  const { language } = useLanguage();
  
  const featuredProducts = [
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
      originalPrice: 4999,
      discountedPrice: 4199,
      timeLeft: {
        en: "1 day left",
        ar: "باقي يوم واحد"
      },
      joinedCount: 3,
      totalCount: 5,
      progress: 60,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1600&q=80",
      title: {
        en: "Samsung Galaxy S25 Ultra",
        ar: "سامسونج جالاكسي S25 الترا"
      },
      category: {
        en: "Mobile",
        ar: "جوال"
      },
      originalPrice: 4599,
      discountedPrice: 3899,
      timeLeft: {
        en: "2 days left",
        ar: "باقي يومان"
      },
      joinedCount: 4,
      totalCount: 6,
      progress: 67,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1615380547903-c456276b7702?auto=format&fit=crop&w=1600&q=80",
      title: {
        en: "Galaxy Z Fold 6",
        ar: "جالاكسي زد فولد 6"
      },
      category: {
        en: "Mobile",
        ar: "جوال"
      },
      originalPrice: 6999,
      discountedPrice: 5799,
      timeLeft: {
        en: "12 hours left",
        ar: "باقي 12 ساعة"
      },
      joinedCount: 7,
      totalCount: 10,
      progress: 70,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1675264710674-942dd359ac0a?auto=format&fit=crop&w=1600&q=80",
      title: {
        en: "Galaxy Z Flip 6",
        ar: "جالاكسي زد فليب 6"
      },
      category: {
        en: "Mobile",
        ar: "جوال"
      },
      originalPrice: 3999,
      discountedPrice: 3299,
      timeLeft: {
        en: "3 days left",
        ar: "باقي 3 أيام"
      },
      joinedCount: 2,
      totalCount: 5,
      progress: 40,
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {language === 'en' ? 'Trending Jam3a Deals' : 'صفقات جمعة الرائجة'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {language === 'en'
                ? 'Join these active groups and save big on premium tech products'
                : 'انضم إلى هذه المجموعات النشطة ووفر كبير على منتجات التقنية الممتازة'}
            </p>
          </div>
          <Button variant="outline" className="shrink-0">
            <Link to="/shop">
              {language === 'en' ? 'View All Deals' : 'عرض جميع الصفقات'}
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
