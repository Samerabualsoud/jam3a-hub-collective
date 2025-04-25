
import { Session } from '@supabase/supabase-js';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user' | 'seller' | string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
}
