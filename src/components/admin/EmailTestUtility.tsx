
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Mail, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const EmailTestUtility = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<null | { success: boolean; message: string; details?: any }>(null);
  const { toast } = useToast();

  const sendTestEmail = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    setResult(null);

    try {
      // Call the Edge Function to send the email
      const { data, error } = await supabase.functions.invoke("send-welcome-email", {
        body: {
          email,
          name: name || "Test User",
          isTest: true
        },
      });

      if (error) {
        console.error("Edge function error:", error);
        setResult({
          success: false,
          message: `Failed to invoke email function: ${error.message}`,
        });
        toast({
          title: "Email Test Failed",
          description: `Edge function error: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      // Handle the response from the Edge Function
      console.log("Email function response:", data);
      
      if (data.success) {
        setResult({
          success: true,
          message: "Test email sent successfully!",
          details: data.details
        });
        toast({
          title: "Email Sent",
          description: "Test email was sent successfully.",
          variant: "default", // Changed from "success" to "default" to fix the type error
        });
      } else {
        setResult({
          success: false,
          message: data.error || "Unknown error",
          details: data.details
        });
        toast({
          title: "Email Test Failed",
          description: data.error || "Failed to send email",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error("Test email error:", error);
      setResult({
        success: false,
        message: `Exception: ${error instanceof Error ? error.message : String(error)}`,
      });
      toast({
        title: "Exception Occurred",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const renderResultDetails = () => {
    if (!result) return null;

    if (result.success) {
      return (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Email Sent Successfully</AlertTitle>
          <AlertDescription className="text-green-700">
            Your test email was sent to {email}.
            {result.details?.id && (
              <div className="mt-2 text-xs">
                <span className="font-semibold">Email ID:</span> {result.details.id}
              </div>
            )}
          </AlertDescription>
        </Alert>
      );
    } else {
      // Extract specific error types for better user guidance
      let errorMessage = result.message;
      let helpText = "";
      
      if (errorMessage?.includes("rate limit") || errorMessage?.includes("too many")) {
        helpText = "Resend free tier is limited to 100 emails per month and 3 per second. Please try again later.";
      } else if (errorMessage?.includes("sender") || errorMessage?.includes("from address")) {
        helpText = "In Resend's free tier, you can only send from onboarding@resend.dev or verified domains.";
      } else if (errorMessage?.includes("credits") || errorMessage?.includes("quota")) {
        helpText = "Your Resend email quota has been exceeded. Free tier allows 100 emails per month.";
      }
      
      return (
        <Alert className="mt-4 border-red-200" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Failed to Send Email</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>{errorMessage}</p>
            {helpText && <p className="text-sm font-medium">{helpText}</p>}
            {result.details && (
              <div className="mt-2 text-xs overflow-auto max-h-32 bg-red-50 p-2 rounded">
                <pre>{JSON.stringify(result.details, null, 2)}</pre>
              </div>
            )}
          </AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Testing Tool</CardTitle>
        <CardDescription>
          Send a test email to verify your email configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="recipient@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Recipient Name (Optional)</Label>
          <Input
            id="name"
            placeholder="Test User"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        {renderResultDetails()}

      </CardContent>
      <CardFooter>
        <Button 
          onClick={sendTestEmail} 
          disabled={sending}
          className="w-full"
        >
          {sending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send Test Email
            </>
          )}
        </Button>
      </CardFooter>
      
      <div className="px-6 pb-4 text-xs text-muted-foreground">
        <p>Note: This tool uses the Resend service with the following limitations on free tier:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>100 emails per month</li>
          <li>Maximum of 3 emails per second</li>
          <li>Only allowed to send from onboarding@resend.dev or verified domains</li>
        </ul>
      </div>
    </Card>
  );
};

export default EmailTestUtility;
