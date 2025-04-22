
import React from 'react';
import { Card } from "@/components/ui/card";
import ProductSelectionCard from "@/components/ProductSelectionCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

export interface Product {
  id: string | number;
  name: string;
  image?: string;
  price: number;
  categoryId?: string | number;
  discounts?: {
    minCount: number;
    price: number;
    savings?: string;
  }[];
}

export interface ProductSelectionProps {
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
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">
          {language === 'en' ? 'Loading products...' : 'جاري تحميل المنتجات...'}
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-medium mb-2">
          {language === 'en' ? 'No products found' : 'لم يتم العثور على منتجات'}
        </p>
        <p className="text-muted-foreground">
          {language === 'en' 
            ? 'Please try selecting a different category' 
            : 'يرجى محاولة اختيار فئة مختلفة'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {language === 'en' ? 'Select a Product' : 'اختر منتج'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card 
            key={product.id}
            className={`cursor-pointer transition-colors ${
              selectedProductId === product.id
                ? 'ring-2 ring-primary ring-offset-2'
                : 'hover:bg-accent'
            }`}
            onClick={() => onSelect(product)}
          >
            <ProductSelectionCard
              product={product}
              isSelected={selectedProductId === product.id}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductSelection;
