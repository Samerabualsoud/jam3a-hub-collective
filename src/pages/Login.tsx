import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Lock, ArrowRight, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = ({ 
  defaultTab = "login",
  onRegister,
  isRegistering = false
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated, user, loading } = useAuth();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otpValue, setOTPValue] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const loginSchema = z.object({
    email: z.string().email({ 
      message: language === 'en' ? "Invalid email address" : "بريد إلكتروني غير صالح" 
    }),
    password: z.string().min(8, { 
      message: language === 'en' ? "Password must be at least 8 characters" : "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" 
    }),
  });

  const registerSchema = z.object({
    name: z.string().min(2, { 
      message: language === 'en' ? "Name must be at least 2 characters" : "يجب أن يتكون الاسم من حرفين على الأقل" 
    }),
    email: z.string().email({ 
      message: language === 'en' ? "Invalid email address" : "بريد إلكتروني غير صالح" 
    }),
    phone: z.string().min(10, { 
      message: language === 'en' ? "Phone number must be at least 10 digits" : "يجب أن يتكون رقم الهاتف من 10 أرقام على الأقل" 
    }),
    password: z.string().min(8, { 
      message: language === 'en' ? "Password must be at least 8 characters" : "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل" 
    }),
  });

  const otpSchema = z.object({
    otp: z.string().length(6, { 
      message: language === 'en' ? "OTP must be 6 digits" : "رمز التحقق يجب أن يتكون من 6 أرقام" 
    }),
  });

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    loginForm.reset();
    registerForm.reset();
    otpForm.reset();
  }, [language]);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const redirectAfterLogin = useCallback(() => {
    navigate("/", { replace: true });
    console.log("Redirecting to home page after successful login");
  }, [navigate]);

  useEffect(() => {
    console.log("Login page authentication status:", { 
      isAuthenticated, 
      user, 
      loading,
      loginAttempted
    });

    if (isAuthenticated && user && loginAttempted && !loading) {
      console.log("Authentication confirmed, redirecting to home page");
      setTimeout(() => {
        redirectAfterLogin();
      }, 100);
    }
  }, [isAuthenticated, user, loading, loginAttempted, redirectAfterLogin]);

  const onLoginSubmit = async (data) => {
    console.log("Login data:", data);
    
    setIsSubmitting(true);
    setLoginAttempted(true);
    
    try {
      console.log("Attempting login with:", data.email);
      const { error } = await login(data.email, data.password);
      
      if (error) {
        console.error("Login error:", error);
        toast({
          title: language === 'en' ? "Login failed" : "فشل تسجيل الدخول",
          description: error.message || (language === 'en' ? "Invalid credentials. Please try again." : "بيانات غير صالحة. حاول مرة اخرى."),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      console.log("Login successful");
      toast({
        title: language === 'en' ? "Login successful" : "تم تسجيل الدخول بنجاح",
        description: language === 'en' ? "Welcome back to Jam3a!" : "مرحبًا بعودتك إلى جمعة!",
      });
      
    } catch (err) {
      console.error("Login exception:", err);
      toast({
        title: language === 'en' ? "Login failed" : "فشل تسجيل الدخول",
        description: language === 'en' ? "An unexpected error occurred" : "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegisterSubmit = async (data) => {
    console.log("Register data:", data);
    
    try {
      const nameParts = data.name.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      const userData = {
        name: firstName,
        last_name: lastName,
        phone: data.phone
      };
      
      if (onRegister) {
        onRegister(data.email, data.password, userData);
      } else {
        setIsSubmitting(true);
        
        supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: firstName,
              last_name: lastName,
              phone: data.phone
            },
            emailRedirectTo: `${window.location.origin}/login`
          }
        }).then(({ data: userData, error }) => {
          if (error) {
            console.error("Registration error details:", error);
            toast({
              title: language === 'en' ? "Registration failed" : "فشل التسجيل",
              description: error.message || (language === 'en' ? "There was a problem creating your account." : "كانت هناك مشكلة في إنشاء حسابك."),
              variant: "destructive",
            });
            setIsSubmitting(false);
            return;
          }

          console.log("Registration success:", userData);
          setUserEmail(data.email);
          
          toast({
            title: language === 'en' ? "Registration successful" : "تم التسجيل بنجاح",
            description: language === 'en' ? "Please check your email to verify your account." : "يرجى التحقق من بريدك الإلكتروني للتحقق من حسابك.",
          });
          
          setShowOTPVerification(true);
          setIsSubmitting(false);
        });
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast({
        title: language === 'en' ? "Registration failed" : "فشل التسجيل",
        description: err.message || (language === 'en' ? "An unexpected error occurred" : "حدث خطأ غير متوقع"),
        variant: "destructive",
      });
      if (!onRegister) setIsSubmitting(false);
    }
  };

  const onOTPSubmit = (data) => {
    console.log("OTP verification:", data);
    
    toast({
      title: language === 'en' ? "Registration successful" : "تم التسجيل بنجاح",
      description: language === 'en' ? "Your account has been created successfully!" : "تم إنشاء حسابك بنجاح!",
    });
    
    setTimeout(() => {
      setShowOTPVerification(false);
      setActiveTab("login");
    }, 1500);
  };

  const handleOTPChange = (value) => {
    setOTPValue(value);
    if (value.length === 6) {
      otpForm.setValue("otp", value);
    }
  };

  if (showOTPVerification) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
              {language === 'en' ? "Verify Your Email" : "تحقق من بريدك الإلكتروني"}
            </h2>
            <p className="text-center text-muted-foreground mb-6">
              {language === 'en' 
                ? `We've sent a verification code to ${userEmail}` 
                : `لقد أرسلنا رمز التحقق إلى ${userEmail}`}
            </p>
            
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormControl>
                        <InputOTP maxLength={6} value={otpValue} onChange={handleOTPChange}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple">
                  {language === 'en' ? "Verify OTP" : "تحقق من الرمز"}
                </Button>
                
                <div className="text-center mt-4">
                  <Button 
                    variant="link" 
                    className="text-jam3a-purple"
                    onClick={() => setShowOTPVerification(false)}
                  >
                    {language === 'en' ? "Go back to registration" : "العودة إلى التسجيل"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">
                {language === 'en' ? "Sign In" : "تسجيل الدخول"}
              </TabsTrigger>
              <TabsTrigger value="register">
                {language === 'en' ? "Sign Up" : "التسجيل"}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Email" : "البريد الإلكتروني"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder={language === 'en' ? "your@email.com" : "بريدك@مثال.كوم"} 
                              className="pl-10" 
                              {...field} 
                              disabled={isSubmitting || loading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Password" : "كلمة المرور"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password" 
                              placeholder="********" 
                              className="pl-10" 
                              {...field} 
                              disabled={isSubmitting || loading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading 
                      ? (language === 'en' ? "Signing in..." : "جاري تسجيل الدخول...") 
                      : (language === 'en' ? "Sign In" : "تسجيل الدخول")}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Full Name" : "الاسم الكامل"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder={language === 'en' ? "John Doe" : "محمد احمد"} 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Email" : "البريد الإلكتروني"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder={language === 'en' ? "your@email.com" : "بريدك@مثال.كوم"}
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Phone Number" : "رقم الهاتف"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder={language === 'en' ? "+966 5X XXX XXXX" : "+966 5X XXX XXXX"} 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? "Password" : "كلمة المرور"}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="password" 
                              placeholder="********" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple"
                    disabled={isSubmitting || isRegistering}
                  >
                    {isSubmitting || isRegistering 
                      ? (language === 'en' ? "Creating Account..." : "جاري إنشاء الحساب...")
                      : (language === 'en' ? "Create Account" : "إنشاء حساب")} 
                    {!(isSubmitting || isRegistering) && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
