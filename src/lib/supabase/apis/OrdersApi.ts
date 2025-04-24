
import { BaseApi } from '../api';

export class OrdersApi extends BaseApi {
  async getOrders() {
    try {
      const { data, error } = await this.supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in getOrders:', error);
      throw error;
    }
  }
}
