
import { supabase } from './client';

// Base API class for common functionality
export class BaseApi {
  protected supabase = supabase;
  
  protected ensureStringId(id: string | number): string {
    return id.toString();
  }
}
