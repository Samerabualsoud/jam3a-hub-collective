
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
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
import HowItWorks from "./pages/HowItWorks";
import FAQPage from "./pages/FAQPage";
import Sellers from "./pages/Sellers";
import SellerLogin from "./pages/SellerLogin";
import SellerRegister from "./pages/SellerRegister";
import JoinJam3a from "./pages/JoinJam3a";
import PaymentCallback from "./pages/PaymentCallback";
import PaymentSettings from "./pages/PaymentSettings";

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const App = () => {
  // Create a client
  const queryClient = new QueryClient();
  
  // Check if Supabase credentials exist before creating client
  const hasSupabaseCredentials = supabaseUrl && supabaseAnonKey;
  
  // Only create the Supabase client if credentials are available
  const supabaseClient = hasSupabaseCredentials ? createClient(supabaseUrl, supabaseAnonKey) : null;
  
  // Display error message if Supabase environment variables are not set
  if (!hasSupabaseCredentials) {
    console.error('Supabase URL and/or Anonymous Key are missing. Please check your environment variables.');
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-700 mb-4">
            Supabase connection details are missing. Please make sure the following environment variables are set:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">VITE_SUPABASE_URL</li>
            <li className="mb-2">VITE_SUPABASE_ANON_KEY</li>
          </ul>
          <p className="text-sm text-gray-500">
            Contact your administrator for assistance or check the application documentation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <AuthProvider>
          <TooltipProvider>
            <LanguageProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
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
                  <Route path="/my-jam3a" element={<Index />} />
                  <Route path="/product/:id" element={<Index />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/shop-all-deals" element={<ShopAllDeals />} />
                  <Route path="/privacy" element={<Index />} />
                  <Route path="/terms" element={<Index />} />
                  <Route path="/contact" element={<Index />} />
                  <Route path="/admin/*" element={<Admin />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </LanguageProvider>
          </TooltipProvider>
        </AuthProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
};

export default App;
