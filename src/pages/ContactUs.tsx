
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { AtSign, Phone, MapPin, Send } from 'lucide-react';

const ContactUs = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: language === 'en' ? 'Message Sent' : 'تم إرسال الرسالة',
        description: language === 'en' 
          ? 'We have received your message and will get back to you soon.' 
          : 'لقد تلقينا رسالتك وسنرد عليك قريبًا.'
      });
      setIsSending(false);
      
      // Reset form
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">
            {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {language === 'en' 
              ? 'Have a question or feedback? Get in touch with our team.' 
              : 'هل لديك سؤال أو ملاحظة؟ تواصل مع فريقنا.'}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-royal-blue/10 p-2 rounded-full">
                      <AtSign className="h-5 w-5 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {language === 'en' ? 'Email Us' : 'راسلنا عبر البريد الإلكتروني'}
                      </h3>
                      <a href="mailto:contact@jam3a.sa" className="text-sm text-royal-blue">
                        contact@jam3a.sa
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-royal-blue/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {language === 'en' ? 'Call Us' : 'اتصل بنا'}
                      </h3>
                      <a href="tel:+966123456789" className="text-sm text-royal-blue">
                        +966 12 345 6789
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-royal-blue/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-royal-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {language === 'en' ? 'Visit Us' : 'زرنا'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'King Fahd Road, Riyadh, Saudi Arabia' 
                          : 'طريق الملك فهد، الرياض، المملكة العربية السعودية'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Send us a Message' : 'أرسل لنا رسالة'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {language === 'en' ? 'Name' : 'الاسم'}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'Your name' : 'اسمك'}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'Your email' : 'بريدك الإلكتروني'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {language === 'en' ? 'Subject' : 'الموضوع'}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Subject of your message' : 'موضوع رسالتك'}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {language === 'en' ? 'Message' : 'الرسالة'}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Your message' : 'رسالتك'}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-royal-blue hover:bg-royal-blue-dark"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {language === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
