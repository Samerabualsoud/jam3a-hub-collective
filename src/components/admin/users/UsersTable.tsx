
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Profile } from "@/types/admin";
import UserTableRow from "./UserTableRow";

interface UsersTableProps {
  users: Profile[];
  isLoading: boolean;
  error: Error | null;
}

const UsersTable = ({ users, isLoading, error }: UsersTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <p>Loading users...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500">Error loading users: {error.message}</p>
          <p className="mt-2">
            Make sure you have created a 'profiles' table in your Supabase database with the correct structure.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
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
            {users.length > 0 ? (
              users.map((user) => (
                <UserTableRow key={user.id} user={user} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  <div className="space-y-2">
                    <p>No users found in the database.</p>
                    <p className="text-sm text-muted-foreground">
                      This could be because:
                    </p>
                    <ul className="text-sm list-disc list-inside text-muted-foreground">
                      <li>The profiles table hasn't been created yet</li>
                      <li>Users haven't been properly added to the profiles table</li>
                      <li>The database migration hasn't been applied</li>
                    </ul>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersTable;
