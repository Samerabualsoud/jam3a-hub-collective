
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EmailTestUtility = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");

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
      
      toast({
        title: "Test completed",
        description: "Email function was invoked successfully. Check the response for details."
      });
    } catch (err: any) {
      console.error("Test email error:", err);
      setShowError(true);
      setErrorDetails(err.message || "Unknown error");
      setResponse({ error: err.message });
      
      toast({
        title: "Test failed",
        description: err.message || "Failed to invoke email function",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardHeader>
        <CardTitle>Email Function Test Utility</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                There was an issue sending the test email. The Edge Function might be misconfigured.
                Check the Supabase Edge Function logs for more details.
                <br/>
                Error: {errorDetails}
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
          
          <div className="text-sm text-gray-500 mt-2">
            <p>IMPORTANT: Make sure your email domain is verified in Resend.</p>
            <p>Free Resend accounts require domain verification to send emails.</p>
            <p>You can add a "from" address from a verified domain in the edge function.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTestUtility;
