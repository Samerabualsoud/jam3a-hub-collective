import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const [currentStep, setCurrentStep] = useState(1); // Default to step 1 instead of 0
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [groupSize, setGroupSize] = useState(5);
  const [discountTier, setDiscountTier] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize the step on page load
  useEffect(() => {
    if (location.pathname === '/start-jam3a') {
      setCurrentStep(1);
    }
  }, [location.pathname]);

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
    console.log("handlePayAndPublish called");
    setIsLoading(true);
    
    if (!selectedProduct) {
      console.error("Cannot proceed to payment: No product selected");
      toast({
        title: "Error",
        description: "No product selected. Please select a product first.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
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
    setCurrentStep(1); // Reset to step 1 instead of 0
    setSelectedCategory('');
    setSelectedProduct(null);
    setGroupSize(5);
    setDiscountTier(0);
  };

  const navigateToMyJam3as = () => {
    navigate('/my-jam3as');
  };

  const goToNextStep = () => {
    console.log("goToNextStep called, current step:", currentStep);
    if (currentStep < 5) {
      if (currentStep === 4) {
        console.log("Payment step reached, calling handlePayAndPublish");
        handlePayAndPublish();
      } else {
        setCurrentStep(currentStep + 1);
      }
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
