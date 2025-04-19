import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Session } from '@supabase/supabase-js';

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
          // Fetch user's role from Supabase
          const { data: profile, error } = await supabaseClient
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;

          const userData: User = {
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            role: profile?.role || 'user'
          };
          
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to basic user data if profile fetch fails
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
      
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      
      return { error };
    } catch (error) {
      console.error("Login error:", error);
      return { error };
    }
  };

  const logout = async () => {
    try {
      if (supabaseClient?.auth) {
        await supabaseClient.auth.signOut();
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
