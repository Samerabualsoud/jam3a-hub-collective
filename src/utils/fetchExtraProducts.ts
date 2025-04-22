
/**
 * Utility function to call the fetch-extra-products edge function.
 */
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export async function fetchAndSaveExtraProducts() {
  try {
    // Call public edge function
    const { data, error } = await supabase.functions.invoke("fetch-extra-products", {
      method: "POST"
    });
    
    if (error) {
      console.error("Error calling fetch-extra-products:", error);
      toast({
        title: "Error fetching products",
        description: error.message || "Failed to fetch products from extra.com",
        variant: "destructive"
      });
      throw error;
    }
    
    console.log("Products fetched successfully:", data);
    return data;
  } catch (err) {
    console.error("Exception in fetchAndSaveExtraProducts:", err);
    toast({
      title: "Error fetching products",
      description: err.message || "Failed to fetch products from extra.com",
      variant: "destructive"
    });
    throw err;
  }
}
