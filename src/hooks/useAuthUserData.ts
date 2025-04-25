
import { User } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { validateRole } from '@/config/authConfig';
import { Session } from '@supabase/supabase-js';

export const useAuthUserData = () => {
  const updateUserData = async (currentSession: Session): Promise<User> => {
    try {
      // Set up basic user data regardless of profile fetch success
      const basicUserData: User = {
        id: currentSession.user.id,
        name: currentSession.user.user_metadata?.name || currentSession.user.email?.split('@')[0] || 'User',
        email: currentSession.user.email || '',
        role: 'user' // Default role until profile is loaded
      };
      
      // Attempt to fetch profile data
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, first_name, last_name, email')
        .eq('id', currentSession.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return basicUserData;
      }

      // If we get here, we have profile data to enhance the user object
      const firstName = profile?.first_name || currentSession.user.user_metadata?.name || '';
      const lastName = profile?.last_name || '';
      const displayName = (firstName || lastName) 
        ? `${firstName} ${lastName}`.trim()
        : currentSession.user.email?.split('@')[0] || 'User';

      // Validate and normalize the role
      const validatedRole = validateRole(profile?.role || null);

      const userData: User = {
        ...basicUserData,
        name: displayName,
        role: validatedRole
      };
      
      console.log("User authenticated with profile:", userData);
      return userData;
    } catch (error) {
      console.error('Error in user profile handling:', error);
      // Fallback to basic user data if profile fetch fails completely
      return {
        id: currentSession.user.id,
        name: currentSession.user.user_metadata?.name || currentSession.user.email?.split('@')[0] || 'User',
        email: currentSession.user.email || '',
        role: 'user'
      };
    }
  };

  return { updateUserData };
};
