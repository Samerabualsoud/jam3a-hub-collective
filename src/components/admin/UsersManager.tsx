
import React, { useState, useEffect } from "react";
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
import { Pencil, Trash2, Search, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

const UsersManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();
  const { supabaseClient } = useSessionContext();
  
  // Use React Query to fetch real users from Supabase
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data: authUsers, error: authError } = await supabaseClient
        .from('auth.users')
        .select('*');

      if (authError) {
        console.error("Error fetching users:", authError);
        throw authError;
      }

      // Try to get user profiles from the profiles table if it exists
      const { data: profiles, error: profilesError } = await supabaseClient
        .from('profiles')
        .select('*');

      // Map the auth users to the format we need
      return (authUsers || []).map(user => {
        // Find matching profile if it exists
        const profile = profiles?.find(p => p.id === user.id);
        
        return {
          id: user.id,
          name: profile?.first_name && profile?.last_name 
            ? `${profile.first_name} ${profile.last_name}` 
            : user.email?.split('@')[0] || 'Unknown',
          email: user.email || 'No email',
          role: profile?.role || 'Customer',
          status: user.confirmed_at ? 'Active' : 'Inactive',
          joined: new Date(user.created_at).toISOString().split('T')[0]
        };
      });
    }
  });

  const handleDeleteUser = async (id: string) => {
    try {
      // In production, we would use admin functions to delete users
      // For now, we'll simulate the deletion
      toast({
        title: "Operation requires admin credentials",
        description: "User deletion requires admin API keys which should only be done from secure backend functions.",
      });
      
      // Refresh the user list after deletion
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

  const toggleUserStatus = async (id: string) => {
    try {
      // In a real app, this would call a secure API endpoint
      toast({
        title: "Status update simulation",
        description: "User status would be updated in a real implementation",
      });
      
      // Refresh the user list after status change
      refetch();
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
    ) : (
      <Badge variant="secondary">{status}</Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-500 hover:bg-purple-600">{role}</Badge>;
      case "Seller":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{role}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Error loading users: {error instanceof Error ? error.message : 'Unknown error'}</p>
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
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleUserStatus(user.id)}
                          title={user.status === "Active" ? "Deactivate user" : "Activate user"}
                        >
                          {user.status === "Active" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setEditingUser(user)}>
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
