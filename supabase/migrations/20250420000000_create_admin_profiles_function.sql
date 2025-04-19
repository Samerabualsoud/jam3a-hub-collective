
-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.get_profiles_for_admin();

-- Create a function to get all profiles for admin users
CREATE OR REPLACE FUNCTION public.get_profiles_for_admin()
RETURNS SETOF profiles
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the current user is an admin
  IF EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    -- Return all profiles
    RETURN QUERY SELECT * FROM profiles;
  ELSE
    -- Return only the current user's profile
    RETURN QUERY SELECT * FROM profiles WHERE id = auth.uid();
  END IF;
END;
$$;

-- Add comment to function
COMMENT ON FUNCTION public.get_profiles_for_admin() IS 'Gets all profiles if the user is an admin, otherwise returns only the current user profile';
