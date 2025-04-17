
import React from 'react';
import PaymentIntegration from '@/components/admin/PaymentIntegration';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const PaymentSettings = () => {
  const supabase = useSupabaseClient();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {supabase ? (
          <PaymentIntegration />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Supabase Connection Required</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Supabase connection is required to access payment settings.
                  Please make sure your application is properly connected to Supabase.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSettings;
