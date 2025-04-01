
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
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

const App = () => {
  // Create a client
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
