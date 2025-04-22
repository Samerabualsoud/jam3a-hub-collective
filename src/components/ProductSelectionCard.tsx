
import React, { useMemo } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/Header';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discount: string;
  minPeople: number;
  category: string;
  tag?: {
    en: string;
    ar: string;
    color: string;
  };
}

const ProductSelectionCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  originalPrice,
  discountPrice,
  discount,
  minPeople,
  category,
  tag
}) => {
  const { language } = useLanguage();
  
  const formattedCategory = useMemo(() => {
    return encodeURIComponent(category);
  }, [category]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    console.log("Image failed to load:", target.src);
    target.src = "https://placehold.co/600x400?text=No+Image";
    target.onerror = null; // Prevent infinite fallback loop
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all animate-fade-in">
      <div className="aspect-video bg-gray-100 relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge 
            className="bg-royal-blue text-white text-sm font-medium px-3 py-1 rounded-full"
          >
            {discount} {language === 'en' ? 'OFF' : 'تخفيض'}
          </Badge>
          
          {tag && (
            <Badge 
              variant={tag.color as any} 
              className="text-sm font-medium px-3 py-1 rounded-full"
            >
              {tag[language]}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-3">{name}</h3>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold text-royal-blue">{discountPrice} {language === 'en' ? 'SAR' : 'ريال'}</span>
            <span className="text-sm text-gray-500 line-through ml-2">{originalPrice} {language === 'en' ? 'SAR' : 'ريال'}</span>
          </div>
          <div className="text-sm flex items-center text-muted-foreground bg-royal-blue-50 px-2 py-1 rounded-full">
            <Users className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? `Min ${minPeople}` : `الحد الأدنى ${minPeople}`}
          </div>
        </div>
        <div className="mt-auto">
          <Button 
            variant="green"
            size="wide" 
            className="group shadow-sm hover:shadow-md"
            asChild
          >
            <Link 
              to={`/join-jam3a?product=${encodeURIComponent(name)}&price=${discountPrice} SAR&discount=${discount}&category=${formattedCategory}`} 
              className="flex items-center justify-center"
              onClick={() => console.log(`Product selected: ${name}, price: ${discountPrice}, category: ${category}`)}
            >
              {language === 'en' ? 'Start Jam3a' : 'ابدأ جمعة'}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSelectionCard;
