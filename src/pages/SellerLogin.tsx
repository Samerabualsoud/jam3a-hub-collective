
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/Header';
import { BlueBanner } from '@/components/BlueBanner';
import { useAuth } from '@/contexts/AuthContext';
import AdminButton from '@/components/AdminButton';
import { supabase } from '@/integrations/supabase/client';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const SellerLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { isAdmin } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    try {
      // Try to sign in with Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        toast({
          title: language === 'en' ? "Login failed" : "فشل تسجيل الدخول",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Check if the user is a seller
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', (await supabase.auth.getSession()).data.session?.user.id)
        .single();
      
      if (profileError || profile?.role !== 'seller') {
        toast({
          title: language === 'en' ? "Access denied" : "تم رفض الوصول",
          description: language === 'en' 
            ? "This account does not have seller permissions" 
            : "هذا الحساب ليس لديه صلاحيات البائع",
          variant: "destructive",
        });
        // Sign out since this is not a seller account
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }
      
      toast({
        title: language === 'en' ? "Login successful" : "تم تسجيل الدخول بنجاح",
        description: language === 'en' ? "Welcome to your Seller Dashboard!" : "مرحبًا بك في لوحة تحكم البائع!",
      });
      
      setTimeout(() => navigate("/seller-dashboard"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: language === 'en' ? "Login failed" : "فشل تسجيل الدخول",
        description: language === 'en' ? "An unexpected error occurred" : "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const bannerText = {
    en: "Seller Login - Access Your Selling Dashboard",
    ar: "تسجيل دخول البائع - الوصول إلى لوحة التحكم الخاصة بك"
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 relative">
        {isAdmin && <AdminButton />}
        <BlueBanner text={bannerText} />
        
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-16">
          <h1 className="text-2xl font-bold text-center mb-6">
            {language === 'en' ? 'Seller Login' : 'تسجيل دخول البائع'}
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder={language === 'en' ? "your@email.com" : "بريدك@الإلكتروني.كوم"} 
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
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? 'Password' : 'كلمة المرور'}</FormLabel>
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
              
              <div className="flex justify-end">
                <Button variant="link" className="text-royal-blue p-0">
                  {language === 'en' ? 'Forgot password?' : 'نسيت كلمة المرور؟'}
                </Button>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-royal-blue hover:bg-royal-blue-dark"
                disabled={isLoading}
              >
                {isLoading 
                  ? (language === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...')
                  : (language === 'en' ? 'Sign In' : 'تسجيل الدخول')
                }
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  {language === 'en' ? "Don't have a seller account?" : "ليس لديك حساب بائع؟"}{' '}
                  <Link to="/seller-register" className="text-royal-blue font-medium">
                    {language === 'en' ? 'Apply now' : 'تقدم بطلب الآن'}
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerLogin;
