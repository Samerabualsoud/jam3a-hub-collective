
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  
  // In a real app, this would fetch product details from an API
  const productDetails = {
    name: language === 'en' ? 'Product Details' : 'تفاصيل المنتج',
    description: language === 'en' 
      ? 'This is a placeholder for product details. In a complete implementation, this would show details for product ID: ' + id 
      : 'هذا نص بديل لتفاصيل المنتج. في التطبيق النهائي، سيعرض هذا تفاصيل المنتج رقم: ' + id,
    price: 1299,
    image: 'https://placehold.co/600x400'
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img 
                src={productDetails.image} 
                alt={productDetails.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6 md:w-1/2">
              <h1 className="text-2xl font-bold mb-2">{productDetails.name}</h1>
              <p className="text-muted-foreground mb-4">{productDetails.description}</p>
              <p className="text-xl font-semibold mb-6">{productDetails.price} SAR</p>
              
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => {
                    if (isAuthenticated) {
                      toast({
                        title: language === 'en' ? 'Added to cart' : 'تمت الإضافة إلى السلة',
                        description: language === 'en' ? 'This product has been added to your cart' : 'تمت إضافة هذا المنتج إلى سلة التسوق الخاصة بك'
                      });
                    } else {
                      toast({
                        title: language === 'en' ? 'Login required' : 'تسجيل الدخول مطلوب',
                        description: language === 'en' ? 'Please login to add products to cart' : 'الرجاء تسجيل الدخول لإضافة المنتجات إلى السلة',
                        variant: 'destructive'
                      });
                    }
                  }}
                >
                  {language === 'en' ? 'Add to Cart' : 'إضافة إلى السلة'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: language === 'en' ? 'Feature not available' : 'الميزة غير متوفرة',
                      description: language === 'en' ? 'This feature is not implemented yet' : 'هذه الميزة غير متاحة حاليًا'
                    });
                  }}
                >
                  {language === 'en' ? 'Start a Jam3a with this product' : 'ابدأ جمعة بهذا المنتج'}
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
