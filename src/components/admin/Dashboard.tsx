
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package, 
  TrendingUp,
  ArrowUpRight,
  AlertTriangle
} from "lucide-react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Dashboard = () => {
  const { supabaseClient } = useSessionContext();
  const hasSupabaseConfig = supabaseClient?.auth && 
    window.location.hostname !== "localhost" && 
    window.location.hostname !== "127.0.0.1";

  // Mock data for the dashboard when Supabase is not configured
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      icon: <DollarSign className="h-8 w-8 text-muted-foreground" />,
      change: "+12%",
      trend: <TrendingUp className="h-4 w-4 text-green-500" />
    },
    {
      title: "Active Users",
      value: "2,345",
      icon: <Users className="h-8 w-8 text-muted-foreground" />,
      change: "+5%",
      trend: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
    {
      title: "New Orders",
      value: "123",
      icon: <ShoppingCart className="h-8 w-8 text-muted-foreground" />,
      change: "+8%",
      trend: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
    {
      title: "Products",
      value: "456",
      icon: <Package className="h-8 w-8 text-muted-foreground" />,
      change: "+3%",
      trend: <ArrowUpRight className="h-4 w-4 text-green-500" />
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      
      {!hasSupabaseConfig && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Demo Mode</AlertTitle>
          <AlertDescription>
            You are currently viewing demo data. Connect to Supabase to see real data.
          </AlertDescription>
        </Alert>
      )}
      
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
                <span className="ml-1">{stat.change} from last month</span>
              </div>
              {!hasSupabaseConfig && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Demo data
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!hasSupabaseConfig ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">User #{i} placed an order</p>
                      <p className="text-xs text-muted-foreground">{i * 10} minutes ago</p>
                      <p className="text-xs text-muted-foreground">(Demo data)</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-40">
                  <p className="text-muted-foreground">Loading real data...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!hasSupabaseConfig ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Today</div>
                      <div className="font-medium">$345</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "45%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">(Demo data)</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">This Week</div>
                      <div className="font-medium">$1,345</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "65%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">(Demo data)</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">This Month</div>
                      <div className="font-medium">$5,345</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground">(Demo data)</div>
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center h-40">
                  <p className="text-muted-foreground">Loading real data...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
