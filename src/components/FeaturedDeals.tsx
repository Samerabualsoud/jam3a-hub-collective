
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSupabaseApi } from '@/lib/supabase/api';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import ProductCard from '@/components/deals/ProductCard';

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
          api.deals.getDeals(),
          api.products.getProducts()
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

  return null;
};

export default FeaturedDeals;
