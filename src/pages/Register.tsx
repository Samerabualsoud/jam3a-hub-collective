
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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          // For development, we'll skip email verification
          emailRedirectTo: `${window.location.origin}/login`
        }
      });
      
      if (error) throw error;
      
      // Show success message
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
      // Redirect to login page after a short delay
      setTimeout(() => navigate("/login"), 2000);
      
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
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
