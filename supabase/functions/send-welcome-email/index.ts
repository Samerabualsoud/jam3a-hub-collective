
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
    
    // For free tier accounts, we can only send from onboarding@resend.dev or verified domains
    // We're using onboarding@resend.dev which is allowed in the free tier for testing
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev', // This is always permitted in free tier
      to: [email],
      subject: isTest ? 'Jam3a Test Email' : 'Welcome to Jam3a!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4F46E5;">${isTest ? 'Test Email' : 'Welcome to Jam3a'}, ${name}!</h1>
          <p style="font-size: 16px; line-height: 1.5;">
            ${isTest 
              ? 'This is a test email from Jam3a. If you received this, email sending is working correctly!' 
              : 'We\'re excited to have you join our community. Get ready to explore amazing group buying experiences!'}
          </p>
          <div style="margin-top: 30px; padding: 15px; background-color: #F3F4F6; border-radius: 5px;">
            <p style="margin: 0; font-size: 14px; color: #6B7280;">
              Best regards,<br>The Jam3a Team
            </p>
          </div>
        </div>
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
