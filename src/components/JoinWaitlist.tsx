
import React, { useState } from 'react';
import { Users, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLanguage } from './Header';

const JoinWaitlist = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const content = {
    en: {
      title: "Join the Jam3a Revolution",
      subtitle: "Be among the first to experience the future of group buying in Saudi Arabia. Sign up now to receive exclusive early access and special offers.",
      placeholder: "Enter your email address",
      subscribe: "Send me exclusive offers and updates about Jam3a",
      joinWaitlist: "Join Waitlist",
      processing: "Processing...",
      privacy: "By joining, you agree to receive updates from Jam3a. We respect your privacy and will never share your information.",
      error: "Email is required",
      errorDescription: "Please enter your email address to join the waitlist.",
      success: "Success!",
      successDescription: "You've been added to our waitlist. We'll notify you soon!"
    },
    ar: {
      title: "انضم إلى ثورة جمعة",
      subtitle: "كن من أوائل من يختبرون مستقبل الشراء الجماعي في المملكة العربية السعودية. سجل الآن للحصول على وصول مبكر حصري وعروض خاصة.",
      placeholder: "أدخل بريدك الإلكتروني",
      subscribe: "أرسل لي عروضًا حصرية وتحديثات حول جمعة",
      joinWaitlist: "انضم إلى قائمة الانتظار",
      processing: "جاري المعالجة...",
      privacy: "بالانضمام، فإنك توافق على تلقي تحديثات من جمعة. نحن نحترم خصوصيتك ولن نشارك معلوماتك أبدًا.",
      error: "البريد الإلكتروني مطلوب",
      errorDescription: "يرجى إدخال عنوان بريدك الإلكتروني للانضمام إلى قائمة الانتظار.",
      success: "تم بنجاح!",
      successDescription: "تمت إضافتك إلى قائمة الانتظار لدينا. سنخبرك قريبًا!"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: content[language].error,
        description: content[language].errorDescription,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: content[language].success,
        description: content[language].successDescription,
      });
      setEmail('');
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-br from-royal-green to-royal-green-light py-14 md:py-20 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full"></div>
        <div className="absolute top-40 left-20 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-[40%] w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-jam3a animate-float">
            <Users className="h-10 w-10 text-royal-green" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mb-4">
            {content[language].title}
          </h2>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">
            {content[language].subtitle}
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end max-w-xl mx-auto">
                <div className="flex-grow">
                  <Input
                    type="email"
                    placeholder={content[language].placeholder}
                    className="h-12 w-full bg-white/95 placeholder-gray-500 border-white/30 focus-visible:ring-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 bg-white font-semibold text-royal-green hover:bg-white/90 transition-colors shadow-jam3a"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      {content[language].processing}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {content[language].joinWaitlist} <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-white/90 justify-center text-sm">
                <Checkbox 
                  id="subscribe" 
                  checked={isSubscribed}
                  onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-royal-green"
                />
                <Label htmlFor="subscribe" className="text-white cursor-pointer">
                  {content[language].subscribe}
                </Label>
              </div>
            </div>
          </form>
          
          <p className="mt-6 text-sm text-white/70">
            {content[language].privacy}
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinWaitlist;
