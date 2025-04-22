import React from 'react';
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { getContent } from '@/utils/jam3aContent';
import type { Product } from '@/hooks/useJam3aCreation';

interface ProductSelectionProps {
  selectedCategory: string;
  selectedProduct: Product | null;
  products: Product[];
  onProductSelect: (product: Product) => void;
  onBack: () => void;
  onNext: () => void;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({
  selectedCategory,
  selectedProduct,
  products,
  onProductSelect,
  onBack,
  onNext,
}) => {
  const { language } = useLanguage();
  const content = getContent(language);

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{content.stepTitles[1]}</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBack}
          className="flex items-center gap-1"
        >
          {language === 'ar' ? (
            <>
              {content.categories.find(c => c.id === selectedCategory)?.name} <ChevronRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <ChevronRight className="h-4 w-4 rotate-180" /> {content.categories.find(c => c.id === selectedCategory)?.name}
            </>
          )}
        </Button>
      </div>

      <p className="text-muted-foreground">{content.selectProductText}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedProduct?.id === product.id ? 'border-royal-blue ring-2 ring-royal-blue/30' : 'hover:border-royal-blue/50'
            }`}
            onClick={() => onProductSelect(product)}
          >
            <div className="aspect-video bg-gray-100 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-royal-blue">
                {language === 'en' ? 'Up to ' : 'يصل إلى '}
                {product.discounts[product.discounts.length - 1].savings} {language === 'en' ? 'OFF' : 'تخفيض'}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-royal-blue">{product.price} {language === 'en' ? 'SAR' : 'ريال'}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                variant={selectedProduct?.id === product.id ? "green" : "outline"}
                size="wide"
                className={selectedProduct?.id === product.id ? "text-white" : ""}
              >
                {selectedProduct?.id === product.id 
                  ? (language === 'en' ? 'Selected' : 'تم الاختيار')
                  : (language === 'en' ? 'Select This Product' : 'اختر هذا المنتج')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-1"
        >
          {language === 'ar' ? (
            <>
              {content.backButton} <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <ArrowLeft className="h-4 w-4" /> {content.backButton}
            </>
          )}
        </Button>
        
        {selectedProduct && (
          <Button 
            variant="green" 
            onClick={onNext}
            className="group text-white"
          >
            {language === 'ar' ? (
              <>
                {content.nextButton} <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </>
            ) : (
              <>
                {content.nextButton} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductSelection;
