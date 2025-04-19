
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SearchBar from "./users/SearchBar";
import UsersTable from "./users/UsersTable";
import { Profile } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

const UsersManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Updated query to fetch profiles with better error handling and debugging
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      try {
        console.log("Fetching profiles from Supabase...");
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*');
          
        if (error) {
          console.error("Supabase error:", error);
          toast({
            title: "Error fetching users",
            description: error.message,
            variant: "destructive",
          });
          throw error;
        }
        
        console.log("Profiles fetched:", data);
        
        if (!data || data.length === 0) {
          console.log("No profiles found in the database");
        }
        
        // Map the data to ensure consistent structure
        return (data || []).map(user => ({
          ...user,
          role: user.role || 'user',
          status: user.status || 'active'
        }));
      } catch (error) {
        console.error("Error fetching profiles:", error);
        return [];
      }
    },
    refetchOnWindowFocus: false
  });

  const filteredUsers = users.filter(
    (user) =>
      (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
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
    </div>
  );
};

export default UsersManager;
