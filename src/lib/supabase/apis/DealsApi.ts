
import { BaseApi } from '../BaseApi';

export class DealsApi extends BaseApi {
  async getDeals() {
    try {
      const { data, error } = await this.supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in getDeals:', error);
      throw error;
    }
  }

  async createDeal(dealData: any) {
    try {
      const { data, error } = await this.supabase
        .from('deals')
        .insert([dealData])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in createDeal:', error);
      throw error;
    }
  }

  async updateDeal(id: string | number, dealData: any) {
    try {
      const { data, error } = await this.supabase
        .from('deals')
        .update(dealData)
        .eq('id', this.ensureStringId(id))
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in updateDeal:', error);
      throw error;
    }
  }

  async deleteDeal(id: string | number) {
    try {
      const { error } = await this.supabase
        .from('deals')
        .delete()
        .eq('id', this.ensureStringId(id));
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error in deleteDeal:', error);
      throw error;
    }
  }
}
