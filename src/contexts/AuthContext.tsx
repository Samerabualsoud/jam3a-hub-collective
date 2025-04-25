
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
  loading: false,
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
  const [loading, setLoading] = useState<boolean>(true);
  const { updateUserData } = useAuthUserData();

  useEffect(() => {
    console.log("AuthProvider mounted, initializing...");
    
    // Set up auth state listener first to avoid missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        console.log("Auth state change detected:", _event, currentSession?.user?.id);
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase client
          setTimeout(() => {
            updateUserData(currentSession).then(userData => {
              console.log("User data updated from auth state change:", userData);
              setUser(userData);
              setLoading(false);
            });
          }, 0);
        } else {
          console.log("No session in auth state change, setting user to null");
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        if (session) {
          console.log("Existing session found, updating user data");
          const userData = await updateUserData(session);
          console.log("User data initialized from existing session:", userData);
          setUser(userData);
        }
      } catch (err) {
        console.error("Error initializing user data:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [session]);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with email:", email);
      setLoading(true);
      
      // Special admin check for Samer or admin login
      const isAdminLogin = email.toLowerCase() === 'samer@jam3a.me' || 
                           email.toLowerCase() === 'admin@example.com';
                          
      if (isAdminLogin && (password === '2141991@Sam' || password === 'adminpass')) {
        console.log("Admin login credentials matched - setting admin user directly");
        
        // Create admin user object with proper format
        const adminUser: User = {
          id: `admin-${Date.now()}`,
          name: email.includes('samer') ? 'Samer' : 'Admin',
          email: email,
          role: 'admin',
        };
        
        // Set user directly
        setUser(adminUser);
        console.log("Admin user set:", adminUser);
        
        // Set loading to false immediately for admin users
        setTimeout(() => {
          setLoading(false);
        }, 100);
        
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
          
          // Ensure loading state is updated after setting user
          setTimeout(() => {
            setLoading(false);
          }, 100);
          
          return { error: null };
        }
        
        setLoading(false);
        return { error: { message: "Invalid email or password" } };
      }
      
      // Standard Supabase authentication
      console.log("Attempting Supabase login");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Supabase login error:", error);
        setLoading(false);
        return { error };
      }
      
      console.log("Supabase login successful:", data);
      // User will be set by onAuthStateChange
      
      // Just in case onAuthStateChange doesn't fire, set loading to false after a short delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return { error: null };
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      return { error };
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      if (supabaseClient?.auth) {
        await supabase.auth.signOut();
      }
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const authValue = { 
    user, 
    session, 
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin', 
    login, 
    logout,
    loading
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
