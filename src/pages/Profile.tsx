
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/Header';
import { User, Settings, Package, CreditCard, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  const handleLogout = async () => {
    await logout();
    toast({
      title: language === 'en' ? 'Logged out successfully' : 'تم تسجيل الخروج بنجاح',
    });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {language === 'en' ? 'My Profile' : 'ملفي الشخصي'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Info Card */}
            <Card className="md:col-span-3">
              <CardHeader className="bg-royal-blue/5">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {language === 'en' ? 'Account Information' : 'معلومات الحساب'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Name' : 'الاسم'}
                    </p>
                    <p className="font-medium">{user?.name || '-'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                    </p>
                    <p className="font-medium">{user?.email || '-'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'Account Type' : 'نوع الحساب'}
                    </p>
                    <p className="font-medium capitalize">{user?.role || 'user'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="md:col-span-3">
              <CardHeader className="bg-royal-blue/5">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex justify-start gap-2"
                    onClick={() => navigate('/my-jam3as')}
                  >
                    <Package className="h-4 w-4" />
                    {language === 'en' ? 'My Jam3as' : 'جمعاتي'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex justify-start gap-2"
                    onClick={() => {
                      toast({
                        title: language === 'en' ? 'Coming Soon' : 'قريبًا',
                        description: language === 'en' ? 'This feature is not available yet' : 'هذه الميزة غير متوفرة حاليًا'
                      });
                    }}
                  >
                    <CreditCard className="h-4 w-4" />
                    {language === 'en' ? 'Payment Methods' : 'طرق الدفع'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex justify-start gap-2 text-red-500 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    {language === 'en' ? 'Logout' : 'تسجيل الخروج'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
