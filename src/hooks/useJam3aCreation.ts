
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
    console.log(`Category selected: ${categoryId}`);
    setSelectedCategory(categoryId);
    setSelectedProduct(null);
    setCurrentStep(2);
  };

  const handleProductSelect = (product: Product) => {
    console.log(`Product selected: ${product.name} (${product.id})`);
    console.log("Full product data:", JSON.stringify(product, null, 2));
    setSelectedProduct(product);
    setCurrentStep(3);
  };

  const handleGroupSizeChange = (size: number) => {
    setGroupSize(size);
    if (!selectedProduct?.discounts || selectedProduct.discounts.length === 0) return;
    
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
    
    // Navigate to payment page with product and group details
    console.log("Navigating to payment page with:", {
      product: selectedProduct,
      groupSize,
      discountTier
    });
    
    navigate('/payment', {
      state: {
        product: selectedProduct,
        groupSize,
        discountTier
      }
    });
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

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      handlePayAndPublish();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Go back to landing page
      setCurrentStep(0);
      navigate('/');
    }
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
    goToNextStep,
    goToPreviousStep,
  };
};
