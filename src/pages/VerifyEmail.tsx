
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const VerifyEmail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    // Show success message when component mounts
    toast({
      title: language === 'en' ? "Email Verified Successfully!" : "تم التحقق من البريد الإلكتروني بنجاح!",
      description: language === 'en' ? 
        "Your email has been verified. You can now sign in." : 
        "تم التحقق من بريدك الإلكتروني. يمكنك الآن تسجيل الدخول.",
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto p-8 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Email Verified!' : 'تم التحقق من البريد الإلكتروني!'}
          </h1>
          
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Your email has been successfully verified. You can now access your account.' 
              : 'تم التحقق من بريدك الإلكتروني بنجاح. يمكنك الآن الوصول إلى حسابك.'}
          </p>
          
          <Button 
            className="w-full bg-royal-blue hover:bg-royal-blue-dark"
            onClick={() => navigate('/login')}
          >
            {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
          </Button>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
