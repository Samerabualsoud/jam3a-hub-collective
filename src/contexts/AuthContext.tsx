import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  isSeller?: boolean;
  roles?: string[];
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: boolean;
  isSeller: boolean;
  hasRole: (role: string) => boolean;
  updateUser: (userData: Partial<User>) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isAdmin: false,
  isSeller: false,
  hasRole: () => false,
  updateUser: () => {},
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
  const isSeller = user?.isSeller || false;

  // Check if user has a specific role
  const hasRole = (role: string): boolean => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  // Update user data partially
  const updateUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...userData
    };
    
    setUser(updatedUser);
  };

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
    // Ensure roles array exists
    const userWithRoles = {
      ...userData,
      roles: userData.roles || []
    };
    
    // Add role based on properties
    if (userData.isAdmin && !userWithRoles.roles.includes('admin')) {
      userWithRoles.roles.push('admin');
    }
    
    if (userData.isSeller && !userWithRoles.roles.includes('seller')) {
      userWithRoles.roles.push('seller');
    }
    
    setUser(userWithRoles);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Provide the context value
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      isAdmin, 
      isSeller, 
      hasRole, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);
