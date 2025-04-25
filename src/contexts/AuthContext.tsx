
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, User } from '@/types/auth';
import { validCredentials } from '@/config/authConfig';
import { useAuthUserData } from '@/hooks/useAuthUserData';

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

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, supabaseClient } = useSessionContext();
  const [user, setUser] = useState<User | null>(null);
  const { updateUserData } = useAuthUserData();

  useEffect(() => {
    // Set up auth state listener first to avoid missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase client
          setTimeout(() => updateUserData(currentSession).then(setUser), 0);
        } else {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    if (session) {
      updateUserData(session).then(setUser);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [session]);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with email:", email);
      
      // Special admin check for Samer
      if (email.toLowerCase() === 'samer@jam3a.me' && password === '2141991@Sam') {
        console.log("Admin login credentials matched - setting admin user directly");
        
        // Create admin user object with proper format
        const adminUser: User = {
          id: `admin-${Date.now()}`,
          name: 'Samer',
          email: 'samer@jam3a.me',
          role: 'admin',
        };
        
        // Set user directly
        setUser(adminUser);
        
        console.log("Admin user set:", adminUser);
        return { error: null };
      }
      
      // Try with hardcoded credentials if needed
      if (!supabaseClient?.auth) {
        console.log("Using hardcoded credentials fallback");
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
          console.log("Login successful with hardcoded credentials:", userData);
          return { error: null };
        }
        
        return { error: { message: "Invalid email or password" } };
      }
      
      // Standard Supabase authentication
      console.log("Attempting Supabase login");
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

  const authValue = { 
    user, 
    session, 
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin', 
    login, 
    logout 
  };

  // Debug the current auth state
  console.log("Current auth state:", authValue);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);
