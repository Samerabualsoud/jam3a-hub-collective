
import { supabase } from '@/integrations/supabase/client';

// Base API class for common functionality
export class BaseApi {
  protected supabase = supabase;
  
  protected ensureStringId(id: string | number): string {
    return id.toString();
  }
}
