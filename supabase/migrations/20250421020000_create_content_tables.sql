
-- Create content tables if they don't exist yet

-- Content sections table
CREATE TABLE IF NOT EXISTS public.content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  content TEXT,
  path TEXT DEFAULT '/',
  type TEXT DEFAULT 'section',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Banners table
CREATE TABLE IF NOT EXISTS public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT,
  link TEXT,
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pages table
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- FAQs table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security policies
-- Grant admin access to content tables
DO $$
BEGIN
  -- Enable RLS on all tables
  EXECUTE 'ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY';
  EXECUTE 'ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY';

  -- Create admin access policies for content_sections
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'content_sections' AND policyname = 'admin_all'
  ) THEN
    CREATE POLICY "admin_all" ON public.content_sections FOR ALL TO authenticated 
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;

  -- Create admin access policies for banners
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'banners' AND policyname = 'admin_all'
  ) THEN
    CREATE POLICY "admin_all" ON public.banners FOR ALL TO authenticated 
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;

  -- Create admin access policies for pages
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'pages' AND policyname = 'admin_all'
  ) THEN
    CREATE POLICY "admin_all" ON public.pages FOR ALL TO authenticated 
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;

  -- Create admin access policies for faqs
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'faqs' AND policyname = 'admin_all'
  ) THEN
    CREATE POLICY "admin_all" ON public.faqs FOR ALL TO authenticated 
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
  END IF;

  -- Public read access for published content
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'pages' AND policyname = 'public_read'
  ) THEN
    CREATE POLICY "public_read" ON public.pages FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'faqs' AND policyname = 'public_read'
  ) THEN
    CREATE POLICY "public_read" ON public.faqs FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'content_sections' AND policyname = 'public_read'
  ) THEN
    CREATE POLICY "public_read" ON public.content_sections FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'banners' AND policyname = 'public_read'
  ) THEN
    CREATE POLICY "public_read" ON public.banners FOR SELECT USING (active = true);
  END IF;
END
$$;
