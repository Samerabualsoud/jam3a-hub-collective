import { supabase } from "@/integrations/supabase/client";

// Types for content management
export interface ContentSection {
  id: string;
  name: string;
  content: string | null;
  path: string | null;
  type: string | null;
  language: string | null;
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

export interface Deal {
  id: string;
  name: string;
  product_id: number;
  discount: number;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

// API functions for content sections
export const fetchContentSections = async () => {
  try {
    console.log("Starting to fetch content sections");
    
    const { data: existingData, error } = await supabase
      .from('content_sections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching content sections:", error);
      throw error;
    }

    // If no data exists, create default sections
    if (!existingData || existingData.length === 0) {
      const defaultSections = [
        {
          name: "About Us Content",
          path: "/about",
          type: "section",
          content: JSON.stringify({
            title: "About Jam3a",
            subtitle: "The Power of Buying Together",
            intro: "Jam3a is Saudi Arabia's first group-buying platform...",
            // Add other about content structure
          })
        },
        {
          name: "FAQ Content",
          path: "/faq",
          type: "section",
          content: JSON.stringify([
            {
              question: "What is Jam3a?",
              answer: "Jam3a is a social shopping platform where people team up to get better prices on products..."
            },
            // Add other FAQ items
          ])
        }
      ];

      // Insert default sections
      const { data: insertedData, error: insertError } = await supabase
        .from('content_sections')
        .insert(defaultSections)
        .select();

      if (insertError) {
        console.error("Error inserting default sections:", insertError);
        throw insertError;
      }

      return insertedData || [];
    }

    console.log("Fetched content sections:", existingData);
    return existingData;
  } catch (error) {
    console.error("Exception in fetchContentSections:", error);
    throw error;
  }
};

export const saveContentSection = async (section: Partial<ContentSection>) => {
  const { id, ...sectionData } = section;
  
  if (!sectionData.name) {
    throw new Error("Section name is required");
  }
  
  if (!sectionData.language) {
    throw new Error("Language is required");
  }
  
  const dataToSave = {
    name: sectionData.name,
    content: sectionData.content || null,
    path: sectionData.path || '/',
    type: sectionData.type || 'section',
    language: sectionData.language,
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

export const deleteContentSection = async (id: string) => {
  const { error } = await supabase
    .from('content_sections')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// API functions for banners
export const fetchBanners = async () => {
  try {
    console.log("Starting to fetch banners");
    
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }

    console.log("Fetched banners:", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

export const saveBanner = async (banner: Partial<Banner>) => {
  const { id, ...bannerData } = banner;
  
  if (!bannerData.title) {
    throw new Error("Banner title is required");
  }
  
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

export const deleteBanner = async (id: string) => {
  const { error } = await supabase
    .from('banners')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// API functions for pages
export const fetchPages = async () => {
  try {
    console.log("Starting to fetch pages");
    
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }

    console.log("Fetched pages:", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    throw error;
  }
};

export const savePage = async (page: Partial<Page>) => {
  const { id, ...pageData } = page;
  
  if (!pageData.title) {
    throw new Error("Page title is required");
  }
  
  if (!pageData.slug) {
    throw new Error("Page slug is required");
  }
  
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

export const deletePage = async (id: string) => {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// API functions for FAQs
export const fetchFAQs = async () => {
  try {
    console.log("Starting to fetch FAQs");
    
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error("Error fetching FAQs:", error);
      throw error;
    }

    console.log("Fetched FAQs:", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};

export const saveFAQ = async (faq: Partial<FAQ>) => {
  const { id, ...faqData } = faq;
  
  if (!faqData.question) {
    throw new Error("FAQ question is required");
  }
  
  if (!faqData.answer) {
    throw new Error("FAQ answer is required");
  }
  
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

export const deleteFAQ = async (id: string) => {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// For deals, we'll leverage the existing implementation in src/lib/supabase/api.ts
// to avoid TypeScript errors since the types aren't yet aware of the deals table
import { useSupabaseApi } from "@/lib/supabase/api";

export const fetchDeals = async () => {
  const api = useSupabaseApi();
  return api.getDeals();
};

export const saveDeal = async (deal: Partial<Deal>) => {
  const api = useSupabaseApi();
  const { id, ...dealData } = deal;
  
  if (!dealData.name) {
    throw new Error("Deal name is required");
  }
  
  if (!dealData.product_id) {
    throw new Error("Product is required");
  }
  
  if (id) {
    return api.updateDeal(id, dealData);
  } else {
    return api.createDeal(dealData);
  }
};

export const deleteDeal = async (id: string) => {
  const api = useSupabaseApi();
  return api.deleteDeal(id);
};
