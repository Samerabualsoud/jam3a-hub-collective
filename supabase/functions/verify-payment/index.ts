
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    // Verify payment using Moyasar API
    const response = await fetch(`https://api.moyasar.com/v1/payments/${payment_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(moyasarApiKey + ':')}`,
        'Content-Type': 'application/json',
      },
    });

    const paymentData = await response.json();

    if (!response.ok) {
      throw new Error(paymentData.message || 'Error verifying payment');
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update payment record in Supabase
    if (paymentData.id) {
      const { error: updateError } = await supabase
        .from('payments')
        .update({
          status: paymentData.status,
          transaction_data: paymentData,
          updated_at: new Date().toISOString(),
        })
        .eq('payment_id', paymentData.id);

      if (updateError) {
        console.error('Error updating payment record:', updateError);
      }
    }

    return new Response(JSON.stringify(paymentData), {
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
