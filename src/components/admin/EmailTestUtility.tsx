
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";

const EmailTestUtility = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

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
    
    try {
      console.log(`Sending test email to ${email}...`);
      
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: JSON.stringify({
          email,
          name: name || 'Test User',
          isTest: true
        })
      });
      
      if (error) throw error;
      
      console.log("Test email response:", data);
      setResponse(data);
      
      toast({
        title: "Test completed",
        description: "Email function was invoked successfully. Check the response for details."
      });
    } catch (err: any) {
      console.error("Test email error:", err);
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
            <p>Note: This utility tests the edge function without affecting your account.</p>
            <p>Free Supabase accounts have limited email functionality.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTestUtility;
