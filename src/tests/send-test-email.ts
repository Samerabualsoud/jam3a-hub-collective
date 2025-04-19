
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const sendTestEmail = async (email = 'samer@jam3a.me', name = 'Samer') => {
  try {
    console.log(`Sending test email to ${email}...`);
    
    const { data, error } = await supabase.functions.invoke('send-welcome-email', {
      body: JSON.stringify({
        email: email,
        name: name,
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
  
  return async (email = 'samer@jam3a.me', name = 'Samer') => {
    toast({
      title: "Sending test email...",
      description: `Attempting to send test email to ${email}`
    });
    
    try {
      const result = await sendTestEmail(email, name);
      toast({
        title: "Test email processed",
        description: "The email test was processed successfully. Check your Supabase Edge Function logs for details."
      });
      return result;
    } catch (error) {
      toast({
        title: "Failed to send test email",
        description: error.message || "An unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
  };
};
