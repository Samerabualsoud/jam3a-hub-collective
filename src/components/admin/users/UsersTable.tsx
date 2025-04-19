
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
import { Loader2, AlertCircle } from "lucide-react";
import { Profile } from "@/types/admin";
import UserTableRow from "./UserTableRow";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading users: {error.message}
            </AlertDescription>
          </Alert>
          <p className="mt-2 text-sm text-muted-foreground">
            This could be due to a Row Level Security (RLS) policy issue or a network problem.
            Make sure you are logged in as an admin user or refresh and try again.
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
                  <div className="space-y-3">
                    <p className="font-medium">No users found in the database.</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Possible reasons:</p>
                      <ul className="list-disc list-inside">
                        <li>You may not have admin permissions</li>
                        <li>There might be an issue with RLS policies</li>
                        <li>Users haven't been properly added to the profiles table</li>
                        <li>You need to refresh your authentication session</li>
                      </ul>
                    </div>
                    <p className="text-sm">
                      Try going back to the login page, log out, and log back in as an admin user.
                    </p>
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
