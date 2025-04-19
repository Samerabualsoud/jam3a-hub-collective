
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { Profile } from "@/types/admin";

interface UserTableRowProps {
  user: Profile;
}

const UserTableRow = ({ user }: UserTableRowProps) => {
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

  const getDisplayName = (user: Profile) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      return user.first_name;
    } else {
      return user.email?.split('@')[0] || 'Unknown';
    }
  };

  return (
    <TableRow>
      <TableCell className="font-mono text-xs">{user.id.substring(0, 8)}...</TableCell>
      <TableCell>{getDisplayName(user)}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{getRoleBadge(user.role)}</TableCell>
      <TableCell>{getStatusBadge(user.status)}</TableCell>
      <TableCell>
        {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon">
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
