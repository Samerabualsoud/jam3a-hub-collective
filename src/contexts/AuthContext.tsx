import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
});

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize state from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('jam3a_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin || false;

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('jam3a_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jam3a_user');
    }
  }, [user]);

  // Login function
  const login = (userData: User) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Provide the context value
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);
