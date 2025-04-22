
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Index from './pages/Index';
import MyJam3as from './pages/MyJam3as';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import PaymentCallback from './pages/PaymentCallback';
import StartJam3a from './pages/StartJam3a';
import FAQ from './pages/FAQ';

// Import additional pages
import Shop from './pages/ShopAllDeals';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import ContactUs from './pages/ContactUs';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/my-jam3as" element={<MyJam3as />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/payment-callback" element={<PaymentCallback />} />
          <Route path="/start-jam3a" element={<StartJam3a />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
