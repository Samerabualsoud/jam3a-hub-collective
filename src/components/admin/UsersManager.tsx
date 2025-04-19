
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SearchBar from "./users/SearchBar";
import UsersTable from "./users/UsersTable";
import { Profile } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const UsersManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { user: currentUser, isAdmin } = useAuth();
  const [manualRefreshCount, setManualRefreshCount] = useState(0);

  const { 
    data: users = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['profiles', manualRefreshCount], 
    queryFn: async () => {
      try {
        console.log("Fetching profiles from Supabase...");
        console.log("Current user:", currentUser);
        console.log("Is admin:", isAdmin);
        
        let profilesData;
        let profilesError = null;

        // First try to use the RPC function
        if (isAdmin) {
          console.log("Attempting to fetch profiles using RPC function");
          const rpcResult = await supabase.rpc('get_profiles_for_admin');
          
          if (rpcResult.error) {
            console.error("RPC error:", rpcResult.error);
            profilesError = rpcResult.error;
          } else {
            profilesData = rpcResult.data;
            console.log("RPC function succeeded, returned", profilesData?.length || 0, "profiles");
          }
        }

        // If RPC failed or user is not admin, fall back to direct query
        if (!profilesData) {
          console.log("Falling back to direct query");
          const { data, error } = await supabase
            .from('profiles')
            .select('*');
            
          profilesData = data;
          profilesError = error;
        }

        if (profilesError) {
          console.error("Supabase error:", profilesError);
          toast({
            title: "Error fetching users",
            description: profilesError.message,
            variant: "destructive",
          });
          throw profilesError;
        }
        
        console.log("Profiles fetched:", profilesData?.length || 0);
        console.log("Raw profiles data:", profilesData); // Log the entire data for debugging
        
        // Ensure data has correct structure and default values
        const processedData = (profilesData || []).map(user => ({
          ...user,
          id: user.id || '',
          role: user.role || 'user',
          status: user.status || 'active',
          first_name: user.first_name || 'Unknown',
          last_name: user.last_name || '',
          email: user.email || 'No email',
          created_at: user.created_at || new Date().toISOString()
        }));
        
        console.log("Processed profiles data:", processedData);
        return processedData;
      } catch (error) {
        console.error("Error fetching profiles:", error);
        return [];
      }
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0, // Force refetch
    enabled: !!currentUser && !!isAdmin
  });

  // Force a refresh when component mounts or user logs in
  useEffect(() => {
    if (currentUser && isAdmin) {
      console.log("Initial profiles fetch triggered");
      refetch();
    }
  }, [currentUser, isAdmin, refetch]);

  // Additional logging for empty users
  useEffect(() => {
    if (users.length === 0 && !isLoading && !error) {
      console.warn("No users found after fetch completed");
      toast({
        title: "No Users Found",
        description: "Either no users exist or there's an issue with data retrieval.",
        variant: "default"
      });
    } else if (users.length > 0) {
      console.log(`Successfully loaded ${users.length} users`);
    }
  }, [users, isLoading, error, toast]);

  const filteredUsers = users.filter(
    (user) =>
      (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddUser = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add users directly will be available soon.",
    });
  };

  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    setManualRefreshCount(prev => prev + 1); // Increment to force a refresh
    toast({
      title: "Refreshing Users",
      description: "Fetching the latest user data...",
    });
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button onClick={handleAddUser}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <UsersTable
        users={filteredUsers}
        isLoading={isLoading}
        error={error instanceof Error ? error : null}
      />

      <div className="mt-4 text-sm text-muted-foreground">
        {users.length > 0 ? (
          <p>Showing {filteredUsers.length} of {users.length} users</p>
        ) : null}
      </div>
    </div>
  );
};

export default UsersManager;
