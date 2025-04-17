
import { useSessionContext } from '@supabase/auth-helpers-react';

interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
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

export const useSupabaseApi = () => {
  const { supabaseClient } = useSessionContext();

  const validateClient = () => {
    if (!supabaseClient || typeof supabaseClient.from !== 'function') {
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

  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getDeals,
    createDeal,
    updateDeal,
    deleteDeal,
  };
};
