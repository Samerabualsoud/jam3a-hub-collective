
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Package, Truck, Check, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSupabaseApi } from "@/lib/supabase/api";

const OrderTracking = () => {
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const { getOrders } = useSupabaseApi();
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    getOrders()
      .then(data => {
        // Optionally, filter orders for the current user if email is unique
        const filtered = data.filter(
          (order: any) =>
            user?.email && order.customer_email?.toLowerCase() === user.email.toLowerCase()
        );
        setOrders(filtered);
      })
      .catch(() => {
        toast({
          title: language === "en" ? "Error" : "خطأ",
          description:
            language === "en"
              ? "Could not fetch orders. Please try again."
              : "تعذر جلب الطلبات. حاول مرة أخرى.",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, getOrders, user, language, toast]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <Card className="max-w-md w-full mx-auto text-center mt-8">
            <CardHeader>
              <CardTitle>{language === "en" ? "Order Tracking" : "تتبع الطلب"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {language === "en"
                  ? "You need to be signed in to view your orders."
                  : "يجب عليك تسجيل الدخول لعرض طلباتك."}
              </p>
              <Button variant="outline" asChild>
                <a href="/seller-login">
                  {language === "en" ? "Seller Sign In" : "تسجيل دخول البائع"}
                </a>
              </Button>
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
        <Card className="max-w-2xl mx-auto p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Package className="mr-2" />
              {language === "en" ? "Order Tracking" : "تتبع الطلب"}
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <LoaderCircle className="animate-spin h-8 w-8 text-purple-600" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                {language === "en"
                  ? "No orders found."
                  : "لم يتم العثور على طلبات."}
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold">
                        {language === "en" ? "Order ID:" : "رقم الطلب:"}{" "}
                        <span className="text-purple-800">{order.id}</span>
                      </span>
                      <span>
                        {language === "en" ? "Status:" : "الحالة:"}{" "}
                        <span className="inline-flex items-center gap-1 font-medium">
                          {order.status === "Pending" && (
                            <>
                              <Clock className="w-4 h-4 text-gray-500" />
                              {language === "en" ? "Pending" : "قيد الانتظار"}
                            </>
                          )}
                          {order.status === "Processing" && (
                            <>
                              <Truck className="w-4 h-4 text-blue-600" />
                              {language === "en" ? "Processing" : "قيد المعالجة"}
                            </>
                          )}
                          {order.status === "Completed" && (
                            <>
                              <Check className="w-4 h-4 text-green-600" />
                              {language === "en" ? "Completed" : "مكتمل"}
                            </>
                          )}
                        </span>
                      </span>
                      <span>
                        {language === "en" ? "Total:" : "الإجمالي:"}{" "}
                        <span className="text-jam3a-purple">
                          {order.total_amount} SAR
                        </span>
                      </span>
                      <span>
                        {language === "en" ? "Placed:" : "تم الطلب:"}{" "}
                        <span>
                          {new Date(order.created_at).toLocaleString(
                            language === "en" ? "en-US" : "ar-EG"
                          )}
                        </span>
                      </span>
                    </div>
                    {/* Extra: can add view button, etc. */}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
