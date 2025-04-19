
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendTestEmailWithNotification, sendTestEmail } from "@/tests/send-test-email";
import { useToast } from "@/hooks/use-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

const EmailManager = () => {
  const { toast } = useToast();
  const { supabaseClient } = useSessionContext();
  const [isSending, setIsSending] = useState(false);
  const [recipient, setRecipient] = useState("samer@jam3a.me");
  const [subject, setSubject] = useState("Test Email");
  const [content, setContent] = useState("This is a test email from Jam3a Hub.");

  const handleSendTestEmail = async () => {
    setIsSending(true);
    try {
      toast({
        title: "Sending test email...",
        description: `Attempting to send test email to ${recipient}`
      });
      
      await sendTestEmail();
      
      toast({
        title: "Test email sent",
        description: "Please check your inbox for the test email"
      });
    } catch (error) {
      toast({
        title: "Failed to send test email",
        description: error.message || "An unknown error occurred",
        variant: "destructive"
      });
      console.error("Error sending test email:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Email Management</h2>
      
      <Tabs defaultValue="send-test">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send-test">Send Test Email</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="settings">Email Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="send-test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Test Email</CardTitle>
              <CardDescription>
                Send a test email to verify your SMTP configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input 
                  id="recipient" 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="recipient@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea 
                  id="content" 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Email content"
                  rows={5}
                />
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleSendTestEmail}
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Test Email"}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SMTP Configuration</CardTitle>
              <CardDescription>
                Email sending is configured through Supabase Edge Functions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">Host</Label>
                  <p className="text-sm text-muted-foreground">
                    Configured in Supabase secrets
                  </p>
                </div>
                
                <div>
                  <Label className="font-medium">Port</Label>
                  <p className="text-sm text-muted-foreground">
                    Configured in Supabase secrets
                  </p>
                </div>
                
                <div>
                  <Label className="font-medium">Username</Label>
                  <p className="text-sm text-muted-foreground">
                    Configured in Supabase secrets
                  </p>
                </div>
                
                <div>
                  <Label className="font-medium">Password</Label>
                  <p className="text-sm text-muted-foreground">
                    Configured in Supabase secrets
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Manage your email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Email templates are currently managed through the Edge Function code.
                To modify templates, update the send-welcome-email Edge Function.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure general email settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Email settings are managed through Supabase Edge Functions and secrets.
                Update the send-welcome-email Edge Function to modify email functionality.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailManager;
