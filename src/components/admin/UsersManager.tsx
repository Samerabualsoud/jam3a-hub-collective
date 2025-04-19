
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
        
        // Default empty arrays for handling errors
        let profilesData: any[] = [];
        let profilesError = null;

        if (isAdmin) {
          console.log("Attempting to fetch profiles as admin");
          
          try {
            // First attempt: Use RPC function if available
            const rpcResult = await supabase.rpc('get_profiles_for_admin');
            
            if (rpcResult.error) {
              console.error("RPC function error:", rpcResult.error);
              
              // Second attempt: Direct query if RPC fails
              console.log("Falling back to direct query");
              const queryResult = await supabase.from('profiles').select('*');
              
              if (queryResult.error) {
                throw queryResult.error;
              }
              
              profilesData = queryResult.data || [];
            } else {
              profilesData = rpcResult.data || [];
              console.log("RPC function succeeded, returned", profilesData.length, "profiles");
            }
          } catch (error) {
            console.error("Failed to fetch profiles:", error);
            profilesError = error;
          }
        } else {
          // Non-admin users can only see their own profile
          console.log("Fetching only current user's profile (non-admin)");
          if (currentUser?.id) {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentUser.id)
              .single();
              
            if (error) {
              console.error("Error fetching own profile:", error);
              profilesError = error;
            } else {
              profilesData = data ? [data] : [];
            }
          }
        }

        if (profilesError) {
          console.error("Error occurred while fetching profiles:", profilesError);
          toast({
            title: "Error fetching users",
            description: profilesError.message || "Failed to load user profiles",
            variant: "destructive",
          });
          return [];
        }
        
        console.log("Profiles fetched:", profilesData?.length || 0);
        
        // Process profile data to ensure consistent structure
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
        
        return processedData;
      } catch (error) {
        console.error("Unexpected error in profile fetch:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching user data",
          variant: "destructive",
        });
        return [];
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 30000, // 30 seconds before considering data stale
    enabled: !!currentUser // Only run query if user is logged in
  });

  // Force a refresh when component mounts or user logs in
  useEffect(() => {
    if (currentUser) {
      console.log("Initial profiles fetch triggered");
      refetch();
    }
  }, [currentUser, refetch]);

  // Additional logging for empty users
  useEffect(() => {
    if (users.length === 0 && !isLoading && !error) {
      console.warn("No users found after fetch completed");
    } else if (users.length > 0) {
      console.log(`Successfully loaded ${users.length} users`);
    }
  }, [users, isLoading, error]);

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
