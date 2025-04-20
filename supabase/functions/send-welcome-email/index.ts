
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailPayload {
  email: string;
  name?: string;
  isTest?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Email function invoked, parsing request body...");
    const { email, name = "Valued User", isTest = false }: EmailPayload = await req.json();
    
    // Initialize Resend with the API key from environment variables
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("Missing RESEND_API_KEY in environment variables");
    }
    
    const resend = new Resend(resendApiKey);
    
    // Log comprehensive details for debugging
    console.log(`Processing ${isTest ? 'test' : 'welcome'} email request:`, {
      to: email,
      name: name,
      isTest: isTest,
      timestamp: new Date().toISOString()
    });
    
    // Send email using Resend - use a verified domain or the default resend domain
    // For testing, you can use onboarding@resend.dev as the from address
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use this for testing until you verify your domain
      to: [email],
      subject: 'Welcome to Jam3a!',
      html: `
        <h1>Welcome to Jam3a, ${name}!</h1>
        <p>We're excited to have you join our community. Get ready to explore amazing group buying experiences!</p>
        <p>Best regards,<br>The Jam3a Team</p>
      `
    });
    
    console.log('Email send result:', emailResult);
    
    // Return success response with email details
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `${isTest ? 'Test email' : 'Welcome email'} sent successfully`,
        details: emailResult
      }),
      { 
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error in email function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process email", 
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500 
      }
    );
  }
});
