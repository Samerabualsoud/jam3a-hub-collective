
import { createClient } from '@supabase/supabase-js';
import { Order, Profile } from '@/types/admin';

// Initialize Supabase client with safety checks
const supabaseUrl = "https://ubqnetocrsksadsbdhlz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicW5ldG9jcnNrc2Fkc2JkaGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMjYzMTUsImV4cCI6MjA2MDYwMjMxNX0.pq9DQRwVs2ycK6AnNceXEHYsqy229dM1T8I0qBc1wNE";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Functions for interacting with Supabase
const getProducts = async () => {
  try {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*');

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

const getOrders = async (): Promise<Order[]> => {
  try {
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

// Hook to provide access to the API functions
export const useSupabaseApi = () => {
  return {
    getProducts,
    getOrders,
    updateOrderStatus,
    getProfiles
  };
};
