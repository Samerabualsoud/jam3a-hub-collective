
import React from 'react';
import PaymentIntegration from '@/components/admin/PaymentIntegration';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const PaymentSettings = () => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
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
        {supabase ? (
          <PaymentIntegration />
        ) : (
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
                  Please make sure your application is properly connected to Supabase.
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSettings;
