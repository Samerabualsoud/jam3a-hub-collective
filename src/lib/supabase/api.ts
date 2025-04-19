
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
