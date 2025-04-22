
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check, ShoppingBag, Tag, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/hooks/useJam3aCreation';

interface ProductSelectionProps {
  products: Product[];
  selectedProductId: number | null;
  onSelect: (product: Product) => void;
  loading?: boolean; // Added loading prop as optional
}

const ProductSelection = ({ 
  products, 
  selectedProductId, 
  onSelect,
  loading = false // Default to false
}: ProductSelectionProps) => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      title: "Select a Product",
      description: "Choose the product you want to start or join a Jam3a for",
      priceLabel: "Price",
      savingsLabel: "Save up to",
      selectButton: "Select",
      selectedButton: "Selected",
      groupSize: "Group Size",
      originalPrice: "Original Price",
      jam3aPrice: "Jam3a Price",
      specifications: "Specifications",
      warranty: "Warranty",
      premiumFeature: "Premium Feature",
      loading: "Loading products...",
      noProducts: "No products found for this category"
    },
    ar: {
      title: "اختر منتجًا",
      description: "اختر المنتج الذي تريد بدء أو الانضمام إلى جمعة من أجله",
      priceLabel: "السعر",
      savingsLabel: "وفر حتى",
      selectButton: "اختر",
      selectedButton: "تم الاختيار",
      groupSize: "حجم المجموعة",
      originalPrice: "السعر الأصلي",
      jam3aPrice: "سعر الجمعة",
      specifications: "المواصفات",
      warranty: "الضمان",
      premiumFeature: "ميزة متميزة",
      loading: "جاري تحميل المنتجات...",
      noProducts: "لم يتم العثور على منتجات لهذه الفئة"
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-royal-blue mb-4" />
        <p className="text-muted-foreground">{content[language].loading}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">{content[language].noProducts}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">{content[language].title}</h2>
        <p className="text-muted-foreground mt-2">{content[language].description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const isSelected = product.id === selectedProductId;
          const maxDiscount = product.discounts[product.discounts.length - 1];
          
          return (
            <Card 
              key={product.id} 
              className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${isSelected ? 'border-2 border-royal-blue ring-2 ring-royal-blue/20' : 'border border-gray-200'}`}
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {maxDiscount && (
                  <Badge className="absolute top-2 right-2 bg-royal-blue text-white">
                    <Tag className="h-3 w-3 mr-1" />
                    {content[language].savingsLabel} {maxDiscount.savings}
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xl font-bold text-royal-blue">{product.price} SAR</p>
                    {maxDiscount && (
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">{product.price} SAR</span>
                        {" → "}
                        <span className="font-medium text-green-600">{maxDiscount.price} SAR</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <ShoppingBag className="h-4 w-4 mr-1 text-royal-blue" />
                    <span>{maxDiscount?.minCount}+ {content[language].groupSize}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <ShieldCheck className="h-4 w-4 mr-2 text-royal-blue" />
                    <span>{content[language].warranty}: 1 year</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => onSelect(product)} 
                  variant={isSelected ? "default" : "green"}
                  className={`w-full ${isSelected ? 'bg-royal-blue/10 text-royal-blue hover:bg-royal-blue/20' : 'text-white'}`}
                >
                  {isSelected ? (
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      {content[language].selectedButton}
                    </span>
                  ) : content[language].selectButton}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSelection;
