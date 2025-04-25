
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import FAQ from './pages/FAQ';
import HowItWorksPage from './pages/HowItWorks'; 
import ProductDetails from './pages/ProductDetails';
import StartJam3a from './pages/StartJam3a';
import JoinJam3a from './pages/JoinJam3a';
import MyJam3as from './pages/MyJam3as';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PaymentCallback from './pages/PaymentCallback';
import PaymentPage from './pages/Payment';
import Admin from './pages/Admin';
import Login from './pages/Login';
import SellerLogin from './pages/SellerLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/start-jam3a" element={<StartJam3a />} />
        <Route path="/join-jam3a" element={<JoinJam3a />} />
        <Route path="/my-jam3as" element={<MyJam3as />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/payment-callback" element={<PaymentCallback />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login defaultTab="register" />} />
        <Route path="/seller-login" element={<SellerLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
