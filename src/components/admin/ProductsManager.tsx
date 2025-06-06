
import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus, Search, Import } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "./ProductForm";
import DealForm from "./DealForm";
import WebScraper from "./WebScraper";
import { useSupabaseApi } from "@/lib/supabase/api";
import { useToast } from "@/hooks/use-toast";

const ProductsManager = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingDeal, setEditingDeal] = useState(null);
  const [showWebScraper, setShowWebScraper] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  
  const api = useSupabaseApi();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsData, dealsData] = await Promise.all([
        api.products.getProducts(),
        api.deals.getDeals(),
      ]);
      setProducts(productsData);
      setDeals(dealsData);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err.message || "Failed to load data");
      toast({
        title: "Error loading data",
        description: err.message || "Failed to load data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      await api.products.createProduct(product);
      await loadData();
      setIsAddingProduct(false);
      toast({
        title: "Success",
        description: "Product created successfully",
      });
    } catch (error) {
      toast({
        title: "Error creating product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleImportProducts = async (products) => {
    try {
      // If extra.com is selected, fetch from the edge function
      if (Array.isArray(products) && products.length > 0 && showWebScraper) {
        const { fetchAndSaveExtraProducts } = await import('@/utils/fetchExtraProducts');
        await fetchAndSaveExtraProducts();
        await loadData();
        setShowWebScraper(false);
        toast({
          title: "Success",
          description: "Products imported live from extra.com!",
        });
        return;
      }

      // Check if we're in demo mode without Supabase
      const hasSupabaseConfig = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!hasSupabaseConfig) {
        // In demo mode, just add products to local state without using Supabase
        const newProducts = products.map((product, index) => ({
          ...product,
          id: Date.now() + index, // Generate temporary IDs
        }));
        
        setProducts(prevProducts => [...newProducts, ...prevProducts]);
        setShowWebScraper(false);
        toast({
          title: "Demo Mode",
          description: `${products.length} products were imported to local state (Supabase not configured)`,
        });
        return;
      }
      
      // If Supabase is configured, use the API
      await api.products.createMultipleProducts(products);
      await loadData();
      setShowWebScraper(false);
      toast({
        title: "Success",
        description: `${products.length} products were imported successfully`,
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Error importing products",
        description: error.message || "Supabase client is not initialized properly",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await api.products.updateProduct(updatedProduct.id, updatedProduct);
      await loadData();
      setEditingProduct(null);
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error updating product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.products.deleteProduct(id);
      await loadData();
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddDeal = async (deal) => {
    try {
      await api.deals.createDeal(deal);
      await loadData();
      setIsAddingDeal(false);
      toast({
        title: "Success",
        description: "Deal created successfully",
      });
    } catch (error) {
      toast({
        title: "Error creating deal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateDeal = async (updatedDeal) => {
    try {
      await api.deals.updateDeal(updatedDeal.id, updatedDeal);
      await loadData();
      setEditingDeal(null);
      toast({
        title: "Success",
        description: "Deal updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error updating deal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteDeal = async (id) => {
    try {
      await api.deals.deleteDeal(id);
      await loadData();
      toast({
        title: "Success",
        description: "Deal deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error deleting deal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleDealStatus = async (id, currentStatus) => {
    try {
      await api.deals.updateDeal(id, { active: !currentStatus });
      await loadData();
      toast({
        title: "Success",
        description: "Deal status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error updating deal status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredDeals = deals.filter((deal) =>
    deal.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
          <Button onClick={loadData} className="mt-4">Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {loading && (
        <Card>
          <CardContent className="flex justify-center p-6">
            <p>Loading...</p>
          </CardContent>
        </Card>
      )}
      
      {!loading && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              {activeTab === "products" && !isAddingProduct && !editingProduct && !showWebScraper && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowWebScraper(true)}
                >
                  <Import className="mr-2 h-4 w-4" />
                  Import from Extra.com
                </Button>
              )}
              <Button 
                onClick={() => activeTab === "products" ? setIsAddingProduct(true) : setIsAddingDeal(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add {activeTab === "products" ? "Product" : "Deal"}
              </Button>
            </div>
          </div>

          <TabsContent value="products">
            {showWebScraper ? (
              <WebScraper 
                onImportProducts={handleImportProducts} 
              />
            ) : (isAddingProduct || editingProduct) ? (
              <Card>
                <CardHeader>
                  <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductForm 
                    initialData={editingProduct || {}} 
                    onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                    onCancel={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                  />
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    {filteredProducts.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price (SAR)</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>{product.id}</TableCell>
                              <TableCell>
                                {product.imageUrl ? (
                                  <div className="h-10 w-10 rounded-md overflow-hidden">
                                    <img 
                                      src={product.imageUrl} 
                                      alt={product.name}
                                      className="h-full w-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                    No image
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>{product.price} SAR</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex justify-center items-center p-6">
                        <p className="text-muted-foreground">No products found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="deals">
            {(isAddingDeal || editingDeal) ? (
              <Card>
                <CardHeader>
                  <CardTitle>{editingDeal ? "Edit Deal" : "Add New Deal"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <DealForm 
                    initialData={editingDeal || {}} 
                    products={products}
                    onSubmit={editingDeal ? handleUpdateDeal : handleAddDeal}
                    onCancel={() => {
                      setIsAddingDeal(false);
                      setEditingDeal(null);
                    }}
                  />
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Search deals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    {filteredDeals.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredDeals.map((deal) => (
                            <TableRow key={deal.id}>
                              <TableCell>{deal.name}</TableCell>
                              <TableCell>
                                {products.find(p => p.id === deal.productId)?.name || 'Unknown Product'}
                              </TableCell>
                              <TableCell>{deal.discount}%</TableCell>
                              <TableCell>{deal.startDate}</TableCell>
                              <TableCell>{deal.endDate}</TableCell>
                              <TableCell>
                                <Button
                                  variant={deal.active ? "default" : "secondary"}
                                  size="sm"
                                  onClick={() => toggleDealStatus(deal.id, deal.active)}
                                >
                                  {deal.active ? "Active" : "Inactive"}
                                </Button>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingDeal(deal)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteDeal(deal.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex justify-center items-center p-6">
                        <p className="text-muted-foreground">No deals found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ProductsManager;
