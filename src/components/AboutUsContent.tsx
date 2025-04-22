
import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, ShieldCheck, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const AboutUsContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAboutContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('content_sections')
          .select('*')
          .eq('name', 'About Us Content')
          .eq('language', language)
          .single();

        if (error) {
          console.error("Error loading about content:", error);
          setError("Could not load About Us content");
          setContent(null);
          return;
        }

        if (data && data.content) {
          try {
            const parsedContent = JSON.parse(data.content);
            setContent(parsedContent);
          } catch (parseError) {
            console.error("Error parsing about content:", parseError);
            setError("Content format is invalid");
            setContent(null);
          }
        } else {
          setContent(null);
        }
      } catch (error) {
        console.error("Error loading about content:", error);
        setError("An unexpected error occurred");
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadAboutContent();
  }, [language]);

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-full mx-auto" />
          </div>
          <div className="mb-16">
            <Skeleton className="h-32 w-full mx-auto" />
          </div>
          <div className="mb-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-16 w-16 rounded-full mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6 text-red-500">
              Error Loading About Us
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl max-w-3xl mx-auto">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className={`py-16 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
            {content.title}
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-16 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-center">
            {content.intro}
          </p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {content.values?.map((value, index) => (
              <Card key={index} className="border-2 hover:border-jam3a-purple transition-all">
                <CardContent className="pt-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-jam3a-purple/10 mb-4">
                    {value.icon === 'Users' && <Users className="h-10 w-10 text-jam3a-purple" />}
                    {value.icon === 'Share2' && <Share2 className="h-10 w-10 text-jam3a-purple" />}
                    {value.icon === 'ShieldCheck' && <ShieldCheck className="h-10 w-10 text-jam3a-purple" />}
                    {value.icon === 'TrendingUp' && <TrendingUp className="h-10 w-10 text-jam3a-purple" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        {content.story && (
          <div className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">{content.story.title}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative">
                <div className="absolute -right-4 -bottom-4 h-40 w-40 rounded-full bg-jam3a-purple/20 blur-3xl"></div>
                <img 
                  src={content.story.image || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"}
                  alt="Jam3a founding team" 
                  className="rounded-xl w-full h-full object-cover shadow-lg"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <p className="text-lg">{content.story.part1}</p>
                <p className="text-lg">{content.story.part2}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center py-12 bg-gradient-to-r from-jam3a-purple/10 to-white rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{content.ctaTitle}</h2>
          <Button size="lg" className="bg-jam3a-purple hover:bg-jam3a-deep-purple">
            {content.ctaButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContent;
