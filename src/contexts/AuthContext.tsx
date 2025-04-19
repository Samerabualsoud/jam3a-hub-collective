
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user' | 'seller';
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => ({ error: null }),
  logout: async () => {},
});

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Hard-coded credentials for development when Supabase is not available
const validCredentials: Array<{
  email: string;
  password: string;
  role: 'admin' | 'user' | 'seller';
  name: string;
}> = [
  { email: 'samer@jam3a.me', password: '2141991@Sam', role: 'admin', name: 'Samer' },
];

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, supabaseClient } = useSessionContext();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const updateUser = async () => {
      if (session?.user) {
        try {
          // Set up a safer profile data fetch with error handling
          console.log("Fetching profile for user:", session.user.id);
          
          // First set up basic user data regardless of profile fetch success
          const basicUserData: User = {
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: 'user' // Default role until profile is loaded
          };
          
          // Attempt to fetch profile data, but don't block on it
          const { data: profile, error } = await supabaseClient
            .from('profiles')
            .select('role, first_name, last_name, email')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            
            if (error.code === 'PGRST116') {
              console.log("No profile found for user. Using metadata instead.");
            } else {
              console.error("Profile fetch error:", error.message);
            }
            
            // Still set the user with basic data even if profile fetch fails
            setUser(basicUserData);
            return;
          }

          // If we get here, we have profile data to enhance the user object
          const firstName = profile?.first_name || session.user.user_metadata?.name || '';
          const lastName = profile?.last_name || '';
          const displayName = (firstName || lastName) 
            ? `${firstName} ${lastName}`.trim()
            : session.user.email?.split('@')[0] || 'User';

          const userData: User = {
            ...basicUserData,
            name: displayName,
            role: profile?.role || 'user'
          };
          
          setUser(userData);
          console.log("User authenticated with profile:", userData);
        } catch (error) {
          console.error('Error in user profile handling:', error);
          // Fallback to basic user data if profile fetch fails completely
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: 'user'
          });
        }
      } else {
        setUser(null);
      }
    };

    updateUser();

    // Set up auth state listener with safer pattern to avoid Supabase deadlocks
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (currentSession?.user) {
          // Just log that we detected auth change, but don't call updateUser directly
          console.log("Auth state changed with user:", currentSession.user.email);
          
          // Use setTimeout to avoid potential deadlocks with Supabase client
          setTimeout(() => updateUser(), 0);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [session, supabaseClient]);

  const login = async (email: string, password: string) => {
    try {
      if (!supabaseClient?.auth) {
        console.log("Development mode: attempting login with provided credentials");
        const matchedUser = validCredentials.find(
          (cred) => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
        );
        
        if (matchedUser) {
          const userData: User = {
            id: `dev-${Date.now()}`,
            name: matchedUser.name,
            email: matchedUser.email,
            role: matchedUser.role,
          };
          setUser(userData);
          return { error: null };
        }
        return { error: { message: "Invalid email or password" } };
      }
      
      console.log("Attempting login with Supabase:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Supabase login error:", error);
      }
      
      return { error };
    } catch (error) {
      console.error("Login error:", error);
      return { error };
    }
  };

  const logout = async () => {
    try {
      if (supabaseClient?.auth) {
        await supabase.auth.signOut();
      }
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin', 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);
