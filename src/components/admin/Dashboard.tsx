
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  ShoppingCart, 
  Package,  
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { SarIcon } from "@/components/icons/SarIcon";
import { useSupabaseApi } from "@/lib/supabase/api";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types/admin";

// Mock data for dashboard when database tables don't exist
const mockOrders: Order[] = [
  { 
    id: 1, 
    customer_name: "John Doe", 
    customer_email: "john@example.com", 
    total_amount: 299.99, 
    status: "Delivered", 
    created_at: new Date().toISOString(),
    items_count: 2
  },
  { 
    id: 2, 
    customer_name: "Jane Smith", 
    customer_email: "jane@example.com", 
    total_amount: 149.50, 
    status: "Processing", 
    created_at: new Date().toISOString(),
    items_count: 1
  },
];

const Dashboard = () => {
  const api = useSupabaseApi();

  // Fetch products data
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: api.getProducts,
  });

  // Fetch orders data with mock data fallback
  const { data: ordersData = mockOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      try {
        // Only attempt to fetch from Supabase if mockOrders is not being used
        if (api.hasSupabaseConfig) {
          // Return mock data for now - in production this would fetch from the database
          return mockOrders;
        }
        return mockOrders;
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        return mockOrders;
      }
    }
  });

  // Calculate total revenue from orders
  const totalRevenue = ordersData.reduce((sum, order) => sum + (order.total_amount || 0), 0);

  // Prepare stats data based on real data
  const stats = [
    {
      title: "Total Revenue",
      value: `${totalRevenue.toFixed(2)} SAR`,
      icon: <SarIcon className="h-8 w-8 text-muted-foreground" />,
      change: "",
      trend: <TrendingUp className="h-4 w-4 text-green-500" />
    },
    {
      title: "Active Users",
      value: "Loading...",
      icon: <Users className="h-8 w-8 text-muted-foreground" />,
      change: "",
      trend: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
    {
      title: "Orders",
      value: ordersData?.length.toString() || "0",
      icon: <ShoppingCart className="h-8 w-8 text-muted-foreground" />,
      change: "",
      trend: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
    {
      title: "Products",
      value: productsData?.length.toString() || "0",
      icon: <Package className="h-8 w-8 text-muted-foreground" />,
      change: "",
      trend: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
  ];

  const isLoading = productsLoading || ordersLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex justify-center p-6">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                {stat.trend}
                <span className="ml-1">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ordersData && ordersData.length > 0 ? (
                ordersData.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        ${order.total_amount}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No orders found</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productsData && productsData.length > 0 ? (
                productsData.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md overflow-hidden">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-muted flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No products found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
