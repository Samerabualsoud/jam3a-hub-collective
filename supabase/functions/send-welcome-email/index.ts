
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
    console.log("Email function invoked, parsing request body...");
    const { email, name = "Valued User", isTest = false }: EmailPayload = await req.json();
    
    // Log comprehensive details for debugging
    console.log(`Processing ${isTest ? 'test' : 'welcome'} email request:`, {
      to: email,
      name: name,
      isTest: isTest,
      timestamp: new Date().toISOString()
    });
    
    // Check for email service configuration
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = Deno.env.get("SMTP_PORT");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    const siteUrl = Deno.env.get("SITE_URL") || "https://jam3a.app";
    
    // Log configuration status
    const configStatus = {
      hostConfigured: !!smtpHost,
      portConfigured: !!smtpPort,
      userConfigured: !!smtpUser,
      passwordConfigured: !!smtpPassword,
      siteUrlConfigured: !!siteUrl
    };
    console.log("SMTP configuration status:", configStatus);
    
    // In free account, we can't actually send emails, so we'll log a simulation
    console.log(`SIMULATION MODE: Email would be sent to ${email} with subject "Welcome to Jam3a"`);
    console.log(`Email content would include a welcome message for ${name}`);
    
    // Log success
    console.log(`${isTest ? 'Test email' : 'Welcome email'} simulation completed for ${email}`);
    
    // Return success response with detailed info
    return new Response(
      JSON.stringify({ 
        success: true,
        message: `${isTest ? 'Test email' : 'Welcome email'} processed successfully`,
        details: "Email sending was simulated due to free tier limitations",
        recipient: email,
        configStatus: configStatus
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
