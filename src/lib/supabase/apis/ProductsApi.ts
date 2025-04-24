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
        return this.getFallbackProducts(slug);
      }
      
      console.log('Found category ID:', categoryData.id);
      
      const { data: products, error: productsError } = await this.supabase
        .from('products_catalog')
        .select(`
          *,
          discounts:product_discounts(*)
        `)
        .eq('category_id', categoryData.id);
        
      if (productsError) {
        console.error('Error fetching products:', productsError);
        return this.getFallbackProducts(slug);
      }
      
      console.log('Raw products data:', products);
      
      // If no products found, return fallback products
      if (!products || products.length === 0) {
        console.log('No products found for category ID:', categoryData.id);
        return this.getFallbackProducts(slug);
      }
      
      // Normalize the product data structure
      return products.map(product => {
        let discounts = [];
        
        if (product.discounts && product.discounts.length > 0) {
          discounts = product.discounts.map(d => ({
            minCount: d.min_count,
            price: d.price,
            savings: d.savings
          }));
        } else {
          // Create default discounts if none exist
          const price = product.price;
          discounts = [
            { minCount: 3, price: Math.round(price * 0.95), savings: "5%" },
            { minCount: 5, price: Math.round(price * 0.9), savings: "10%" },
            { minCount: 8, price: Math.round(price * 0.85), savings: "15%" }
          ];
        }
        
        return {
          id: product.id,
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          category_id: product.category_id,
          discounts: discounts
        };
      });
    } catch (error) {
      console.error('Error in getProductsByCategorySlug:', error);
      return this.getFallbackProducts(slug);
    }
  }

  private getFallbackProducts(categorySlug: string) {
    console.log(`Generating fallback products for category: ${categorySlug}`);
    
    return [
      {
        id: `fallback-1-${categorySlug}`,
        name: `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Product 1`,
        image_url: `https://placehold.co/600x400?text=${categorySlug}+Product+1`,
        price: 1599,
        category_id: categorySlug,
        discounts: [
          { minCount: 3, price: 1499, savings: "6%" },
          { minCount: 5, price: 1399, savings: "12%" }
        ]
      },
      {
        id: `fallback-2-${categorySlug}`,
        name: `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Product 2`,
        image_url: `https://placehold.co/600x400?text=${categorySlug}+Product+2`,
        price: 2599,
        category_id: categorySlug,
        discounts: [
          { minCount: 3, price: 2399, savings: "8%" },
          { minCount: 5, price: 2299, savings: "12%" }
        ]
      }
    ];
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
      // Generate a slug from the product name
      const slug = productData.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      const { data, error } = await this.supabase
        .from('products_catalog')
        .insert([{
          name: productData.name,
          category_id: productData.categoryId,
          price: productData.price,
          description: productData.description,
          image_url: productData.imageUrl,
          slug: slug // Add the required slug field
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
      // If name is being updated, regenerate the slug
      let updateData = { ...productData };
      
      if (productData.name) {
        updateData.slug = productData.name
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
      }
      
      const { data, error } = await this.supabase
        .from('products_catalog')
        .update(updateData)
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
      // Add slug for each product being inserted
      const productsWithSlug = products.map(product => ({
        ...product,
        slug: product.name
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-')
      }));
      
      const { data, error } = await this.supabase
        .from('products_catalog')
        .insert(productsWithSlug)
        .select();
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in createMultipleProducts:', error);
      throw error;
    }
  }
}
