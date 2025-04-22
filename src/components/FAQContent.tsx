
import React, { useEffect, useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from './Header';
import { supabase } from "@/integrations/supabase/client";

const FAQContent = () => {
  const { language } = useLanguage();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const loadFAQContent = async () => {
      try {
        const { data, error } = await supabase
          .from('content_sections')
          .select('*')
          .eq('name', 'FAQ Content')
          .eq('language', language)
          .single();

        if (error) {
          console.error("Error loading FAQ content:", error);
          return;
        }

        if (data && data.content) {
          setFaqs(JSON.parse(data.content));
        }
      } catch (error) {
        console.error("Error parsing FAQ content:", error);
      }
    };

    loadFAQContent();
  }, [language]);

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
        </div>
      </div>
    </section>
  );
};

export default FAQContent;
