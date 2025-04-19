
import { supabase } from "@/integrations/supabase/client";

// Types for content management
export interface ContentSection {
  id: string;
  name: string;
  content: string | null;
  path: string | null;
  type: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Banner {
  id: string;
  title: string;
  image_url: string | null;
  link: string | null;
  active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number | null;
  created_at: string | null;
  updated_at: string | null;
}

// API functions for content sections
export const fetchContentSections = async () => {
  const { data, error } = await supabase
    .from('content_sections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const saveContentSection = async (section: Partial<ContentSection>) => {
  const { id, ...sectionData } = section;
  if (id) {
    const { data, error } = await supabase
      .from('content_sections')
      .update({ ...sectionData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('content_sections')
      .insert({ ...sectionData })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// API functions for banners
export const fetchBanners = async () => {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const saveBanner = async (banner: Partial<Banner>) => {
  const { id, ...bannerData } = banner;
  if (id) {
    const { data, error } = await supabase
      .from('banners')
      .update({ ...bannerData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('banners')
      .insert({ ...bannerData })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// API functions for pages
export const fetchPages = async () => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const savePage = async (page: Partial<Page>) => {
  const { id, ...pageData } = page;
  if (id) {
    const { data, error } = await supabase
      .from('pages')
      .update({ ...pageData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('pages')
      .insert({ ...pageData })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// API functions for FAQs
export const fetchFAQs = async () => {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const saveFAQ = async (faq: Partial<FAQ>) => {
  const { id, ...faqData } = faq;
  if (id) {
    const { data, error } = await supabase
      .from('faqs')
      .update({ ...faqData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('faqs')
      .insert({ ...faqData })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
