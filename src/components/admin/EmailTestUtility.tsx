
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Info, MailIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const EmailTestUtility = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTestEmail = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address to test",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setResponse(null);
    setShowError(false);
    setShowSuccess(false);
    
    try {
      console.log(`Sending test email to ${email}...`);
      
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: JSON.stringify({
          email,
          name: name || 'Test User',
          isTest: true
        })
      });
      
      if (error) {
        console.error("Edge function error:", error);
        throw new Error(`Edge function error: ${error.message}`);
      }
      
      console.log("Test email response:", data);
      setResponse(data);
      
      if (data.error) {
        throw new Error(data.details || data.error);
      }

      setShowSuccess(true);
      toast({
        title: "Test completed",
        description: "Email function was invoked successfully. Check the response for details."
      });
    } catch (err: any) {
      console.error("Test email error:", err);
      setShowError(true);
      
      let errorMsg = err.message || "Unknown error";
      
      // Detect common Resend issues
      if (errorMsg.includes("rate limit") || errorMsg.includes("too many")) {
        errorMsg = "Rate limit exceeded. With a free Resend account, you can send up to 100 emails per month and 3 per second.";
      } else if (errorMsg.includes("domain") && errorMsg.includes("verify")) {
        errorMsg = "Domain verification error. Your domain needs to be verified in Resend. Using onboarding@resend.dev is allowed for testing.";
      } else if (errorMsg.includes("sender")) {
        errorMsg = "Invalid sender address. With a free Resend account, you can only send from onboarding@resend.dev or from verified domains.";
      } else if (errorMsg.includes("credits") || errorMsg.includes("quota")) {
        errorMsg = "You have reached your free tier limit. Free Resend accounts are limited to 100 emails per month.";
      }
      
      setErrorDetails(errorMsg);
      setResponse({ error: errorMsg });
      
      toast({
        title: "Test failed",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MailIcon className="h-5 w-5" />
          Email Function Test Utility
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              With a free Resend account, you can only send from <strong>onboarding@resend.dev</strong> or from a verified domain.
              For testing, we're using onboarding@resend.dev as the sender address.
            </AlertDescription>
          </Alert>
          
          {showError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Email Sending Failed</AlertTitle>
              <AlertDescription>
                There was an issue sending the test email:
                <br/>
                {errorDetails}
              </AlertDescription>
            </Alert>
          )}
          
          {showSuccess && (
            <Alert variant="success" className="bg-green-50 border-green-400 text-green-800">
              <Info className="h-4 w-4 text-green-500" />
              <AlertTitle>Email Sent Successfully</AlertTitle>
              <AlertDescription>
                Test email was sent successfully! Check the recipient's inbox.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Test Email Address</Label>
            <Input
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Test Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Test User"
            />
          </div>
          
          <Button 
            onClick={handleTestEmail} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Testing..." : "Send Test Email"}
          </Button>
          
          {response && (
            <div className="mt-4 space-y-2">
              <Label>Response</Label>
              <Textarea
                value={JSON.stringify(response, null, 2)}
                readOnly
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-2 border-t pt-4">
            <p className="font-medium mb-1">Resend Free Tier Limitations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>You can send up to 100 emails per month and 3 per second</li>
              <li>You can only send from onboarding@resend.dev or from verified domains</li>
              <li>If you need more, please verify your domain in Resend or upgrade to a paid plan</li>
              <li>When using a verified domain, you must set it as the "from" address in the edge function</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTestUtility;
