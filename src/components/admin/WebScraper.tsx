
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for products from Extra.com (in a real-world scenario, this would come from actual web scraping)
const mockMobilePhones = [
  {
    name: "iPhone 15 Pro Max",
    category: "Mobile Phones",
    price: 4099,
    stock: 25,
    description: "iPhone 15 Pro Max with A17 Pro chip, 48MP camera system, and titanium design.",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484429f8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    category: "Mobile Phones",
    price: 4499,
    stock: 18,
    description: "Galaxy S24 Ultra with 200MP camera, Snapdragon 8 Gen 3 processor, and S Pen support.",
    imageUrl: "https://images.unsplash.com/photo-1707480859597-de3c48a63734?q=80&w=1535&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Google Pixel 8 Pro",
    category: "Mobile Phones",
    price: 3399,
    stock: 12,
    description: "Pixel 8 Pro with Tensor G3, 50MP main camera, and 7-year software updates.",
    imageUrl: "https://images.unsplash.com/photo-1696498384934-a9dd9f981696?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Xiaomi 14 Ultra",
    category: "Mobile Phones",
    price: 2999,
    stock: 20,
    description: "Xiaomi 14 Ultra with Snapdragon 8 Gen 3, Leica optics, and 1-inch main sensor.",
    imageUrl: "https://images.unsplash.com/photo-1705412810326-df4ba7d991ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const mockElectronics = [
  {
    name: "Sony WH-1000XM5",
    category: "Electronics",
    price: 1349,
    stock: 30,
    description: "Sony WH-1000XM5 wireless headphones with industry-leading noise cancellation.",
    imageUrl: "https://images.unsplash.com/photo-1627214342306-25204f721f46?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Apple iPad Air 5",
    category: "Electronics",
    price: 2299,
    stock: 15,
    description: "iPad Air with M1 chip, 10.9-inch Liquid Retina display, and all-day battery life.",
    imageUrl: "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "DJI Mini 3 Pro",
    category: "Electronics",
    price: 2859,
    stock: 8,
    description: "DJI Mini 3 Pro drone with 4K/60fps video, 48MP photos, and 34-minute flight time.",
    imageUrl: "https://images.unsplash.com/photo-1601907543655-76d32152165e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Apple Watch Series 9",
    category: "Electronics",
    price: 1499,
    stock: 22,
    description: "Apple Watch Series 9 with Always-On Retina display, S9 chip, and temperature sensing.",
    imageUrl: "https://images.unsplash.com/photo-1696575345339-a4e39212a3fc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

interface WebScraperProps {
  onImportProducts: (products: any[]) => void;
}

const WebScraper: React.FC<WebScraperProps> = ({ onImportProducts }) => {
  const [activeTab, setActiveTab] = useState<string>("mobile");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleImport = () => {
    setLoading(true);
    
    // Get current products based on active tab
    const productsData = activeTab === "mobile" ? mockMobilePhones : mockElectronics;
    
    // Filter only selected products
    const productsToImport = productsData.filter(product => 
      selectedProducts[product.name]
    );

    // Simulate API delay
    setTimeout(() => {
      if (productsToImport.length > 0) {
        try {
          onImportProducts(productsToImport);
          toast({
            title: "Products imported",
            description: `Successfully imported ${productsToImport.length} products.`,
          });
          // Reset selected products
          setSelectedProducts({});
        } catch (error) {
          console.error('Error during import:', error);
          toast({
            title: "Import failed",
            description: error instanceof Error ? error.message : "Failed to import products. Supabase client may not be initialized properly.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "No products selected",
          description: "Please select at least one product to import.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  const toggleProductSelection = (productName: string) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productName]: !prev[productName]
    }));
  };

  const filteredMobiles = mockMobilePhones.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredElectronics = mockElectronics.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = Object.values(selectedProducts).filter(Boolean).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Products from Extra.com</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mobile">Mobile Phones</TabsTrigger>
            <TabsTrigger value="electronics">Electronics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mobile" className="space-y-4 mt-4">
            {filteredMobiles.map((product) => (
              <div 
                key={product.name}
                className={`p-4 border rounded-md flex items-center gap-4 cursor-pointer ${
                  selectedProducts[product.name] ? 'bg-muted' : ''
                }`}
                onClick={() => toggleProductSelection(product.name)}
              >
                <input
                  type="checkbox"
                  checked={!!selectedProducts[product.name]}
                  onChange={() => toggleProductSelection(product.name)}
                  className="h-5 w-5"
                />
                <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="text-sm text-muted-foreground">{product.price} SAR</div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="electronics" className="space-y-4 mt-4">
            {filteredElectronics.map((product) => (
              <div 
                key={product.name}
                className={`p-4 border rounded-md flex items-center gap-4 cursor-pointer ${
                  selectedProducts[product.name] ? 'bg-muted' : ''
                }`}
                onClick={() => toggleProductSelection(product.name)}
              >
                <input
                  type="checkbox"
                  checked={!!selectedProducts[product.name]}
                  onChange={() => toggleProductSelection(product.name)}
                  className="h-5 w-5"
                />
                <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="text-sm text-muted-foreground">{product.price} SAR</div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4">
          <div className="text-sm">
            {selectedCount} {selectedCount === 1 ? 'product' : 'products'} selected
          </div>
          <Button 
            onClick={handleImport} 
            disabled={loading || selectedCount === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Import Selected
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebScraper;
