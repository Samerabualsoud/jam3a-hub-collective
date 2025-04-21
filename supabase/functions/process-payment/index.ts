
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  callback_url: string;
  source: {
    type: string;
    name?: string;
    number?: string;
    cvc?: string;
    month?: string;
    year?: string;
  };
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log("Payment process started");
    const requestBody = await req.json();
    console.log("Request body:", JSON.stringify(requestBody, null, 2));
    
    const { amount, currency, description, source, callback_url, customer } = requestBody as PaymentRequest;

    if (!amount || !currency || !source || !callback_url || !customer) {
      throw new Error('Missing required payment parameters');
    }

    // Get Moyasar API key from environment variables
    const moyasarApiKey = Deno.env.get('MOYASAR_API_KEY');
    if (!moyasarApiKey) {
      throw new Error('Moyasar API key is not set');
    }
    console.log("Moyasar API key is configured");

    console.log("Creating payment with Moyasar");
    // Create payment using Moyasar API
    const response = await fetch('https://api.moyasar.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(moyasarApiKey + ':')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Moyasar expects amount in the smallest currency unit (halala for SAR)
        currency,
        description,
        callback_url,
        source,
        metadata: {
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone || '',
        },
      }),
    });

    const result = await response.json();
    console.log("Moyasar API response:", JSON.stringify(result, null, 2));

    if (!response.ok) {
      console.error("Payment creation failed:", result);
      throw new Error(result.message || 'Error processing payment');
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase credentials are missing, skipping database update");
    } else {
      console.log("Storing payment record in database");
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Store payment record in Supabase
        const { error: insertError } = await supabase.from('payments').insert({
          payment_id: result.id,
          amount: amount,
          currency: currency,
          status: result.status,
          source_type: source.type,
          customer_email: customer.email,
          customer_name: customer.name,
          description: description,
          transaction_data: result,
          created_at: new Date().toISOString(),
        });

        if (insertError) {
          console.error("Error storing payment record:", insertError);
        } else {
          console.log("Payment record stored successfully");
        }
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Continue execution even if database operation fails
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing payment:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
