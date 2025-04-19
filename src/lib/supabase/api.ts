
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

// Initialize Supabase client
const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Functions for interacting with Supabase
const createProduct = async (product: Omit<Product, 'id'>) => {
  const { data, error } = await supabaseClient
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const createMultipleProducts = async (products: Omit<Product, 'id'>[]) => {
  const { data, error } = await supabaseClient
    .from('products')
    .insert(products)
    .select();

  if (error) throw error;
  return data || [];
};

const getProducts = async () => {
  const { data, error } = await supabaseClient
    .from('products')
    .select('*');

  if (error) throw error;
  return data || [];
};

const getProduct = async (id: number) => {
  const { data, error } = await supabaseClient
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

const updateProduct = async (id: number, updates: Partial<Product>) => {
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
  const { error } = await supabaseClient
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { id };
};

const getDeals = async () => {
  const { data, error } = await supabaseClient
    .from('deals')
    .select('*');

  if (error) throw error;
  return data || [];
};

const getDeal = async (id: number) => {
  const { data, error } = await supabaseClient
    .from('deals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

const createDeal = async (deal: Omit<Deal, 'id'>) => {
  const { data, error } = await supabaseClient
    .from('deals')
    .insert(deal)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const updateDeal = async (id: number, updates: Partial<Deal>) => {
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
  const { error } = await supabaseClient
    .from('deals')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { id };
};

const getContentSections = async () => {
  const { data, error } = await supabaseClient
    .from('content_sections')
    .select('*');

  if (error) throw error;
  return data || [];
};

// Hook to provide access to the API functions
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
