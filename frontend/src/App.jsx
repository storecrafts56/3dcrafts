import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

// Pages
import Home from "./pages/Home";
import Catalog from "./pages/Catelog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/Privacy";
import TermsConditions from "./pages/Terms";
import ShippingInfo from "./pages/Info";
import ReturnRefunds from "./pages/Return";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                <Route path="/terms_conditions" element={<TermsConditions />} />
                <Route path="/shipping_info" element={<ShippingInfo />} />
                <Route path="/returns" element={<ReturnRefunds />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
