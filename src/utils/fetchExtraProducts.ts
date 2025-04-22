
/**
 * Utility function to call the fetch-extra-products edge function.
 */
import { supabase } from "@/integrations/supabase/client";

export async function fetchAndSaveExtraProducts() {
  // Call public edge function
  const { data, error } = await supabase.functions.invoke("fetch-extra-products", {
    method: "POST"
  });
  if (error) {
    throw new Error(error.message || "Failed to fetch products from extra.com");
  }
  return data;
}
