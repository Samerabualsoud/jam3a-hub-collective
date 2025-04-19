
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
import { 
  Search, 
  Eye, 
  PackageCheck, 
  TruckIcon, 
  Check 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { SarIcon } from "@/components/icons/SarIcon";
import { useToast } from "@/hooks/use-toast";

const OrdersManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { supabaseClient } = useSessionContext();
  const { toast } = useToast();
  
  // Use React Query to fetch real orders from Supabase
  const { data: orders = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabaseClient
        .from('orders')
        .select('*');
      
      if (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
      
      return data || [];
    }
  });

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabaseClient
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
      
      if (error) throw error;
      
      toast({
        title: "Order updated",
        description: `Order status changed to ${newStatus}`,
      });
      
      // Refresh the orders list
      refetch();
      
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      case "Shipped":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
      case "Processing":
        return <Badge className="bg-orange-500 hover:bg-orange-600">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusActions = (order) => {
    switch (order.status) {
      case "Pending":
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => updateOrderStatus(order.id, "Processing")}
          >
            <Check className="mr-1 h-3 w-3" /> Accept
          </Button>
        );
      case "Processing":
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => updateOrderStatus(order.id, "Shipped")}
          >
            <TruckIcon className="mr-1 h-3 w-3" /> Ship
          </Button>
        );
      case "Shipped":
        return (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => updateOrderStatus(order.id, "Delivered")}
          >
            <PackageCheck className="mr-1 h-3 w-3" /> Deliver
          </Button>
        );
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      (order.id && order.id.toString().includes(searchTerm)) ||
      (order.customer_name && order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.status && order.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">
            Error loading orders: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <p className="mt-2">
            Make sure you have created an 'orders' table in your Supabase database.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders Management</h2>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-6 flex justify-center">
            <p>Loading orders...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer_name || 'Unknown'}</TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items_count || '—'}</TableCell>
                      <TableCell className="flex items-center">
                        <SarIcon className="h-4 w-4 mr-1" />
                        {order.total_amount ? order.total_amount.toFixed(2) : '0.00'}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status || 'Unknown')}</TableCell>
                      <TableCell className="flex justify-end items-center gap-2">
                        {getStatusActions(order)}
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      {searchTerm ? 'No orders found matching your search.' : 'No orders found in the database.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersManager;
