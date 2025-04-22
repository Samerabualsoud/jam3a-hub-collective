import React, { useState } from 'react';
import { Users, Send, BadgeInfo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const JoinWaitlist = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const content = {
    en: {
      title: "Join the Jam3a Revolution",
      subtitle: "Be among the first to experience the future of group buying in Saudi Arabia.",
      bannerText: "Early Access Invitation",
      placeholder: "Enter your email address",
      subscribe: "Send me exclusive offers and updates about Jam3a",
      joinWaitlist: "Join Waitlist",
      processing: "Processing...",
      privacy: "By joining, you agree to receive updates from Jam3a. We respect your privacy.",
      error: "Email is required",
      errorDescription: "Please enter your email address to join the waitlist.",
      success: "Success!",
      successDescription: "You've been added to our waitlist. We'll notify you soon!"
    },
    ar: {
      title: "انضم إلى ثورة جمعة",
      subtitle: "كن من أوائل من يختبرون مستقبل الشراء الجماعي في المملكة العربية السعودية.",
      bannerText: "دعوة للوصول المبكر",
      placeholder: "أدخل بريدك الإلكتروني",
      subscribe: "أرسل لي عروضًا حصرية وتحديثات حول جمعة",
      joinWaitlist: "انضم إلى قائمة الانتظار",
      processing: "جاري المعالجة...",
      privacy: "بالانضمام، فإنك توافق على تلقي تحديثات من جمعة. نحن نحترم خصوصيتك.",
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
    <section className="bg-gradient-to-br from-royal-blue-50 to-white py-16 px-4 md:px-8 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl p-6 md:p-10 relative overflow-hidden shadow-xl border border-royal-blue/20">
          {/* Banner */}
          <div className="absolute top-0 left-0 w-full bg-royal-blue text-white py-3 text-center flex items-center justify-center gap-2">
            <BadgeInfo className="h-5 w-5" />
            <span className="text-sm font-medium">
              {content[language].bannerText}
            </span>
          </div>

          {/* Content */}
          <div className="mt-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-royal-blue/10 animate-float shadow-md">
              <Users className="h-10 w-10 text-royal-blue" />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4">
              {content[language].title}
            </h2>
            
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              {content[language].subtitle}
            </p>
            
            <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto">
              <div className="grid gap-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder={content[language].placeholder}
                    className="flex-grow h-12 border-2 border-royal-blue/30 focus:border-royal-blue"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto bg-royal-blue hover:bg-royal-blue-dark text-white shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        {content[language].processing}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {content[language].joinWaitlist}
                      </span>
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Checkbox 
                    id="subscribe" 
                    checked={isSubscribed}
                    onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
                    className="border-royal-blue data-[state=checked]:bg-royal-blue"
                  />
                  <Label htmlFor="subscribe" className="cursor-pointer">
                    {content[language].subscribe}
                  </Label>
                </div>
              </div>
            </form>
            
            <p className="mt-6 text-xs text-gray-500">
              {content[language].privacy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinWaitlist;
