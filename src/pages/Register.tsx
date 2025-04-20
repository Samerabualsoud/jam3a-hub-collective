
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSignUp = async (email: string, password: string, userData: any) => {
    setIsRegistering(true);
    
    try {
      console.log("Starting direct registration process...");
      
      // First, create the user with supabase auth
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        }
      });
      
      if (signUpError) throw signUpError;
      
      console.log("User created successfully, bypassing email verification");
      
      // Attempt to set up profile data manually if needed
      try {
        // The handle_new_user trigger should automatically create the profile
        // but we can manually create it as a fallback
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([{
            id: (await supabase.auth.getUser()).data.user?.id,
            first_name: userData.name || '',
            last_name: userData.last_name || '',
            email: email,
            phone: userData.phone || '',
            role: 'user'
          }], { onConflict: 'id' });
          
        if (profileError) {
          console.warn("Profile creation warning:", profileError.message);
          // Continue even if profile creation fails as the trigger may have handled it
        }
      } catch (profileErr) {
        console.warn("Profile setup warning:", profileErr);
        // Non-blocking error, continue with the flow
      }
      
      // Show success message
      toast({
        title: "Account created successfully",
        description: "You can now log in with your credentials.",
      });
      
      // Since we're bypassing email verification, send the user to login page
      setTimeout(() => navigate("/login"), 1500);
      
      // Attempt to send welcome email via edge function
      try {
        const emailResult = await sendWelcomeEmail(email, userData.name || 'New User');
        console.log("Welcome email function response:", emailResult);
        
        if (emailResult?.success) {
          toast({
            title: "Welcome email processed",
            description: "A welcome email has been processed for your account.",
          });
        }
      } catch (emailErr) {
        console.warn("Welcome email could not be sent:", emailErr);
        // Non-blocking error, continue with the flow
      }
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  // Send welcome email using edge function
  const sendWelcomeEmail = async (email: string, name: string) => {
    console.log(`Attempting to send welcome email to ${email}...`);
    try {
      const { data, error } = await supabase.functions.invoke('send-welcome-email', {
        body: JSON.stringify({
          email,
          name,
          isTest: false
        })
      });
      
      if (error) {
        console.error("Error invoking email function:", error);
        throw error;
      }
      
      console.log("Welcome email function response:", data);
      return data;
    } catch (emailError: any) {
      console.error("Failed to send welcome email:", emailError);
      
      // Show a toast with error details but don't block registration
      toast({
        title: "Welcome email not sent",
        description: "Your account was created, but we couldn't send a welcome email. This won't affect your account.",
        variant: "default"
      });
      
      // Still allow registration to succeed
      return { success: false, error: emailError.message };
    }
  };

  return (
    <Login 
      defaultTab="register" 
      onRegister={handleSignUp}
      isRegistering={isRegistering}
    />
  );
};

export default Register;
