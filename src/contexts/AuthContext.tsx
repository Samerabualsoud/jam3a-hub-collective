
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user' | 'seller' | string;
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

// Function to ensure role is one of the expected values
const validateRole = (role: string | null): 'admin' | 'user' | 'seller' => {
  if (role === 'admin' || role === 'seller') {
    return role;
  }
  return 'user'; // Default role
};

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, supabaseClient } = useSessionContext();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Set up auth state listener first to avoid missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase client
          setTimeout(() => updateUserData(currentSession), 0);
        } else {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    if (session) {
      updateUserData(session);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [session]);

  const updateUserData = async (currentSession: Session) => {
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
        
        // Still set the user with basic data even if profile fetch fails
        setUser(basicUserData);
        return;
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
      
      setUser(userData);
      console.log("User authenticated with profile:", userData);
    } catch (error) {
      console.error('Error in user profile handling:', error);
      // Fallback to basic user data if profile fetch fails completely
      setUser({
        id: currentSession.user.id,
        name: currentSession.user.user_metadata?.name || currentSession.user.email?.split('@')[0] || 'User',
        email: currentSession.user.email || '',
        role: 'user'
      });
    }
  };

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
