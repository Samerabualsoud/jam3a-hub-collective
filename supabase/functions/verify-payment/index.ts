
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { payment_id } = await req.json();
    
    if (!payment_id) {
      throw new Error('Payment ID is required');
    }

    // Get Moyasar API key from environment variables
    const moyasarApiKey = Deno.env.get('MOYASAR_API_KEY');
    if (!moyasarApiKey) {
      throw new Error('Moyasar API key is not set');
    }

    // Verify payment status using Moyasar API
    const response = await fetch(`https://api.moyasar.com/v1/payments/${payment_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(moyasarApiKey + ':')}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error verifying payment');
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
