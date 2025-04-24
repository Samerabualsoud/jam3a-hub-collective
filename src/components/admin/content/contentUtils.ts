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

    console.log("Fetched content sections:", existingData);
    
    // If no data exists, create default sections (will only work if user is admin)
    if (!existingData || existingData.length === 0) {
      try {
        console.log("No content sections found, creating default sections");
        const defaultSections = [
          {
            name: "About Us Content",
            path: "/about",
            type: "section",
            language: "en",
            content: JSON.stringify({
              title: "About Jam3a",
              subtitle: "The Power of Buying Together",
              intro: "Jam3a is Saudi Arabia's first group-buying platform...",
              values: [
                {
                  icon: "Users",
                  title: "Community", 
                  desc: "Building stronger communities through collective purchasing"
                },
                {
                  icon: "TrendingUp",
                  title: "Savings", 
                  desc: "Get better prices by buying together"
                },
                {
                  icon: "ShieldCheck",
                  title: "Trust", 
                  desc: "Transparent and secure group buying experience"
                },
                {
                  icon: "Share2",
                  title: "Connection", 
                  desc: "Connect with others who share your interests"
                }
              ],
              story: {
                title: "Our Story",
                image: "",
                part1: "Jam3a was founded with a simple idea: bring people together to save money on products they love.",
                part2: "Since our launch, we've helped thousands of customers save on their purchases while building community connections."
              },
              ctaTitle: "Ready to start saving with Jam3a?",
              ctaButton: "Join Jam3a Today"
            })
          },
          {
            name: "FAQ Content",
            path: "/faq",
            type: "section",
            language: "en",
            content: JSON.stringify([
              {
                question: "What is Jam3a?",
                answer: "Jam3a is a social shopping platform where people team up to get better prices on products..."
              },
              {
                question: "How does group buying work?",
                answer: "Group buying allows multiple people to purchase a product together at a discounted price. The more people join, the bigger the discount!"
              },
              {
                question: "Is it safe to use Jam3a?",
                answer: "Absolutely! We use secure payment methods and protect your personal information."
              },
              {
                question: "How do I start a group purchase?",
                answer: "Simply select a product, click 'Start Jam3a', and share with friends or let others join your group."
              }
            ])
          },
          {
            name: "About Us Content",
            path: "/about",
            type: "section",
            language: "ar",
            content: JSON.stringify({
              title: "عن جمعة",
              subtitle: "قوة الشراء الجماعي",
              intro: "جمعة هي أول منصة للشراء الجماعي في المملكة العربية السعودية...",
              values: [
                {
                  icon: "Users",
                  title: "المجتمع", 
                  desc: "بناء مجتمعات أقوى من خلال الشراء الجماعي"
                },
                {
                  icon: "TrendingUp",
                  title: "التوفير", 
                  desc: "احصل على أسعار أفضل عند الشراء معًا"
                },
                {
                  icon: "ShieldCheck",
                  title: "الثقة", 
                  desc: "تجربة شراء جماعي شفافة وآمنة"
                },
                {
                  icon: "Share2",
                  title: "التواصل", 
                  desc: "تواصل مع الآخرين الذين يشاركونك اهتماماتك"
                }
              ],
              story: {
                title: "قصتنا",
                image: "",
                part1: "تأسست جمعة بفكرة بسيطة: جمع الناس معًا لتوفير المال على المنتجات التي يحبونها.",
                part2: "منذ انطلاقنا، ساعدنا الآلاف من العملاء على التوفير في مشترياتهم مع بناء روابط مجتمعية."
              },
              ctaTitle: "هل أنت مستعد لبدء التوفير مع جمعة؟",
              ctaButton: "انضم إلى جمعة اليوم"
            })
          },
          {
            name: "FAQ Content",
            path: "/faq",
            type: "section",
            language: "ar",
            content: JSON.stringify([
              {
                question: "ما هي جمعة؟",
                answer: "جمعة هي منصة تسوق اجتماعية حيث يتعاون الناس للحصول على أسعار أفضل للمنتجات..."
              },
              {
                question: "كيف يعمل الشراء الجماعي؟",
                answer: "يتيح الشراء الجماعي لعدة أشخاص شراء منتج معًا بسعر مخفض. كلما زاد عدد المشاركين، زاد الخصم!"
              },
              {
                question: "هل استخدام جمعة آمن؟",
                answer: "بالتأكيد! نحن نستخدم طرق دفع آمنة ونحمي معلوماتك الشخصية."
              },
              {
                question: "كيف أبدأ عملية شراء جماعي؟",
                answer: "ما عليك سوى اختيار منتج، والنقر على 'ابدأ جمعة'، ومشاركته مع الأصدقاء أو السماح للآخرين بالانضمام إلى مجموعتك."
              }
            ])
          }
        ];

        // Try to insert default sections
        const { data: insertedData, error: insertError } = await supabase
          .from('content_sections')
          .insert(defaultSections)
          .select();

        if (insertError) {
          console.error("Error inserting default sections:", insertError);
          // Return empty array if we can't create default content
          return [];
        }

        console.log("Created default content sections:", insertedData);
        return insertedData || [];
      } catch (error) {
        console.error("Error creating default content:", error);
        // Return empty array if we can't create default content
        return [];
      }
    }

    return existingData;
  } catch (error) {
    console.error("Exception in fetchContentSections:", error);
    // Return empty array on error
    return [];
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
import { SupabaseApi } from "@/lib/supabase/api";

export const fetchDeals = async () => {
  const api = new SupabaseApi();
  return api.getDeals();
};

export const saveDeal = async (deal: Partial<Deal>) => {
  const api = new SupabaseApi();
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
  const api = new SupabaseApi();
  return api.deleteDeal(id);
};

export const handleSaveDeal = async (dealData: any) => {
  try {
    // Create API instance directly instead of using the hook
    const api = new SupabaseApi();
    const deals = await api.deals.getDeals();
    
    // Check if deal already exists
    const existingDeal = deals.find(d => d.id === dealData.id);
    
    if (existingDeal) {
      // Update existing deal
      await api.deals.updateDeal(dealData.id, dealData);
    } else {
      // Create new deal
      await api.deals.createDeal(dealData);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error saving deal:", error);
    return { success: false, error: error.message };
  }
};
