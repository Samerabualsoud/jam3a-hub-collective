
// Follow Deno Deploy runtime specifics for edge functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    // Mock scraping products from extra.com
    const products = [
      {
        name: "Samsung Galaxy S23 Ultra",
        price: 4999,
        description: "Latest flagship smartphone with S Pen",
        image_url: "https://placehold.co/600x400?text=S23+Ultra",
        slug: "samsung-galaxy-s23-ultra",
        category_id: 1, // Assumes category 1 is "smartphones"
        source: "extra.com",
        external_id: "extra-12345"
      },
      {
        name: "iPhone 15 Pro",
        price: 5299,
        description: "Apple's premium smartphone with A17 chip",
        image_url: "https://placehold.co/600x400?text=iPhone+15",
        slug: "iphone-15-pro",
        category_id: 1, // Assumes category 1 is "smartphones"
        source: "extra.com",
        external_id: "extra-67890"
      },
      {
        name: "iPad Air 5th Gen",
        price: 2399,
        description: "Powerful tablet with M1 chip",
        image_url: "https://placehold.co/600x400?text=iPad+Air",
        slug: "ipad-air-5",
        category_id: 2, // Assumes category 2 is "tablets"
        source: "extra.com",
        external_id: "extra-24680"
      }
    ];
    
    // Get Supabase client from environment variables
    // Note: These secrets need to be set in the Supabase dashboard
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Insert products into database
    const { data, error } = await supabase
      .from('products_catalog')
      .upsert(products, { 
        onConflict: 'external_id',
        ignoreDuplicates: false
      })
      .select();
    
    if (error) {
      console.error("Error inserting products:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true, products: data, count: data?.length || 0 }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in fetch-extra-products function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
