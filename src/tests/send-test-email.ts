
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const sendTestEmail = async () => {
  try {
    console.log("Sending test email to samer@jam3a.me...");
    
    const { data, error } = await supabase.functions.invoke('send-welcome-email', {
      body: JSON.stringify({
        email: 'samer@jam3a.me',
        name: 'Samer',
        isTest: true
      })
    });

    if (error) {
      console.error('Test email sending failed:', error);
      throw error;
    }

    console.log('Test email sent successfully:', data);
    return data;
  } catch (err) {
    console.error('Unexpected error sending test email:', err);
    throw err;
  }
};

// Create a function to call from UI with toast notification
export const sendTestEmailWithNotification = () => {
  const { toast } = useToast();
  
  return async () => {
    toast({
      title: "Sending test email...",
      description: "Attempting to send test email to samer@jam3a.me"
    });
    
    try {
      await sendTestEmail();
      toast({
        title: "Test email sent",
        description: "Check your inbox for the test email"
      });
    } catch (error) {
      toast({
        title: "Failed to send test email",
        description: error.message || "An unknown error occurred",
        variant: "destructive"
      });
    }
  };
};
