
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
import { Loader2, AlertCircle, Eye } from "lucide-react";
import { Profile } from "@/types/admin";
import UserTableRow from "./UserTableRow";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UsersTableProps {
  users: Profile[];
  isLoading: boolean;
  error: Error | null;
  onRefresh?: () => void;
}

const UsersTable = ({ users, isLoading, error, onRefresh }: UsersTableProps) => {
  const navigate = useNavigate();

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
          <div className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              This could be due to a Row Level Security (RLS) policy issue or a network problem.
              Make sure you are logged in as an admin user or refresh and try again.
            </p>
            {onRefresh && (
              <Button onClick={onRefresh} variant="outline" className="mr-2">
                Retry Loading Users
              </Button>
            )}
            <Button onClick={() => navigate("/login")} variant="outline">
              Go to Login
            </Button>
          </div>
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
                    <div className="mt-4 flex justify-center gap-2">
                      {onRefresh && (
                        <Button onClick={onRefresh} size="sm">
                          Refresh Users
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => navigate("/login")}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Check Login Status
                      </Button>
                    </div>
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
