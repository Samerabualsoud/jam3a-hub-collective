
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Timer, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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

export default ProductCard;
