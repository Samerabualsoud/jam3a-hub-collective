
import React, { useEffect, useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FAQContent = () => {
  const { language } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFAQContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('content_sections')
          .select('*')
          .eq('name', 'FAQ Content')
          .eq('language', language)
          .single();

        if (error) {
          console.error("Error loading FAQ content:", error);
          setError("Could not load FAQ content");
          setFaqs([]);
          return;
        }

        if (data && data.content) {
          try {
            const parsedContent = JSON.parse(data.content);
            setFaqs(parsedContent);
          } catch (parseError) {
            console.error("Error parsing FAQ content:", parseError);
            setError("Content format is invalid");
            setFaqs([]);
          }
        } else {
          setFaqs([]);
        }
      } catch (error) {
        console.error("Error loading FAQ content:", error);
        setError("An unexpected error occurred");
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFAQContent();
  }, [language]);

  if (loading) {
    return (
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-8">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-full mx-auto" />
          </div>
          <div className="mx-auto max-w-3xl">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="mb-4">
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-red-500">
              Error Loading FAQs
            </h1>
            <p className="mt-3 text-muted-foreground">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {language === 'en' 
              ? 'Everything you need to know about Jam3a group buying' 
              : 'كل ما تحتاج معرفته عن الشراء الجماعي مع جمعة'}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'No FAQ content available at the moment.' 
                  : 'لا يوجد محتوى للأسئلة الشائعة حاليًا.'}
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQContent;
