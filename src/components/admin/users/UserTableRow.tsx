
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, User } from "lucide-react";
import { Profile } from "@/types/admin";

interface UserTableRowProps {
  user: Profile;
}

const UserTableRow = ({ user }: UserTableRowProps) => {
  // Ensure user has an id to prevent rendering issues
  if (!user?.id) {
    console.error("User object is missing ID:", user);
    return null;
  }

  const getStatusBadge = (status?: string) => {
    return status === "active" ? (
      <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500 hover:bg-purple-600">Admin</Badge>;
      case "seller":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Seller</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  const getDisplayName = (user: Profile) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    } else if (user.email) {
      return user.email.split('@')[0];
    } else {
      return 'Unknown User';
    }
  };

  // Format the created_at date safely
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "Invalid Date";
    }
  };

  return (
    <TableRow>
      <TableCell className="font-mono text-xs">
        {user.id ? user.id.substring(0, 8) + "..." : "No ID"}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <div className="bg-muted rounded-full p-1">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
        {getDisplayName(user)}
      </TableCell>
      <TableCell>{user.email || "No email"}</TableCell>
      <TableCell>{getRoleBadge(user.role)}</TableCell>
      <TableCell>{getStatusBadge(user.status)}</TableCell>
      <TableCell>{formatDate(user.created_at)}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" title={user.status === "active" ? "Active" : "Inactive"}>
          {user.status === "active" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
