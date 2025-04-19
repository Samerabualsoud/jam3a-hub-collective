
import { supabase } from "@/integrations/supabase/client";

export const sendTestEmail = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('send-welcome-email', {
      body: JSON.stringify({
        email: 'samer@jam3a.me',
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

// Automatically trigger the test email
sendTestEmail();
