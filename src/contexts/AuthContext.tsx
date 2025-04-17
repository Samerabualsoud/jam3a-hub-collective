
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
  login: (session: Session) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session } = useSessionContext();
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

  // Login function (handled by Supabase)
  const login = (session: Session) => {
    // This is now mostly handled by Supabase
  };

  // Logout function
  const logout = () => {
    // This will be handled by Supabase
  };

  // Provide the context value
  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isAuthenticated: !!session, 
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
