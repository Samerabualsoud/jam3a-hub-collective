
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, RefreshCcw, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SearchBar from "./users/SearchBar";
import UsersTable from "./users/UsersTable";
import { Profile } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

const UsersManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { user: currentUser, isAdmin } = useAuth();
  const [manualRefreshCount, setManualRefreshCount] = useState(0);

  // Enhanced logging function
  const logDebug = (message: string, data?: any) => {
    console.log(`[Users Manager] ${message}`, data || '');
  };

  const { 
    data: users = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['profiles', manualRefreshCount], 
    queryFn: async () => {
      logDebug("Starting profiles fetch");
      logDebug("Current user:", currentUser);
      logDebug("Is admin:", isAdmin);
      
      try {
        // Check if Supabase is initialized
        if (!supabase) {
          throw new Error("Supabase client is not initialized");
        }

        // Use the get_profiles_for_admin function
        const { data, error } = await supabase
          .rpc('get_profiles_for_admin');

        if (error) {
          logDebug("Error from get_profiles_for_admin:", error);

          // Fallback to direct query if RPC fails
          const { data: fallbackData, error: fallbackError } = await supabase
            .from('profiles')
            .select('*');
          
          if (fallbackError) {
            throw fallbackError;
          }
          
          logDebug("Fallback query succeeded, returning profiles:", fallbackData);
          return (fallbackData || []).map(processProfileData);
        }

        const profilesData = data || [];
        logDebug(`Successfully fetched ${profilesData.length} profiles`, profilesData);

        // Process profile data to ensure consistent structure
        return profilesData.map(processProfileData);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
        toast({
          title: "Error fetching users",
          description: "There was an issue loading the user data. Please try again later.",
          variant: "destructive",
        });
        return [];
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 5000,
    enabled: !!currentUser
  });

  // Process profile data to ensure consistent structure
  const processProfileData = (user: any): Profile => ({
    id: user.id || '',
    role: user.role || 'user',
    status: user.status || 'active',
    first_name: user.first_name || 'Unknown',
    last_name: user.last_name || '',
    email: user.email || 'No email',
    created_at: user.created_at || new Date().toISOString()
  });

  // Force an immediate refresh when the component mounts
  useEffect(() => {
    if (currentUser) {
      logDebug("Initial profiles fetch triggered on mount");
      refetch();
    }
  }, [currentUser, refetch]);

  // Additional logging for empty users
  useEffect(() => {
    if (users.length === 0 && !isLoading && !error) {
      logDebug("No users found after fetch completed - This might indicate a permission issue");
    } else if (users.length > 0) {
      logDebug(`Successfully loaded ${users.length} users`);
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
    logDebug("Manual refresh triggered");
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

      {!supabase && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Supabase is not properly configured. Some features may not work correctly.
          </AlertDescription>
        </Alert>
      )}

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <UsersTable
        users={filteredUsers}
        isLoading={isLoading}
        error={error instanceof Error ? error : null}
        onRefresh={handleRefresh}
      />

      <div className="mt-4 text-sm text-muted-foreground">
        {isAdmin && (
          <div className="bg-muted p-3 rounded-md text-sm mb-2">
            <p className="font-semibold">Admin Tips:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>If no users appear, make sure the profiles table has entries</li>
              <li>Click Refresh to reload user data</li>
              <li>Check console logs for debugging information</li>
              <li>Make sure you have admin role set in your profile</li>
            </ul>
          </div>
        )}
        {users.length > 0 ? (
          <p>Showing {filteredUsers.length} of {users.length} users</p>
        ) : (
          <p>No users found. Please check system configuration or create a new user.</p>
        )}
      </div>
    </div>
  );
};

export default UsersManager;
