import { useSessionContext } from '@supabase/auth-helpers-react';

interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  created_at?: string;
}

interface Deal {
  id?: number;
  name: string;
  productId: number;
  discount: number;
  startDate: string;
  endDate: string;
  active: boolean;
  created_at?: string;
}

// Mock data to use when Supabase is not configured
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Mobile Phones",
    price: 3999,
    stock: 10,
    description: "The latest iPhone with A17 Pro chip",
    imageUrl: "/images/products/iphone_16_pro.jpeg",
    created_at: "2025-04-15T12:00:00Z"
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    category: "Mobile Phones",
    price: 3499,
    stock: 15,
    description: "Samsung's flagship phone with advanced AI features",
    imageUrl: "/images/products/samsung_galaxy_s25.jpeg",
    created_at: "2025-04-14T14:30:00Z"
  },
  {
    id: 3,
    name: "Galaxy Z Flip",
    category: "Mobile Phones",
    price: 4599,
    stock: 8,
    description: "Foldable smartphone with flexible display",
    imageUrl: "/images/products/galaxy_z_flip.png",
    created_at: "2025-04-13T09:45:00Z"
  },
  {
    id: 4,
    name: "Galaxy Z Fold",
    category: "Mobile Phones",
    price: 6999,
    stock: 5,
    description: "Premium foldable smartphone with tablet-like experience",
    imageUrl: "/images/products/galaxy_z_fold.webp",
    created_at: "2025-04-12T16:20:00Z"
  }
];

const mockDeals = [
  {
    id: 1,
    name: "Summer Sale - iPhone",
    productId: 1,
    discount: 10,
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    active: true,
    created_at: "2025-04-10T08:00:00Z"
  },
  {
    id: 2,
    name: "Back to School - Samsung",
    productId: 2,
    discount: 15,
    startDate: "2025-08-15",
    endDate: "2025-09-15",
    active: false,
    created_at: "2025-04-09T10:30:00Z"
  }
];

// Mock data to use when Supabase is not configured
const mockContentSections = [
  {
    id: 'hero',
    name: 'Hero Section',
    path: '/',
    type: 'section',
    lastUpdated: '2025-04-15',
  },
  {
    id: 'featured-deals',
    name: 'Featured Deals',
    path: '/',
    type: 'section',
    lastUpdated: '2025-04-16',
  },
  {
    id: 'how-it-works',
    name: 'How It Works',
    path: '/how-it-works',
    type: 'page',
    lastUpdated: '2025-04-10',
  },
  {
    id: 'about',
    name: 'About Us',
    path: '/about-us',
    type: 'page',
    lastUpdated: '2025-04-12',
  },
  {
    id: 'faq',
    name: 'FAQ Page',
    path: '/faq',
    type: 'page',
    lastUpdated: '2025-04-14',
  },
  {
    id: 'benefits',
    name: 'Benefits Section',
    path: '/',
    type: 'section',
    lastUpdated: '2025-04-11',
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    path: '/',
    type: 'section',
    lastUpdated: '2025-04-13',
  },
  {
    id: 'footer',
    name: 'Footer',
    path: '*',
    type: 'component',
    lastUpdated: '2025-04-09',
  },
  {
    id: 'header',
    name: 'Header Navigation',
    path: '*',
    type: 'component',
    lastUpdated: '2025-04-08',
  }
] as any[];

export const useSupabaseApi = () => {
  const { supabaseClient } = useSessionContext();
  
  const hasSupabaseConfig = typeof window !== 'undefined' && 
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY;

  const getProducts = async () => {
    try {
      if (!hasSupabaseConfig) {
        console.log('Running in demo mode - returning mock products');
        return mockProducts;
      }
      
      console.log('Fetching products from Supabase');
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Error getting products:', error);
      return mockProducts;
    }
  };

  const createProduct = async (product: Product) => {
    if (!hasSupabaseConfig) {
      console.log('Running in demo mode - mocking product creation');
      const newProduct = {
        ...product,
        id: Date.now(),
        created_at: new Date().toISOString()
      };
      mockProducts.unshift(newProduct);
      return newProduct;
    }

    const { data, error } = await supabaseClient
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateProduct = async (id: number, product: Partial<Product>) => {
    if (!hasSupabaseConfig) {
      console.log('Running in demo mode - mocking product update');
      const index = mockProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...product };
        return mockProducts[index];
      }
      throw new Error('Product not found');
    }

    const { data, error } = await supabaseClient
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteProduct = async (id: number) => {
    if (!hasSupabaseConfig) {
      console.log('Running in demo mode - mocking product deletion');
      const index = mockProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        return;
      }
      throw new Error('Product not found');
    }

    const { error } = await supabaseClient
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  const getDeals = async () => {
    try {
      if (!hasSupabaseConfig) {
        console.log('Running in demo mode - returning mock deals');
        return mockDeals;
      }

      console.log('Fetching deals from Supabase');
      const { data, error } = await supabaseClient
        .from('deals')
        .select('*, products(name)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error getting deals:', error);
      return mockDeals;
    }
  };

  const createDeal = async (deal: Deal) => {
    if (!hasSupabaseConfig) {
      console.log('Running in demo mode - mocking deal creation');
      const newDeal = {
        ...deal,
        id: Date.now(),
        created_at: new Date().toISOString()
      };
      mockDeals.unshift(newDeal);
      return newDeal;
    }

    const { data, error } = await supabaseClient
      .from('deals')
      .insert(deal)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateDeal = async (id: number, deal: Partial<Deal>) => {
    if (!hasSupabaseConfig) {
      console.log('Running in demo mode - mocking deal update');
      const index = mockDeals.findIndex(d => d.id === id);
      if (index !== -1) {
        mockDeals[index] = { ...mockDeals[index], ...deal };
        return mockDeals[index];
      }
      throw new Error('Deal not found');
    }

    const { data, error } = await supabaseClient
      .from('deals')
      .update(deal)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteDeal = async (id: number) => {
    if (!hasSupabaseConfig) {
      console.log('Running in demo mode - mocking deal deletion');
      const index = mockDeals.findIndex(d => d.id === id);
      if (index !== -1) {
        mockDeals.splice(index, 1);
        return;
      }
      throw new Error('Deal not found');
    }

    const { error } = await supabaseClient
      .from('deals')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  const createMultipleProducts = async (products: Product[]) => {
    if (!hasSupabaseConfig) {
      console.log('Running in demo mode - mocking multiple products creation');
      const newProducts = products.map((product, index) => ({
        ...product,
        id: Date.now() + index,
        created_at: new Date().toISOString()
      }));
      
      // Add to mock products
      mockProducts.unshift(...newProducts);
      return newProducts;
    }

    if (!supabaseClient) {
      throw new Error('Supabase client is not initialized');
    }

    const { data, error } = await supabaseClient
      .from('products')
      .insert(products)
      .select();

    if (error) throw error;
    return data || [];
  };

  const getContentSections = async () => {
    try {
      if (!hasSupabaseConfig) {
        console.log('Running in demo mode - returning mock content sections');
        return mockContentSections;
      }
      
      // In a real app, this would fetch from the Supabase database
      // For now, we'll return the same mock data regardless of Supabase status
      return mockContentSections;
    } catch (error) {
      console.error('Error getting content sections:', error);
      return mockContentSections;
    }
  };

  return {
    getProducts,
    createProduct,
    createMultipleProducts,
    updateProduct,
    deleteProduct,
    getDeals,
    createDeal,
    updateDeal,
    deleteDeal,
    getContentSections,
  };
};
