
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus, Search, Tag, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "./ProductForm";
import DealForm from "./DealForm";

const ProductsManager = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingDeal, setEditingDeal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  
  // Mock product data
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: 999, stock: 50 },
    { id: 2, name: "Samsung Galaxy S23", category: "Electronics", price: 899, stock: 30 },
    { id: 3, name: "MacBook Pro", category: "Computers", price: 1999, stock: 20 },
    { id: 4, name: "AirPods Pro", category: "Audio", price: 249, stock: 100 },
    { id: 5, name: "iPad Pro", category: "Tablets", price: 799, stock: 35 },
  ]);

  // Mock deals data
  const [deals, setDeals] = useState([
    { id: 1, name: "Summer Sale", discount: 20, productId: 1, startDate: "2025-06-01", endDate: "2025-06-30", active: true },
    { id: 2, name: "Back to School", discount: 15, productId: 3, startDate: "2025-08-01", endDate: "2025-08-31", active: true },
    { id: 3, name: "Holiday Special", discount: 25, productId: 2, startDate: "2025-12-01", endDate: "2025-12-25", active: false },
  ]);

  const handleAddProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddDeal = (deal) => {
    setDeals([...deals, { ...deal, id: deals.length + 1 }]);
    setIsAddingDeal(false);
  };

  const handleUpdateDeal = (updatedDeal) => {
    setDeals(deals.map((d) => (d.id === updatedDeal.id ? updatedDeal : d)));
    setEditingDeal(null);
  };

  const handleDeleteDeal = (id) => {
    setDeals(deals.filter((d) => d.id !== id));
  };

  const toggleDealStatus = (id) => {
    setDeals(
      deals.map((deal) =>
        deal.id === id ? { ...deal, active: !deal.active } : deal
      )
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDeals = deals.filter((deal) =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
          </TabsList>
          <Button 
            onClick={() => activeTab === "products" ? setIsAddingProduct(true) : setIsAddingDeal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add {activeTab === "products" ? "Product" : "Deal"}
          </Button>
        </div>

        <TabsContent value="products">
          {(isAddingProduct || editingProduct) ? (
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
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
                              onClick={() => toggleDealStatus(deal.id)}
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
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsManager;
