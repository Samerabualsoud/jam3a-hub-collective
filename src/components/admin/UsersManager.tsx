
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
  const [manualRefreshCount, setManualRefreshCount] = useState(0); // Add counter for manual refreshes

  // Fixed query to directly access the profiles table with better debug information
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
        
        // Query using FROM directly instead of from() method - this is to fix an issue with the query
        const { data, error } = await supabase
          .rpc('get_profiles_for_admin')
          .then(result => {
            if (result.error) {
              throw result.error;
            }
            return { data: result.data, error: null };
          })
          .catch(error => {
            console.error("RPC error:", error);
            // Fallback to direct query if RPC fails
            return supabase
              .from('profiles')
              .select('*');
          });

        if (error) {
          console.error("Supabase error:", error);
          toast({
            title: "Error fetching users",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }
        
        console.log("Profiles fetched:", data?.length || 0);
        console.log("Raw profiles data:", data); // Log the entire data for debugging
        
        // Ensure data has correct structure and default values
        const processedData = (data || []).map(user => ({
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
