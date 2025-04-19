
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
import { Pencil, Trash2, Search, UserPlus, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";

// Helper function to ensure the role type is valid
const normalizeRole = (role: string | null): 'admin' | 'user' | 'seller' => {
  if (role === 'admin' || role === 'seller') {
    return role;
  }
  return 'user'; // Default to user if undefined or unrecognized
};

// Helper function to ensure status type is valid
const normalizeStatus = (status: string | null): 'active' | 'inactive' | 'suspended' => {
  if (status === 'inactive' || status === 'suspended') {
    return status;
  }
  return 'active'; // Default to active if undefined or unrecognized
};

// Mock data for when database tables don't exist
const mockUsers = [
  { 
    id: "abc123", 
    first_name: "John",
    last_name: "Smith",
    email: "john@example.com", 
    role: "admin", 
    status: "active", 
    created_at: "2023-01-15T00:00:00Z" 
  },
  { 
    id: "def456", 
    first_name: "Jane",
    last_name: "Doe",
    email: "jane@example.com", 
    role: "user", 
    status: "active", 
    created_at: "2023-02-20T00:00:00Z" 
  },
  { 
    id: "ghi789", 
    first_name: "Robert",
    last_name: "Johnson",
    email: "robert@example.com", 
    role: "seller", 
    status: "active", 
    created_at: "2023-03-10T00:00:00Z" 
  },
  { 
    id: "jkl012", 
    first_name: "Emily",
    last_name: "Brown",
    email: "emily@example.com", 
    role: "user", 
    status: "inactive", 
    created_at: "2023-04-05T00:00:00Z" 
  }
];

const UsersManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const { toast } = useToast();
  
  // Use React Query to fetch users
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      try {
        // Try to fetch users from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching profiles:", error);
          throw error;
        }
        
        return data?.map(user => ({
          ...user,
          role: normalizeRole(user.role),
          status: normalizeStatus(user.status)
        })) || mockUsers;
      } catch (error) {
        console.error("Error fetching users:", error);
        // In case of error, return mock data
        return mockUsers;
      }
    }
  });

  const handleDeleteUser = async (id: string) => {
    try {
      // In production, we would use admin functions to delete users
      // For now, show a message explaining why this isn't implemented
      toast({
        title: "Operation requires admin credentials",
        description: "User deletion requires admin API keys which should only be done from secure backend functions.",
      });
      
      // Refresh the user list
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const toggleUserStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Status updated",
        description: `User status has been set to ${newStatus}`,
      });
      
      // Refresh the user list
      refetch();
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status. This may require admin privileges.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Admin</Badge>;
      case "seller":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Seller</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  const getDisplayName = (user: any) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    } else {
      return user.email?.split('@')[0] || 'Unknown';
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.role && user.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Error loading users: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <p className="mt-2">
            Make sure you have created a 'profiles' table in your Supabase database with the correct structure.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <Button onClick={() => setIsAddingUser(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Search users..."
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
            <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
            <p>Loading users...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-xs">{user.id.substring(0, 8)}...</TableCell>
                      <TableCell>{getDisplayName(user)}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          title={user.status === "active" ? "Deactivate user" : "Activate user"}
                        >
                          {user.status === "active" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setEditingUser({...user})}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      {searchTerm ? 'No users found matching your search.' : 'No users found in the database.'}
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

export default UsersManager;
