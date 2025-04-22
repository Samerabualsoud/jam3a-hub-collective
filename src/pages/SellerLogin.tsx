import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

const SellerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const { language } = useLanguage();

  const formSchema = z.object({
    email: z.string().email({ message: language === 'en' ? "Invalid email format." : "تنسيق بريد إلكتروني غير صالح." }),
    password: z.string().min(8, { message: language === 'en' ? "Password must be at least 8 characters." : "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل." }),
    remember: z.boolean().default(false),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      toast({
        title: language === 'en' ? "Login Successful!" : "تم تسجيل الدخول بنجاح!",
        description: language === 'en' ? "You are now logged in." : "أنت الآن مسجل الدخول.",
      });
      navigate('/profile');
    } catch (error: any) {
      toast({
        title: language === 'en' ? "Login Failed." : "فشل تسجيل الدخول.",
        description: error.message || (language === 'en' ? "Invalid credentials." : "بيانات اعتماد غير صالحة."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto p-6 space-y-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">{language === 'en' ? 'Seller Sign In' : 'تسجيل دخول البائع'}</CardTitle>
            <CardDescription>{language === 'en' ? 'Enter your credentials to access your account' : 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</FormLabel>
                      <FormControl>
                        <Input placeholder="seller@example.com" type="email" {...field} />
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
                          <Input
                            placeholder="********"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">Toggle password</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-400 focus:ring-2 focus:ring-royal-blue"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{language === 'en' ? 'Remember me' : 'تذكرني'}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link to="/forgot-password" className="text-sm text-royal-blue hover:underline">
                    {language === 'en' ? 'Forgot password?' : 'هل نسيت كلمة المرور؟'}
                  </Link>
                </div>
                <Button disabled={isSubmitting} type="submit" className="w-full bg-royal-blue hover:bg-royal-blue-dark text-white">
                  {isSubmitting ? (language === 'en' ? 'Signing In...' : 'جاري تسجيل الدخول...') : (language === 'en' ? 'Sign In' : 'تسجيل الدخول')}
                </Button>
              </form>
            </Form>
          </CardContent>
          <div className="px-6">
            <Separator />
          </div>
          <div className="p-6 pt-3 text-center">
            {language === 'en' ? "Don't have an account?" : "ليس لديك حساب؟"}
            <Link to="/seller-register" className="ml-1 text-royal-blue hover:underline">
              {language === 'en' ? 'Register' : 'تسجيل'}
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SellerLogin;
