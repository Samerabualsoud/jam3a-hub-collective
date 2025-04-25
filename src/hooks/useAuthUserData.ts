
import { User } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { validateRole, isAdminEmail } from '@/config/authConfig';
import { Session } from '@supabase/supabase-js';

export const useAuthUserData = () => {
  const updateUserData = async (currentSession: Session): Promise<User> => {
    try {
      console.log("Starting to update user data from session:", currentSession.user.id);
      const email = currentSession.user.email || '';
      
      // Basic user data regardless of profile fetch success
      const basicUserData: User = {
        id: currentSession.user.id,
        name: currentSession.user.user_metadata?.name || email.split('@')[0] || 'User',
        email: email,
        role: 'user' // Default role
      };
      
      // Special handling for admin user
      if (isAdminEmail(email)) {
        console.log("Admin user detected via email. Setting admin role directly.");
        return {
          ...basicUserData,
          role: 'admin',
          name: currentSession.user.user_metadata?.name || 'Samer'
        };
      }
      
      // Attempt to fetch profile data
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, first_name, last_name, email')
        .eq('id', currentSession.user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        // Special handling for admin user (fallback if profile fetch fails)
        if (isAdminEmail(email)) {
          console.log("Profile fetch failed but admin email detected - using admin role");
          return {
            ...basicUserData,
            role: 'admin'
          };
        }
        return basicUserData;
      }

      // If we get here, we have profile data to enhance the user object
      const firstName = profile?.first_name || currentSession.user.user_metadata?.name || '';
      const lastName = profile?.last_name || '';
      const displayName = (firstName || lastName) 
        ? `${firstName} ${lastName}`.trim()
        : email.split('@')[0] || 'User';

      // Validate and normalize the role
      const validatedRole = validateRole(profile?.role || null);
      
      // Additional admin check based on email
      const finalRole = isAdminEmail(email) ? 'admin' : validatedRole;

      const userData: User = {
        ...basicUserData,
        name: displayName,
        role: finalRole
      };
      
      console.log("User authenticated with profile:", userData);
      return userData;
    } catch (error) {
      console.error('Error in user profile handling:', error);
      // Fallback to basic user data if profile fetch fails completely
      const email = currentSession.user.email || '';
      return {
        id: currentSession.user.id,
        name: currentSession.user.user_metadata?.name || email.split('@')[0] || 'User',
        email: email,
        role: isAdminEmail(email) ? 'admin' : 'user' // Ensure admin emails still get admin role even in error case
      };
    }
  };

  return { updateUserData };
};
