
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

  const getProducts = async () => {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  const createProduct = async (product: Product) => {
    const { data, error } = await supabaseClient
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateProduct = async (id: number, product: Partial<Product>) => {
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
    const { error } = await supabaseClient
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  const getDeals = async () => {
    const { data, error } = await supabaseClient
      .from('deals')
      .select('*, products(name)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  const createDeal = async (deal: Deal) => {
    const { data, error } = await supabaseClient
      .from('deals')
      .insert(deal)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateDeal = async (id: number, deal: Partial<Deal>) => {
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
    const { error } = await supabaseClient
      .from('deals')
      .delete()
      .eq('id', id);

    if (error) throw error;
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
