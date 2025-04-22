
/**
 * Supabase Edge Function: fetch-extra-products
 * Fetches live products from extra.com and saves them into product-related tables.
 * 
 * Note: For simplicity, the scraper will fetch limited sample products.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// CORS headers for browser calls
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Utility: scrape a few featured/smartphones from extra.com (simulate scraping with demo data)
async function scrapeExtraComProducts(): Promise<any[]> {
  // In real-world you'd use fetch + DOM parsing or a headless browser. Here, simulate with static data.
  // You could implement fetch('https://www.extra.com/en-sa/electronics/mobile-phones/c/120100') and parse, if allowed.
  // To avoid anti-bot and CORS issues, for demo we hardcode a few products.
  return [
    {
      name: "Samsung Galaxy S25 Ultra 512GB",
      slug: "samsung-galaxy-s25-ultra-512gb",
      description: "Samsung Galaxy S25 Ultra smartphone with 512GB storage.",
      price: 4799,
      categorySlug: "mobile",
      image_url: "https://media.extra.com/i/aurora/101700247_1?fmt=auto&qlt=80&w=350&h=350",
      discounts: [
        { min_count: 3, price: 4499, savings: "6%" },
        { min_count: 5, price: 4299, savings: "10%" }
      ]
    },
    {
      name: "Apple iPhone 15 Pro Max 256GB",
      slug: "apple-iphone-15-pro-max-256gb",
      description: "Apple flagship iPhone 15 Pro Max with 256GB, from extra.com.",
      price: 5299,
      categorySlug: "mobile",
      image_url: "https://media.extra.com/i/aurora/100224363_1?fmt=auto&qlt=80&w=350&h=350",
      discounts: [
        { min_count: 3, price: 4999, savings: "6%" },
        { min_count: 5, price: 4749, savings: "10%" }
      ]
    },
    {
      name: "Lenovo Ideapad 3, 15.6'' FHD, 512GB",
      slug: "lenovo-ideapad-3-156-fhd-512gb",
      description: "Lenovo Ideapad laptop, 15.6-inch FHD screen, extra.com.",
      price: 2599,
      categorySlug: "laptop",
      image_url: "https://media.extra.com/i/aurora/100110233_1?fmt=auto&qlt=80&w=350&h=350",
      discounts: [
        { min_count: 3, price: 2399, savings: "8%" },
        { min_count: 5, price: 2299, savings: "12%" }
      ]
    }
  ];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Setup Supabase client for DB access
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const products = await scrapeExtraComProducts();

    // Map category slugs to IDs (fetch categories once)
    const { data: categoryRows, error: catErr } = await supabase
      .from("product_categories")
      .select("id,slug");
    if (catErr) throw catErr;

    // Clear old products from catalog (optional: you could only add new if you want)
    // await supabase.from("products_catalog").delete().neq("id", ""); // CAUTION: will remove all!

    // Insert new products & discounts
    for (const p of products) {
      const category = categoryRows.find(c => c.slug === p.categorySlug);
      if (!category) continue;

      // Upsert product by slug (avoid duplicates)
      let { data: existing, error: findErr } = await supabase
        .from("products_catalog")
        .select("id")
        .eq("slug", p.slug)
        .maybeSingle();
      let productId = existing?.id;

      if (!productId) {
        // Insert new product
        const { data: prod, error: insErr } = await supabase
          .from("products_catalog")
          .insert({
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price,
            image_url: p.image_url,
            category_id: category.id,
            source: "extra.com"
          })
          .select("id")
          .single();
        if (insErr) throw insErr;
        productId = prod.id;
      }

      // Insert product discounts
      for (const d of p.discounts) {
        // Upsert discount: skip if same min_count+price exists
        const { data: existDisc } = await supabase
          .from("product_discounts")
          .select("id")
          .eq("product_id", productId)
          .eq("min_count", d.min_count)
          .maybeSingle();
        if (!existDisc) {
          await supabase.from("product_discounts").insert({
            product_id: productId,
            min_count: d.min_count,
            price: d.price,
            savings: d.savings
          });
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, count: products.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Failed to sync products from extra.com", err);
    return new Response(
      JSON.stringify({ error: err.message || String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
