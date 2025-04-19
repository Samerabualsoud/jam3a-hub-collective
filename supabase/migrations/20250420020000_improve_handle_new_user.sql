
-- Drop the existing handle_new_user function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create an improved version that better extracts user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    _first_name TEXT;
    _last_name TEXT;
    _email TEXT;
BEGIN
    -- Extract metadata with better fallbacks
    _first_name := COALESCE(
        NEW.raw_user_meta_data->>'first_name', 
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );
    
    _last_name := COALESCE(
        NEW.raw_user_meta_data->>'last_name',
        NEW.raw_user_meta_data->>'surname',
        ''
    );
    
    _email := NEW.email;

    -- Insert with better data and defaults
    INSERT INTO public.profiles (
        id, 
        email, 
        first_name, 
        last_name, 
        role, 
        status
    )
    VALUES (
        NEW.id, 
        _email,
        _first_name,
        _last_name,
        'user',  -- Default role
        'active' -- Default status
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure we have a trigger setup for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
