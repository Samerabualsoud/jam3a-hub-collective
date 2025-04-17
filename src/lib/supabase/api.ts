
import { useSessionContext } from '@supabase/auth-helpers-react';

interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
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

interface ContentSection {
  id: string;
  name: string;
  path: string;
  type: 'page' | 'section' | 'component';
  lastUpdated?: string;
}

export const useSupabaseApi = () => {
  const { supabaseClient } = useSessionContext();

  const validateClient = () => {
    if (!supabaseClient) {
      throw new Error('Supabase client is not initialized');
    }
    
    if (typeof supabaseClient.from !== 'function') {
      console.error('Supabase client is missing the "from" method', supabaseClient);
      throw new Error('Supabase client is not initialized properly');
    }
    
    return supabaseClient;
  };

  const getProducts = async () => {
    try {
      const client = validateClient();
      const { data, error } = await client
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  };

  const createProduct = async (product: Product) => {
    try {
      const client = validateClient();
      const { data, error } = await client
        .from('products')
        .insert(product)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  const createMultipleProducts = async (products: Product[]) => {
    try {
      const client = validateClient();
      const { data, error } = await client
        .from('products')
        .insert(products)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating multiple products:', error);
      throw error;
    }
  };

  const updateProduct = async (id: number, product: Partial<Product>) => {
    try {
      const client = validateClient();
      const { data, error } = await client
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const client = validateClient();
      const { error } = await client
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const getDeals = async () => {
    try {
      const client = validateClient();
      const { data, error } = await client
        .from('deals')
        .select('*, products(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting deals:', error);
      return [];
    }
  };

  const createDeal = async (deal: Deal) => {
    try {
      const client = validateClient();
      const { data, error } = await client
        .from('deals')
        .insert(deal)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  };

  const updateDeal = async (id: number, deal: Partial<Deal>) => {
    try {
      const client = validateClient();
      const { data, error } = await client
        .from('deals')
        .update(deal)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  };

  const deleteDeal = async (id: number) => {
    try {
      const client = validateClient();
      const { error } = await client
        .from('deals')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting deal:', error);
      throw error;
    }
  };

  // Get website content sections
  const getContentSections = async () => {
    // In a real app, this would fetch from the database
    // For now we'll return mock data
    return [
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
    ] as ContentSection[];
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
