
import { BaseApi } from '../BaseApi';

export class ProductsApi extends BaseApi {
  async getProductsByCategorySlug(slug: string) {
    try {
      console.log(`Fetching products for category slug: ${slug}`);
      
      const { data: categoryData, error: categoryError } = await this.supabase
        .from('product_categories')
        .select('id')
        .eq('slug', slug)
        .single();
        
      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        throw new Error(`Category not found: ${slug}`);
      }
      
      if (!categoryData) {
        console.log('No category found for slug:', slug);
        return [];
      }
      
      const { data: products, error: productsError } = await this.supabase
        .from('products_catalog')
        .select(`
          *,
          discounts:product_discounts(*)
        `)
        .eq('category_id', categoryData.id);
        
      if (productsError) {
        console.error('Error fetching products:', productsError);
        throw productsError;
      }
      
      return products.map(product => {
        const discounts = product.discounts?.map(d => ({
          minCount: d.min_count,
          price: d.price,
          savings: d.savings
        })) || [];
        
        return {
          ...product,
          discounts
        };
      });
    } catch (error) {
      console.error('Error in getProductsByCategorySlug:', error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const { data, error } = await this.supabase
        .from('products_catalog')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  }

  async createProduct(productData: any) {
    try {
      const { data, error } = await this.supabase
        .from('products_catalog')
        .insert([{
          name: productData.name,
          category_id: productData.categoryId,
          price: productData.price,
          description: productData.description,
          image_url: productData.imageUrl,
        }])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in createProduct:', error);
      throw error;
    }
  }

  async updateProduct(id: string | number, productData: any) {
    try {
      const { data, error } = await this.supabase
        .from('products_catalog')
        .update(productData)
        .eq('id', this.ensureStringId(id))
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  }

  async deleteProduct(id: string | number) {
    try {
      const { error } = await this.supabase
        .from('products_catalog')
        .delete()
        .eq('id', this.ensureStringId(id));
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  }

  async createMultipleProducts(products: any[]) {
    try {
      const { data, error } = await this.supabase
        .from('products_catalog')
        .insert(products)
        .select();
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in createMultipleProducts:', error);
      throw error;
    }
  }
}
