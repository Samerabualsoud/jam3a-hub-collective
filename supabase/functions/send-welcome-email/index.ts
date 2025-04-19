
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WelcomeEmailPayload {
  email: string;
  name: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const client = new SmtpClient();
    const { email, name }: WelcomeEmailPayload = await req.json();

    // Connect to SMTP server
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOST")!,
      port: parseInt(Deno.env.get("SMTP_PORT")!),
      username: Deno.env.get("SMTP_USER")!,
      password: Deno.env.get("SMTP_PASSWORD")!,
    });

    // Send welcome email
    await client.send({
      from: Deno.env.get("SMTP_USER")!,
      to: email,
      subject: "Welcome to Jam3a Hub!",
      content: `
        <html>
          <body>
            <h1>Welcome to Jam3a Hub, ${name}!</h1>
            <p>Thank you for joining our community. With Jam3a Hub, you can:</p>
            <ul>
              <li>Join group buying opportunities</li>
              <li>Save money on premium products</li>
              <li>Create your own Jam3a groups</li>
            </ul>
            <p>Get started by browsing our active deals or creating your own Jam3a.</p>
            <p>Best regards,<br>The Jam3a Hub Team</p>
          </body>
        </html>
      `,
      html: true,
    });

    await client.close();

    console.log(`Welcome email sent successfully to ${email}`);
    
    return new Response(
      JSON.stringify({ message: "Welcome email sent successfully" }),
      { 
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error sending welcome email:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send welcome email", 
        details: error.message 
      }),
      { 
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500 
      }
    );
  }
});
