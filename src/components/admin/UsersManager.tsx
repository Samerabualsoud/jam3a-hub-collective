
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

// User interface to match the type used across the app
interface User {
  id: number;
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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { supabaseClient } = useSessionContext();
  
  // Mock user data - consistent with other app data
  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      role: "Admin", 
      status: "Active", 
      joined: "2023-01-15" 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      role: "Customer", 
      status: "Active", 
      joined: "2023-02-20" 
    },
    { 
      id: 3, 
      name: "Robert Johnson", 
      email: "robert@example.com", 
      role: "Customer", 
      status: "Inactive", 
      joined: "2023-03-10" 
    },
    { 
      id: 4, 
      name: "Sarah Williams", 
      email: "sarah@example.com", 
      role: "Customer", 
      status: "Active", 
      joined: "2023-04-05" 
    },
    { 
      id: 5, 
      name: "Michael Brown", 
      email: "michael@example.com", 
      role: "Seller", 
      status: "Active", 
      joined: "2023-05-12" 
    },
  ]);

  // Function to simulate user data loading from the central data source
  // This ensures consistency with other parts of the application
  const loadUsers = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch data from Supabase
      // For now, we're ensuring the mock data is consistent
      console.log("Loading users from central data source");
      
      // Artificial delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // We're not changing the default mock data, but this function
      // would typically fetch from the same source as the main website
      setLoading(false);
    } catch (error) {
      console.error("Error loading users:", error);
      toast({
        title: "Error loading users",
        description: "Could not load users. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteUser = (id: number) => {
    try {
      setUsers(users.filter((user) => user.id !== id));
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const toggleUserStatus = (id: number) => {
    try {
      setUsers(users.map((user) => 
        user.id === id 
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      ));
      toast({
        title: "Success",
        description: "User status updated successfully",
      });
    } catch (error) {
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

      {loading ? (
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
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
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
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No users found matching your search.
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
