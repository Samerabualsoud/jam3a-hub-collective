
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
      
      // Hard-coded admin check - will always work regardless of Supabase
      if (email.toLowerCase() === 'samer@jam3a.me' && password === '2141991@Sam') {
        console.log("Admin login credentials matched! Setting admin user...");
        
        // Create admin user object
        const adminUser: User = {
          id: `admin-${Date.now()}`,
          name: 'Samer',
          email: 'samer@jam3a.me',
          role: 'admin',
        };
        
        // Set user directly without going through Supabase
        setUser(adminUser);
        
        console.log("Admin user set successfully:", adminUser);
        return { error: null };
      }
      
      // Try with other hardcoded credentials if Supabase client is not available
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
          console.log("Login successful with hardcoded credentials for:", userData);
          return { error: null };
        }
        
        console.log("Login failed: Invalid credentials and no Supabase client available");
        return { error: { message: "Invalid email or password" } };
      }
      
      // If we get here, try Supabase authentication
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

  // Debug the current auth state
  console.log("Current auth state:", { user, isAuthenticated: !!user, isAdmin: user?.role === 'admin' });

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
