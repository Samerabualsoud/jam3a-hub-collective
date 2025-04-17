
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
const validCredentials = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { email: 'user@example.com', password: 'user123', role: 'user', name: 'Regular User' },
  { email: 'seller@example.com', password: 'seller123', role: 'seller', name: 'Seller Account' },
];

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, supabaseClient } = useSessionContext();
  const [user, setUser] = useState<User | null>(null);

  // Effect to update user when session changes
  useEffect(() => {
    const updateUser = async () => {
      if (session?.user) {
        // Fetch additional user metadata from Supabase
        const userData: User = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          role: session.user.user_metadata?.role || 'user'
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    updateUser();
  }, [session]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      if (!supabaseClient) {
        // For development without Supabase, use actual credentials
        console.log("Development mode: attempting login with provided credentials");
        
        // Find matching credentials
        const matchedUser = validCredentials.find(
          (cred) => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
        );
        
        if (matchedUser) {
          // Create a user object from valid credentials
          const userData: User = {
            id: `dev-${Date.now()}`,
            name: matchedUser.name,
            email: matchedUser.email,
            role: matchedUser.role,
          };
          
          setUser(userData);
          return { error: null };
        } else {
          return { error: { message: "Invalid email or password" } };
        }
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

  // Logout function
  const logout = async () => {
    try {
      if (supabaseClient) {
        await supabaseClient.auth.signOut();
      }
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Provide the context value
  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isAuthenticated: !!user, // Using user instead of session to work in dev mode
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
