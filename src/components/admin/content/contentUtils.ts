
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
  
  // Ensure required fields are present
  if (!sectionData.name) {
    throw new Error("Section name is required");
  }
  
  // Create a properly typed object with the required field
  const dataToSave = {
    name: sectionData.name,
    content: sectionData.content || null,
    path: sectionData.path || '/',
    type: sectionData.type || 'section',
    updated_at: new Date().toISOString()
  };
  
  if (id) {
    const { data, error } = await supabase
      .from('content_sections')
      .update(dataToSave)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('content_sections')
      .insert(dataToSave)
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
  
  // Ensure required fields are present
  if (!bannerData.title) {
    throw new Error("Banner title is required");
  }
  
  // Create a properly typed object with the required field
  const dataToSave = {
    title: bannerData.title,
    image_url: bannerData.image_url || null,
    link: bannerData.link || null,
    active: bannerData.active || false,
    updated_at: new Date().toISOString()
  };
  
  if (id) {
    const { data, error } = await supabase
      .from('banners')
      .update(dataToSave)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('banners')
      .insert(dataToSave)
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
  
  // Ensure required fields are present
  if (!pageData.title) {
    throw new Error("Page title is required");
  }
  
  if (!pageData.slug) {
    throw new Error("Page slug is required");
  }
  
  // Create a properly typed object with the required fields
  const dataToSave = {
    title: pageData.title,
    slug: pageData.slug,
    content: pageData.content || null,
    meta_description: pageData.meta_description || null,
    meta_keywords: pageData.meta_keywords || null,
    updated_at: new Date().toISOString()
  };
  
  if (id) {
    const { data, error } = await supabase
      .from('pages')
      .update(dataToSave)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('pages')
      .insert(dataToSave)
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
  
  // Ensure required fields are present
  if (!faqData.question) {
    throw new Error("FAQ question is required");
  }
  
  if (!faqData.answer) {
    throw new Error("FAQ answer is required");
  }
  
  // Create a properly typed object with the required fields
  const dataToSave = {
    question: faqData.question,
    answer: faqData.answer,
    category: faqData.category || null,
    display_order: faqData.display_order || 0,
    updated_at: new Date().toISOString()
  };
  
  if (id) {
    const { data, error } = await supabase
      .from('faqs')
      .update(dataToSave)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('faqs')
      .insert(dataToSave)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
