
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

// Initialize Supabase client with safety checks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const hasSupabaseConfig = supabaseUrl && supabaseKey;

// Only create the client if configuration is available
const supabaseClient = hasSupabaseConfig ? createClient(supabaseUrl, supabaseKey) : null;

// Empty results for fallback when Supabase is not configured
const emptyArray: any[] = [];
const emptyObject = {};

// Functions for interacting with Supabase
const createProduct = async (product: Omit<Product, 'id'>) => {
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot create product.');
    throw new Error('Supabase client not initialized');
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
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot create products.');
    throw new Error('Supabase client not initialized');
  }

  const { data, error } = await supabaseClient
    .from('products')
    .insert(products)
    .select();

  if (error) throw error;
  return data || [];
};

const getProducts = async () => {
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Returning empty products array.');
    return emptyArray;
  }

  const { data, error } = await supabaseClient
    .from('products')
    .select('*');

  if (error) throw error;
  return data || [];
};

const getProduct = async (id: number) => {
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot get product.');
    throw new Error('Supabase client not initialized');
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
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot update product.');
    throw new Error('Supabase client not initialized');
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
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot delete product.');
    throw new Error('Supabase client not initialized');
  }

  const { error } = await supabaseClient
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { id };
};

const getDeals = async () => {
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Returning empty deals array.');
    return emptyArray;
  }

  const { data, error } = await supabaseClient
    .from('deals')
    .select('*');

  if (error) throw error;
  return data || [];
};

const getDeal = async (id: number) => {
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot get deal.');
    throw new Error('Supabase client not initialized');
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
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot create deal.');
    throw new Error('Supabase client not initialized');
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
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot update deal.');
    throw new Error('Supabase client not initialized');
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
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Cannot delete deal.');
    throw new Error('Supabase client not initialized');
  }

  const { error } = await supabaseClient
    .from('deals')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { id };
};

const getContentSections = async () => {
  if (!supabaseClient) {
    console.warn('Supabase client not initialized. Returning empty content sections array.');
    return emptyArray;
  }

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
    getContentSections,
    hasSupabaseConfig
  };
};
