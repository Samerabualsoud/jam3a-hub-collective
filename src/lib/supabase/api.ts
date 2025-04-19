
import { createClient } from '@supabase/supabase-js';
import { Order, Profile } from '@/types/admin';

// Initialize Supabase client with safety checks
const supabaseUrl = "https://ubqnetocrsksadsbdhlz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicW5ldG9jcnNrc2Fkc2JkaGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMjYzMTUsImV4cCI6MjA2MDYwMjMxNX0.pq9DQRwVs2ycK6AnNceXEHYsqy229dM1T8I0qBc1wNE";
const hasSupabaseConfig = supabaseUrl && supabaseKey;

const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Mock data for development when Supabase isn't available
const mockProducts = [
  { id: 1, name: 'iPhone 16 Pro', category: 'Phones', price: 4999, stock: 10, imageUrl: '/images/products/iphone_16_pro.jpeg' },
  { id: 2, name: 'Galaxy Z Fold', category: 'Phones', price: 5999, stock: 5, imageUrl: '/images/products/galaxy_z_fold.webp' },
  { id: 3, name: 'Galaxy Z Flip', category: 'Phones', price: 3999, stock: 8, imageUrl: '/images/products/galaxy_z_flip.png' },
  { id: 4, name: 'Samsung Galaxy S25', category: 'Phones', price: 3499, stock: 12, imageUrl: '/images/products/samsung_galaxy_s25.jpeg' }
];

const mockDeals = [
  { id: 1, name: 'iPhone Deal', productId: 1, discount: 10, startDate: '2025-04-01', endDate: '2025-05-01', active: true },
  { id: 2, name: 'Samsung Deal', productId: 2, discount: 15, startDate: '2025-04-10', endDate: '2025-05-20', active: true },
  { id: 3, name: 'Flip Phone Deal', productId: 3, discount: 20, startDate: '2025-04-05', endDate: '2025-06-05', active: false }
];

// Functions for interacting with Supabase
const getProducts = async () => {
  try {
    if (!hasSupabaseConfig) return mockProducts;
    
    const { data, error } = await supabaseClient
      .from('products')
      .select('*');

    if (error) throw error;
    return data || mockProducts;
  } catch (err) {
    console.error("Error fetching products:", err);
    return mockProducts;
  }
};

const createProduct = async (product) => {
  try {
    if (!hasSupabaseConfig) {
      // Mock response for development
      return { ...product, id: Date.now() };
    }
    
    const { data, error } = await supabaseClient
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
};

const createMultipleProducts = async (products) => {
  try {
    if (!hasSupabaseConfig) {
      // Mock response for development
      return products.map((product, index) => ({ ...product, id: Date.now() + index }));
    }
    
    const { data, error } = await supabaseClient
      .from('products')
      .insert(products)
      .select();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error creating multiple products:", err);
    throw err;
  }
};

const updateProduct = async (id, product) => {
  try {
    if (!hasSupabaseConfig) {
      // Mock response for development
      return { ...product, id };
    }
    
    const { data, error } = await supabaseClient
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};

const deleteProduct = async (id) => {
  try {
    if (!hasSupabaseConfig) {
      // Mock deletion for development
      return { id };
    }
    
    const { data, error } = await supabaseClient
      .from('products')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};

const getOrders = async (): Promise<Order[]> => {
  try {
    if (!hasSupabaseConfig) {
      // Return mock data for development
      return [
        { 
          id: 1, 
          customer_name: "John Doe", 
          customer_email: "john@example.com", 
          total_amount: 299.99, 
          status: "Pending", 
          created_at: new Date().toISOString(),
          items_count: 2
        },
        { 
          id: 2, 
          customer_name: "Jane Smith", 
          customer_email: "jane@example.com", 
          total_amount: 149.50, 
          status: "Processing", 
          created_at: new Date().toISOString(),
          items_count: 1
        },
      ];
    }
    
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching orders:", err);
    return [];
  }
};

const updateOrderStatus = async (orderId: number, status: Order['status']) => {
  try {
    if (!hasSupabaseConfig) {
      // Mock update for development
      return { id: orderId, status };
    }
    
    const { data, error } = await supabaseClient
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error updating order:", err);
    throw err;
  }
};

const getProfiles = async (): Promise<Profile[]> => {
  try {
    if (!hasSupabaseConfig) {
      // Return mock data for development
      return [
        { 
          id: "1", 
          first_name: "Admin", 
          last_name: "User", 
          email: "admin@example.com", 
          role: "admin", 
          status: "active", 
          created_at: new Date().toISOString() 
        },
        { 
          id: "2", 
          first_name: "Regular", 
          last_name: "User", 
          email: "user@example.com", 
          role: "user", 
          status: "active", 
          created_at: new Date().toISOString() 
        },
      ];
    }
    
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching profiles:", err);
    return [];
  }
};

// Deal management functions
const getDeals = async () => {
  try {
    if (!hasSupabaseConfig) return mockDeals;
    
    const { data, error } = await supabaseClient
      .from('deals')
      .select('*');

    if (error) throw error;
    return data || mockDeals;
  } catch (err) {
    console.error("Error fetching deals:", err);
    return mockDeals;
  }
};

const createDeal = async (deal) => {
  try {
    if (!hasSupabaseConfig) {
      // Mock response for development
      return { ...deal, id: Date.now() };
    }
    
    const { data, error } = await supabaseClient
      .from('deals')
      .insert(deal)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error creating deal:", err);
    throw err;
  }
};

const updateDeal = async (id, deal) => {
  try {
    if (!hasSupabaseConfig) {
      // Mock response for development
      return { ...deal, id };
    }
    
    const { data, error } = await supabaseClient
      .from('deals')
      .update(deal)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error updating deal:", err);
    throw err;
  }
};

const deleteDeal = async (id) => {
  try {
    if (!hasSupabaseConfig) {
      // Mock deletion for development
      return { id };
    }
    
    const { data, error } = await supabaseClient
      .from('deals')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error deleting deal:", err);
    throw err;
  }
};

// Hook to provide access to the API functions
export const useSupabaseApi = () => {
  return {
    hasSupabaseConfig,
    getProducts,
    getOrders,
    updateOrderStatus,
    getProfiles,
    createProduct,
    updateProduct,
    deleteProduct,
    createMultipleProducts,
    getDeals,
    createDeal,
    updateDeal,
    deleteDeal
  };
};
