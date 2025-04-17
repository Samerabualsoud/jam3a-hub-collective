
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/admin/Dashboard";
import ProductsManager from "@/components/admin/ProductsManager";
import UsersManager from "@/components/admin/UsersManager";
import OrdersManager from "@/components/admin/OrdersManager";
import Settings from "@/components/admin/Settings";
import ContentManager from "@/components/admin/ContentManager";
import AnalyticsIntegration from "@/components/admin/AnalyticsIntegration";
import PaymentIntegration from "@/components/admin/PaymentIntegration";
import EmailManager from "@/components/admin/EmailManager";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    // Check if user is authenticated but not an admin
    if (isAuthenticated && user && !isAdmin) {
      setShowAdminLogin(true);
    }
  }, [isAuthenticated, user, isAdmin]);

  const handleAdminLogin = () => {
    // In a real application, this would be a server-side check
    // For demo purposes, we're using a simple password check
    if (adminPassword === "admin123") {
      // Update the user object to include admin privileges
      if (user && supabaseClient) {
        // Ideally, we would update the user's role in Supabase here
        toast({
          title: "Admin Access Granted",
          description: "You now have access to the admin panel.",
        });
        setShowAdminLogin(false);
      }
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect admin password.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>You need to be logged in to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/login")} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showAdminLogin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Admin Verification</CardTitle>
            <CardDescription>Enter the admin password to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Admin Password</Label>
              <Input 
                id="admin-password" 
                type="password" 
                placeholder="Enter admin password" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleAdminLogin} className="w-full">
              Verify Admin Access
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button onClick={() => navigate("/")} variant="outline">
          Back to Website
        </Button>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="products">
          <ProductsManager />
        </TabsContent>
        <TabsContent value="users">
          <UsersManager />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersManager />
        </TabsContent>
        <TabsContent value="content">
          <ContentManager />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentIntegration />
        </TabsContent>
        <TabsContent value="emails">
          <EmailManager />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsIntegration />
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
