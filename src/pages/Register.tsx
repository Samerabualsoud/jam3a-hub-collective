
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

  // Meanwhile, let's also use our edge function to simulate a welcome email
  const sendWelcomeEmail = async (email: string, name: string) => {
    try {
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/send-welcome-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`
        },
        body: JSON.stringify({
          email,
          name,
          isTest: true // Indicate this is a test/development email
        })
      });
      
      const result = await response.json();
      console.log("Welcome email simulation result:", result);
    } catch (emailError) {
      console.error("Failed to simulate welcome email:", emailError);
      // Non-blocking error, continue with the flow
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
