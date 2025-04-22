
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Timer, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSupabaseApi } from '@/lib/supabase/api';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

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

  // Create formatted title for Mobile Jam3a
  const formattedTitle = {
    en: `Mobile Jam3a: ${title.en}`,
    ar: `جمعة الجوالات: ${title.ar}`
  };

  return (
    <div className="group overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md flex flex-col h-full">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title[language]}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.log("Image failed to load:", (e.target as HTMLImageElement).src);
            (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
          }}
        />
        <div className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {Math.round((originalPrice - discountedPrice) / originalPrice * 100)}% {language === 'en' ? 'OFF' : 'خصم'}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">
            {category[language]} {language === 'en' ? 'Jam3a' : 'جمعة'}
          </span>
        </div>
        <h3 className="line-clamp-1 text-lg font-medium">{formattedTitle[language]}</h3>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-2xl font-bold text-royal-blue">{discountedPrice} {language === 'en' ? 'SAR' : 'ريال'}</span>
          <span className="text-sm text-muted-foreground line-through">{originalPrice} {language === 'en' ? 'SAR' : 'ريال'}</span>
        </div>
        <div className="mt-4 space-y-2 flex-1 flex flex-col justify-end">
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
              className="h-full rounded-full bg-royal-blue transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <Button 
            variant="green" 
            size="wide"
            className="font-medium group"
            asChild
          >
            <Link to={`/join-jam3a?product=${encodeURIComponent(title[language])}&price=${discountedPrice} SAR&discount=${Math.round((originalPrice - discountedPrice) / originalPrice * 100)}%&category=${encodeURIComponent(category[language])}`}>
              <span className="flex items-center justify-center w-full">
                {language === 'en' ? 'Join Jam3a' : 'انضم للجمعة'}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedDeals = () => {
  const { language } = useLanguage();
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useSupabaseApi();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('Fetching deals and products for FeaturedDeals component');
        const [dealsData, productsData] = await Promise.all([
          api.getDeals(),
          api.getProducts()
        ]);
        
        console.log(`Fetched ${dealsData.length} deals and ${productsData.length} products`);
        setDeals(dealsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching deals:", error);
        setError(error.message || "Failed to fetch deals");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const featuredProducts = deals
    .filter(deal => deal.active)
    .slice(0, 4)
    .map(deal => {
      const product = products.find(p => p.id === deal.productId) || {};
      const discountedPrice = Math.round(product.price * (1 - deal.discount / 100));
      
      const totalCount = Math.floor(Math.random() * 5) + 5; // Random between 5-10
      const joinedCount = Math.floor(Math.random() * (totalCount - 2)) + 2; // At least 2 joined
      const progress = (joinedCount / totalCount) * 100;
      
      const endDate = new Date(deal.endDate);
      const timeLeftEn = formatDistanceToNow(endDate, { addSuffix: true });
      const timeLeftAr = formatDistanceToNow(endDate, { locale: ar, addSuffix: true });
      
      return {
        id: deal.id,
        image: product.imageUrl || "https://placehold.co/600x400?text=No+Image",
        title: {
          en: product.name || "Unknown Product",
          ar: product.name || "منتج غير معروف"
        },
        category: {
          en: product.category || "Other",
          ar: product.category || "آخر"
        },
        originalPrice: product.price || 0,
        discountedPrice: discountedPrice || 0,
        timeLeft: {
          en: timeLeftEn,
          ar: timeLeftAr
        },
        joinedCount,
        totalCount,
        progress
      };
    });

  if (loading) {
    return (
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center">
            <p className="text-muted-foreground">{language === 'en' ? 'Loading deals...' : 'جاري تحميل العروض...'}</p>
          </div>
        </div>
      </section>
    );
  }

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
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'No active deals found. Check back later or create your own Jam3a!' 
                  : 'لا توجد صفقات نشطة. تحقق لاحقًا أو أنشئ جمعتك الخاصة!'}
              </p>
              <Button variant="default" className="mt-4" asChild>
                <Link to="/start-jam3a">
                  {language === 'en' ? 'Start Your Own Jam3a' : 'ابدأ جمعتك الخاصة'}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
