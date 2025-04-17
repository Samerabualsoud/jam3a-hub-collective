
import React from 'react';
import PaymentIntegration from '@/components/admin/PaymentIntegration';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PaymentSettings = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  // Check if Supabase is available
  let supabaseAvailable = false;
  try {
    // Import meta is available at build time
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    supabaseAvailable = !!(supabaseUrl && supabaseKey);
  } catch (error) {
    console.error("Error checking Supabase config:", error);
    supabaseAvailable = false;
  }
  
  // Handle no Supabase configuration case first
  if (!supabaseAvailable) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Supabase Connection Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Supabase connection is required to access payment settings.
                  Please configure your Supabase environment variables.
                </AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground">
                This application requires Supabase environment variables to be set correctly. 
                For development purposes, you can continue to use the app with limited functionality.
              </p>
              <div className="flex justify-end">
                <Button onClick={() => navigate('/')} variant="outline">
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Access Denied
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You don't have permission to access payment settings.
                </AlertDescription>
              </Alert>
              <div className="flex justify-end">
                <Button onClick={() => navigate('/')} variant="outline">
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PaymentIntegration />
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSettings;
