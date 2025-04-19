
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

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
    const client = new SmtpClient();
    const { email, name = "Valued User", isTest = false }: EmailPayload = await req.json();

    // Connect to SMTP server
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOST")!,
      port: parseInt(Deno.env.get("SMTP_PORT")!),
      username: Deno.env.get("SMTP_USER")!,
      password: Deno.env.get("SMTP_PASSWORD")!,
    });

    // Prepare email content
    const subject = isTest ? "Jam3a Hub - Test Email" : "Welcome to Jam3a Hub!";
    const content = isTest 
      ? `
        <html>
          <body>
            <h1>Jam3a Hub - Email Test Successful</h1>
            <p>This is a test email to confirm that your SMTP configuration is working correctly.</p>
            <p>Sent to: ${email}</p>
            <p>Timestamp: ${new Date().toISOString()}</p>
          </body>
        </html>
      `
      : `
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
      `;

    // Send email
    await client.send({
      from: Deno.env.get("SMTP_USER")!,
      to: email,
      subject: subject,
      content: content,
      html: true,
    });

    await client.close();

    console.log(`${isTest ? 'Test email' : 'Welcome email'} sent successfully to ${email}`);
    
    return new Response(
      JSON.stringify({ message: `${isTest ? 'Test email' : 'Welcome email'} sent successfully` }),
      { 
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error sending email:", error);
    
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
