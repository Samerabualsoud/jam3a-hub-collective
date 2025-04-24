import React, { useState, useEffect } from 'react';
import { Users, Plus, Package, TruckIcon, BarChart2, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlueBanner } from '@/components/BlueBanner';
import { useAuth } from '@/contexts/AuthContext';
import AdminButton from '@/components/AdminButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const Sellers = () => {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sellerProfile, setSellerProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProfile = async () => {
      if (!isAuthenticated) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('seller_profiles')
          .select('*')
          .eq('user_id', user?.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        setSellerProfile(data);
      } catch (error) {
        console.error('Error fetching seller profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProfile();
  }, [isAuthenticated, user]);

  const content = {
    en: {
      bannerText: "Become a Jam3a Seller",
      title: "Sell More, Earn More with Jam3a",
      subtitle: "Join our group buying platform and unlock new sales opportunities",
      startSelling: "Start Selling",
      pendingApplication: "Your Application is Under Review",
      approvedApplication: "Your Seller Account is Active",
      dashboardButton: "Seller Dashboard",
      applicationButton: "Complete Application",
    },
    ar: {
      bannerText: "كن بائعًا في جمعة",
      title: "بيع أكثر، واكسب أكثر مع جمعة",
      subtitle: "انضم إلى منصة الشراء الجماعي واكتشف فرص مبيعات جديدة",
      startSelling: "ابدأ البيع",
      pendingApplication: "طلبك قيد المراجعة",
      approvedApplication: "حسابك البائع نشط",
      dashboardButton: "لوحة تحكم البائعين",
      applicationButton: "أكمل الطلب",
    }
  };

  const handleStartApplication = () => {
    if (!isAuthenticated) {
      toast({
        title: language === 'en' ? 'Login Required' : 'تسجيل الدخول مطلوب',
        description: language === 'en' 
          ? 'Please login to start your seller application' 
          : 'يرجى تسجيل الدخول لبدء طلب البائع',
        variant: 'default'
      });
      navigate('/login');
      return;
    }
    navigate('/seller-register');
  };

  const renderSellerStatus = () => {
    if (!sellerProfile) {
      return (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {content[language].startSelling}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {content[language].subtitle}
            </p>
            <Button onClick={handleStartApplication}>
              {content[language].applicationButton}
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (sellerProfile.application_status === 'pending') {
      return (
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <Clock className="h-5 w-5" />
              {content[language].pendingApplication}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-800 mb-4">
              {language === 'en'
                ? 'Your seller application is currently being reviewed. We will notify you once a decision has been made.'
                : 'جارٍ مراجعة طلب البائع الخاص بك. سنقوم بإشعارك بمجرد اتخاذ القرار.'}
            </p>
          </CardContent>
        </Card>
      );
    }

    if (sellerProfile.application_status === 'approved') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {language === 'en' ? 'Products' : 'المنتجات'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link to="/seller/products">
                  {language === 'en' ? 'Manage Products' : 'إدارة المنتجات'}
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TruckIcon className="h-5 w-5" />
                {language === 'en' ? 'Orders' : 'الطلبات'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link to="/seller/orders">
                  {language === 'en' ? 'Manage Orders' : 'إدارة الطلبات'}
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                {language === 'en' ? 'Analytics' : 'التحليلات'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <Link to="/seller/analytics">
                  {language === 'en' ? 'View Performance' : 'عرض الأداء'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 relative">
        {isAuthenticated && <AdminButton />}
        <BlueBanner text={{
          en: content.en.bannerText,
          ar: content.ar.bannerText
        }} />

        <div className="container mx-auto px-4 pt-20 pb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {content[language].title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {content[language].subtitle}
            </p>

            {loading ? (
              <div className="text-center">
                <p>{language === 'en' ? 'Loading...' : 'جارٍ التحميل...'}</p>
              </div>
            ) : (
              renderSellerStatus()
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sellers;
