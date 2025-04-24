
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductSelectionCard from '@/components/ProductSelectionCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '@/hooks/useJam3aCreation';

interface ProductSelectionProps {
  products: Product[];
  selectedProductId: string | number | null;
  onSelect: (product: Product) => void;
  loading?: boolean;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({
  products,
  selectedProductId,
  onSelect,
  loading = false
}) => {
  const { language } = useLanguage();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {language === 'en' ? 'Select a Product' : 'اختر منتجًا'}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-8 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500">
          {language === 'en' 
            ? 'No products found in this category' 
            : 'لم يتم العثور على منتجات في هذه الفئة'}
        </h3>
      </div>
    );
  }

  // Function to extract discount info for ProductSelectionCard
  const getProductDiscount = (product: Product) => {
    if (!product.discounts || product.discounts.length === 0) return '0%';
    
    // Find the highest discount
    const highestDiscount = product.discounts.reduce((max, current) => {
      // Calculate percentage discount
      const originalPrice = product.price;
      const discountedPrice = current.price;
      const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
      
      return discount > max ? discount : max;
    }, 0);
    
    return `${Math.round(highestDiscount)}%`;
  };
  
  // Function to find minimum people required for any discount
  const getMinPeople = (product: Product) => {
    if (!product.discounts || product.discounts.length === 0) return 1;
    return Math.min(...product.discounts.map(d => d.minCount));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          {language === 'en' ? 'Select a Product' : 'اختر منتجًا'}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => {
          const isSelected = selectedProductId === product.id;
          const discountPercentage = getProductDiscount(product);
          const minPeople = getMinPeople(product);
          
          // Calculate the best discount price
          const discounts = product.discounts || [];
          const lowestPrice = discounts.length > 0 
            ? Math.min(...discounts.map(d => d.price)) 
            : product.price;
          
          return (
            <div 
              key={product.id} 
              onClick={() => onSelect(product)}
              className={`cursor-pointer transition-transform duration-200 ${isSelected ? 'ring-2 ring-royal-blue rounded-lg scale-[1.02]' : 'hover:scale-[1.01]'}`}
            >
              <ProductSelectionCard
                id={product.id as number}
                name={product.name}
                image={product.image || ''}
                originalPrice={product.price}
                discountPrice={lowestPrice}
                discount={discountPercentage}
                minPeople={minPeople}
                category={product.categoryId?.toString() || ''}
                isSelected={isSelected}
                tag={
                  discountPercentage !== '0%' 
                    ? {
                        en: 'Group Deal',
                        ar: 'عرض جماعي',
                        color: 'royal-blue'
                      }
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSelection;
