
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import { LanguageProvider } from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import FAQ from "./pages/FAQ";
import ShopAllDeals from "./pages/ShopAllDeals";
import StartJam3a from "./pages/StartJam3a";
import MyJam3as from "./pages/MyJam3as";
import HowItWorks from "./pages/HowItWorks";
import FAQPage from "./pages/FAQPage";
import Sellers from "./pages/Sellers";
import SellerLogin from "./pages/SellerLogin";
import SellerRegister from "./pages/SellerRegister";
import JoinJam3a from "./pages/JoinJam3a";
import PaymentCallback from "./pages/PaymentCallback";
import PaymentSettings from "./pages/PaymentSettings";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  // Create a client
  const queryClient = new QueryClient();
  
  // Check if Supabase credentials exist before creating client
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  
  // For development, allow the app to run without Supabase
  const hasSupabaseConfig = supabaseUrl && supabaseAnonKey;
  const supabaseClient = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;

  // Log the Supabase configuration status
  if (!hasSupabaseConfig) {
    console.warn('Running without Supabase configuration. Some features will be limited.');
  }

  // Define routes configuration
  const routesConfig = (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/start-jam3a" element={<StartJam3a />} />
      <Route path="/join-jam3a" element={<JoinJam3a />} />
      <Route path="/payment-callback" element={<PaymentCallback />} />
      <Route path="/payment-settings" element={<PaymentSettings />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/sellers" element={<Sellers />} />
      <Route path="/seller-login" element={<SellerLogin />} />
      <Route path="/seller-register" element={<SellerRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-jam3as" element={<MyJam3as />} />
      <Route path="/product/:id" element={<Index />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/shop-all-deals" element={<ShopAllDeals />} />
      <Route path="/shop-deals" element={<ShopAllDeals />} />
      <Route path="/shop" element={<ShopAllDeals />} />
      <Route path="/privacy" element={<Index />} />
      <Route path="/terms" element={<Index />} />
      <Route path="/contact" element={<Index />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              {supabaseClient ? (
                <SessionContextProvider supabaseClient={supabaseClient}>
                  {routesConfig}
                </SessionContextProvider>
              ) : (
                // Fallback when Supabase is not configured
                routesConfig
              )}
            </BrowserRouter>
          </LanguageProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
