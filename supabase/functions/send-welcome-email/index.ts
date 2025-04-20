
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { email, name = "Valued User", isTest = false }: EmailPayload = await req.json();
    
    // Log attempt details for debugging
    console.log(`Attempting to send ${isTest ? 'test' : 'welcome'} email to: ${email}`);
    
    // For development purposes, we'll simulate success without actually sending emails
    // This avoids hitting email rate limits during testing
    console.log(`DEVELOPMENT MODE: Email sending simulated for ${email}`);
    
    // Check SMTP config but don't actually use it
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = Deno.env.get("SMTP_PORT");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    const siteUrl = Deno.env.get("SITE_URL") || "https://jam3a.app";
    
    // Log success
    console.log(`${isTest ? 'Test email' : 'Welcome email'} simulated successfully to ${email}`);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `${isTest ? 'Test email' : 'Welcome email'} processed successfully`,
        details: "Email sending was simulated for development purposes." 
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
        error: "Failed to send email", 
        details: error.message 
      }),
      { 
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500 
      }
    );
  }
});
