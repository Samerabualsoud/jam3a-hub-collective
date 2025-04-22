
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Users, Share2, Clock, ShoppingBag } from 'lucide-react';

const MyJam3as = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [myJam3as, setMyJam3as] = useState([]);

  // Content translations
  const content = {
    en: {
      title: "My Jam3as",
      subtitle: "Manage your group buying activities",
      noJam3as: "You haven't created or joined any Jam3as yet.",
      startNew: "Start a New Jam3a",
      joinExisting: "Join an Existing Jam3a",
      active: "Active",
      pending: "Pending",
      completed: "Completed",
      people: "people",
      joined: "joined",
      viewDetails: "View Details",
      shareJam3a: "Share",
      created: "Created",
      expires: "Expires",
      currentPrice: "Current Price",
      originalPrice: "Original Price",
      inviteMore: "Invite More People"
    },
    ar: {
      title: "جمعاتي",
      subtitle: "إدارة أنشطة الشراء الجماعي الخاصة بك",
      noJam3as: "لم تقم بإنشاء أو الانضمام إلى أي جمعات حتى الآن.",
      startNew: "إنشاء جمعة جديدة",
      joinExisting: "الانضمام إلى جمعة موجودة",
      active: "نشطة",
      pending: "قيد الانتظار",
      completed: "مكتملة",
      people: "أشخاص",
      joined: "انضموا",
      viewDetails: "عرض التفاصيل",
      shareJam3a: "مشاركة",
      created: "تم الإنشاء",
      expires: "تنتهي",
      currentPrice: "السعر الحالي",
      originalPrice: "السعر الأصلي",
      inviteMore: "دعوة المزيد من الأشخاص"
    }
  };

  // Sample data for demonstration
  const demoJam3as = [
    {
      id: 1,
      productName: language === 'en' ? "iPhone 16 Pro Max 256GB" : "آيفون 16 برو ماكس 256 جيجابايت",
      productImage: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
      status: "active",
      currentMembers: 3,
      targetMembers: 5,
      originalPrice: 4999,
      currentPrice: 4599,
      createdAt: "2025-04-15T14:30:00Z",
      expiresAt: "2025-05-15T14:30:00Z"
    },
    {
      id: 2,
      productName: language === 'en' ? "MacBook Pro 16\" M3 Max" : "ماك بوك برو 16 بوصة M3 ماكس",
      productImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80",
      status: "pending",
      currentMembers: 1,
      targetMembers: 3,
      originalPrice: 11999,
      currentPrice: 10799,
      createdAt: "2025-04-20T09:15:00Z",
      expiresAt: "2025-05-20T09:15:00Z"
    }
  ];

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setMyJam3as(demoJam3as);
      setIsLoading(false);
    }, 1000);
  }, [language]);

  // Format date to display in the user's locale
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate progress percentage for the jam3a
  const calculateProgress = (current, target) => {
    return Math.min(100, Math.round((current / target) * 100));
  };

  // Get the appropriate status badge based on status
  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          {language === 'en' ? content.en.active : content.ar.active}
        </Badge>
      );
    } else if (status === 'pending') {
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          {language === 'en' ? content.en.pending : content.ar.pending}
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          {language === 'en' ? content.en.completed : content.ar.completed}
        </Badge>
      );
    }
  };

  const handleShareJam3a = (jam3aId) => {
    // Simulate share functionality
    navigator.clipboard.writeText(`${window.location.origin}/join-jam3a/${jam3aId}`).then(() => {
      toast({
        title: language === 'en' ? "Link copied!" : "تم نسخ الرابط!",
        description: language === 'en' ? "Share it with your friends" : "شاركه مع أصدقائك",
      });
    });
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 px-4 bg-gradient-to-r from-royal-blue to-royal-blue-dark text-white">
          <div className="container mx-auto text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' ? content.en.title : content.ar.title}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {language === 'en' ? content.en.subtitle : content.ar.subtitle}
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {isLoading ? (
              // Loading state
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="w-full">
                    <CardContent className="p-6">
                      <div className="animate-pulse flex flex-col md:flex-row gap-4">
                        <div className="bg-gray-200 rounded md:w-1/3 h-48"></div>
                        <div className="flex-1 space-y-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : myJam3as.length > 0 ? (
              // Jam3as list
              <div className="space-y-8">
                {myJam3as.map((jam3a) => (
                  <Card key={jam3a.id} className="overflow-hidden border border-gray-200 hover:border-royal-blue/30 transition-colors">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-full">
                          <img 
                            src={jam3a.productImage} 
                            alt={jam3a.productName}
                            className="w-full h-full object-cover aspect-video md:aspect-square"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{jam3a.productName}</h3>
                            {getStatusBadge(jam3a.status)}
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                              <Users size={16} />
                              <span>
                                {jam3a.currentMembers}/{jam3a.targetMembers} {language === 'en' ? content.en.people : content.ar.people} {language === 'en' ? content.en.joined : content.ar.joined}
                              </span>
                            </div>
                            <Progress value={calculateProgress(jam3a.currentMembers, jam3a.targetMembers)} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' ? content.en.created : content.ar.created}
                              </p>
                              <p className="font-medium flex items-center gap-1">
                                <Clock size={16} /> {formatDate(jam3a.createdAt)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' ? content.en.expires : content.ar.expires}
                              </p>
                              <p className="font-medium">{formatDate(jam3a.expiresAt)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' ? content.en.currentPrice : content.ar.currentPrice}
                              </p>
                              <p className="font-bold text-royal-blue">
                                {jam3a.currentPrice} {language === 'en' ? 'SAR' : 'ريال'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {language === 'en' ? content.en.originalPrice : content.ar.originalPrice}
                              </p>
                              <p className="line-through text-muted-foreground">
                                {jam3a.originalPrice} {language === 'en' ? 'SAR' : 'ريال'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <Button variant="default" className="flex items-center gap-2">
                              <ShoppingBag size={16} />
                              {language === 'en' ? content.en.viewDetails : content.ar.viewDetails}
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => handleShareJam3a(jam3a.id)}
                              className="flex items-center gap-2"
                            >
                              <Share2 size={16} />
                              {language === 'en' ? content.en.shareJam3a : content.ar.shareJam3a}
                            </Button>
                            {jam3a.status === 'pending' && (
                              <Button 
                                variant="green" 
                                className="text-white flex items-center gap-2"
                              >
                                <Users size={16} />
                                {language === 'en' ? content.en.inviteMore : content.ar.inviteMore}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Empty state
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-medium mb-2">
                  {language === 'en' ? content.en.noJam3as : content.ar.noJam3as}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button asChild>
                    <Link to="/start-jam3a">{language === 'en' ? content.en.startNew : content.ar.startNew}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/shop">{language === 'en' ? content.en.joinExisting : content.ar.joinExisting}</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MyJam3as;
