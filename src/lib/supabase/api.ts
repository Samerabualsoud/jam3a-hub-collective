
import { createClient } from '@supabase/supabase-js';

// Type definitions
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
  created_at?: string;
}

export interface Deal {
  id: number;
  name: string;
  productId: number;
  discount: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

// Check if Supabase config exists
const hasSupabaseConfig = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

// Create Supabase client if config exists
const supabaseClient = hasSupabaseConfig 
  ? createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  : null;

// Mock data for demo mode
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy S25",
    description: "Latest flagship phone with advanced AI features",
    price: 3999,
    imageUrl: "/images/products/samsung_galaxy_s25.jpeg",
    category: "Phones",
    stock: 15
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    description: "Apple's premium smartphone with enhanced camera system",
    price: 4499,
    imageUrl: "/images/products/iphone_16_pro.jpeg",
    category: "Phones",
    stock: 10
  },
  {
    id: 3,
    name: "Samsung Galaxy Z Fold",
    description: "Foldable smartphone with large inner display",
    price: 6999,
    imageUrl: "/images/products/galaxy_z_fold.webp",
    category: "Phones",
    stock: 5
  },
  {
    id: 4,
    name: "Samsung Galaxy Z Flip",
    description: "Compact foldable smartphone",
    price: 3999,
    imageUrl: "/images/products/galaxy_z_flip.png",
    category: "Phones",
    stock: 8
  }
];

const mockDeals: Deal[] = [
  {
    id: 1,
    name: "Summer Phone Sale",
    productId: 1,
    discount: 15,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    active: true
  },
  {
    id: 2,
    name: "iPhone Discount",
    productId: 2,
    discount: 10,
    startDate: "2025-04-15",
    endDate: "2025-05-15",
    active: true
  },
  {
    id: 3,
    name: "Foldable Special",
    productId: 3,
    discount: 20,
    startDate: "2025-04-10",
    endDate: "2025-05-10",
    active: true
  },
  {
    id: 4,
    name: "Z Flip Offer",
    productId: 4,
    discount: 15,
    startDate: "2025-04-20",
    endDate: "2025-06-01",
    active: false
  }
];

// Functions for interacting with Supabase
const createProduct = async (product: Omit<Product, 'id'>) => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - mocking product creation');
    const newProduct = {
      ...product,
      id: mockProducts.length + 1,
      created_at: new Date().toISOString()
    };
    
    mockProducts.unshift(newProduct);
    return newProduct;
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const createMultipleProducts = async (products: Omit<Product, 'id'>[]) => {
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

const getProducts = async () => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - returning mock products');
    return mockProducts;
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('products')
    .select('*');

  if (error) throw error;
  return data || [];
};

const getProduct = async (id: number) => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - returning mock product');
    return mockProducts.find(p => p.id === id);
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

const updateProduct = async (id: number, updates: Partial<Product>) => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - mocking product update');
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    mockProducts[index] = { ...mockProducts[index], ...updates };
    return mockProducts[index];
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('products')
    .update(updates)
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
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    mockProducts.splice(index, 1);
    return { id };
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { error } = await supabaseClient
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { id };
};

const getDeals = async () => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - returning mock deals');
    return mockDeals;
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('deals')
    .select('*');

  if (error) throw error;
  return data || [];
};

const getDeal = async (id: number) => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - returning mock deal');
    return mockDeals.find(d => d.id === id);
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('deals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

const createDeal = async (deal: Omit<Deal, 'id'>) => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - mocking deal creation');
    const newDeal = {
      ...deal,
      id: mockDeals.length + 1
    };
    
    mockDeals.push(newDeal);
    return newDeal;
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('deals')
    .insert(deal)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const updateDeal = async (id: number, updates: Partial<Deal>) => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - mocking deal update');
    const index = mockDeals.findIndex(d => d.id === id);
    if (index === -1) {
      throw new Error('Deal not found');
    }
    
    mockDeals[index] = { ...mockDeals[index], ...updates };
    return mockDeals[index];
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('deals')
    .update(updates)
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
    if (index === -1) {
      throw new Error('Deal not found');
    }
    
    mockDeals.splice(index, 1);
    return { id };
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { error } = await supabaseClient
    .from('deals')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { id };
};

const getContentSections = async () => {
  if (!hasSupabaseConfig) {
    console.log('Running in demo mode - returning mock content sections');
    return [
      {
        id: 1,
        name: "Hero Banner",
        path: "/",
        type: "section",
        lastUpdated: "2025-04-01"
      },
      {
        id: 2,
        name: "How It Works",
        path: "/",
        type: "section",
        lastUpdated: "2025-04-02"
      },
      {
        id: 3,
        name: "Featured Deals",
        path: "/",
        type: "section",
        lastUpdated: "2025-04-05"
      },
      {
        id: 4,
        name: "About Us",
        path: "/about",
        type: "page",
        lastUpdated: "2025-03-28"
      },
      {
        id: 5,
        name: "FAQ Page",
        path: "/faq",
        type: "page",
        lastUpdated: "2025-03-30"
      }
    ];
  }

  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('content_sections')
    .select('*');

  if (error) throw error;
  return data || [];
};

// Create a hook to provide access to the API functions
export const useSupabaseApi = () => {
  return {
    createProduct,
    createMultipleProducts,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getDeals,
    getDeal,
    createDeal,
    updateDeal,
    deleteDeal,
    getContentSections
  };
};
