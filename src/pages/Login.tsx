
import React, { useState } from "react";
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
import { Phone, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// Registration form schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// OTP form schema
const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showOTPVerification, setShowOTPVerification] = useState<boolean>(false);
  const [otpValue, setOTPValue] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  // OTP form
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    
    // Use the authentication context to login
    login({
      id: "user-" + Date.now(),
      name: "User",
      email: data.email,
      isAdmin: data.email.includes("admin")
    });
    
    // Simulate login success
    toast({
      title: "Login successful",
      description: "Welcome back to Jam3a!",
    });
    
    // Redirect to home after successful login
    setTimeout(() => navigate("/"), 1000);
  };

  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("Register data:", data);
    setUserPhone(data.phone);
    
    // Simulate sending OTP
    toast({
      title: "OTP sent",
      description: `Verification code sent to ${data.phone}`,
    });
    
    // Show OTP verification screen
    setShowOTPVerification(true);
  };

  const onOTPSubmit = (data: z.infer<typeof otpSchema>) => {
    console.log("OTP verification:", data);
    
    // Simulate OTP verification success
    toast({
      title: "Registration successful",
      description: "Your account has been created successfully!",
    });
    
    // Redirect to home after successful registration
    setTimeout(() => navigate("/"), 1500);
  };

  // For OTP input
  const handleOTPChange = (value: string) => {
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
            <h2 className="text-2xl font-bold text-center mb-6">Verify Your Phone</h2>
            <p className="text-center text-muted-foreground mb-6">
              We've sent a verification code to {userPhone}
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
                  Verify OTP
                </Button>
                
                <div className="text-center mt-4">
                  <Button 
                    variant="link" 
                    className="text-jam3a-purple"
                    onClick={() => setShowOTPVerification(false)}
                  >
                    Go back to registration
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
            onValueChange={(value) => setActiveTab(value as "login" | "register")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="your@email.com" 
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
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
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
                  
                  <Button type="submit" className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple">
                    Sign In
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
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="John Doe" 
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="your@email.com" 
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="+966 5X XXX XXXX" 
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
                        <FormLabel>Password</FormLabel>
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
                  
                  <Button type="submit" className="w-full bg-jam3a-purple hover:bg-jam3a-deep-purple">
                    Create Account <ArrowRight className="h-4 w-4 ml-2" />
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
