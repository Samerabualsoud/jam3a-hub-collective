
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

  if (!products || products.length === 0) {
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

  console.log("Rendering products:", products);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">
        {language === 'en' ? 'Select a Product' : 'اختر منتج'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => {
          console.log("Processing product:", product.id, product.name);
          
          // Ensure we have valid discount data
          const discounts = product.discounts && product.discounts.length > 0 
            ? product.discounts
            : [{ minCount: 3, price: Math.round(product.price * 0.95), savings: "5%" }];
          
          const firstDiscount = discounts[0];
          
          return (
            <Card 
              key={product.id}
              className={`cursor-pointer transition-colors h-full ${
                selectedProductId === product.id
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'hover:bg-accent'
              }`}
              onClick={() => onSelect(product)}
            >
              <ProductSelectionCard
                id={typeof product.id === 'number' ? product.id : 0}
                name={product.name}
                image={product.image || "https://placehold.co/600x400?text=No+Image"}
                originalPrice={product.price}
                discountPrice={firstDiscount.price}
                discount={firstDiscount.savings || "5%"}
                minPeople={firstDiscount.minCount}
                category={typeof product.categoryId === 'string' ? product.categoryId : 'general'}
                isSelected={selectedProductId === product.id}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSelection;
