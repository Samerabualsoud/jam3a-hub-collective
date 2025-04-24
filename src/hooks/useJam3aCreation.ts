
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export interface Product {
  id: number | string;
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

export const useJam3aCreation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [groupSize, setGroupSize] = useState(5);
  const [discountTier, setDiscountTier] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedProduct(null);
    setCurrentStep(1);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentStep(2);
  };

  const handleGroupSizeChange = (size: number) => {
    setGroupSize(size);
    if (!selectedProduct || !selectedProduct.discounts || selectedProduct.discounts.length === 0) return;
    
    // Find the appropriate discount tier based on group size
    let appropriateDiscountIndex = 0;
    
    for (let i = 0; i < selectedProduct.discounts.length; i++) {
      if (size >= selectedProduct.discounts[i].minCount) {
        appropriateDiscountIndex = i;
      } else {
        break;
      }
    }
    
    setDiscountTier(appropriateDiscountIndex);
  };

  const handlePayAndPublish = () => {
    setIsLoading(true);
    
    // Simulate payment process
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
      
      toast({
        title: 'Success',
        description: 'Your Jam3a has been created successfully!',
        duration: 5000,
      });
    }, 2000);
  };

  const resetForm = () => {
    setCurrentStep(0);
    setSelectedCategory('');
    setSelectedProduct(null);
    setGroupSize(5);
    setDiscountTier(0);
  };

  const navigateToMyJam3as = () => {
    navigate('/my-jam3as');
  };

  return {
    currentStep,
    setCurrentStep,
    selectedCategory,
    selectedProduct,
    groupSize,
    discountTier,
    isLoading,
    handleCategorySelect,
    handleProductSelect,
    handleGroupSizeChange,
    handlePayAndPublish,
    resetForm,
    navigateToMyJam3as,
  };
};
