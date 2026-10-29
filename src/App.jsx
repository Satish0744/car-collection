import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import CompareBar from './components/CompareBar';
import CompareModal from './components/CompareModal';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Brands from './pages/Brands';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import TestDrive from './pages/TestDrive';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CompareProvider>
          <BrowserRouter>
            <AnimatePresence>{loading && <Loader />}</AnimatePresence>
            {!loading && (
              <div className="min-h-screen flex flex-col">
                <ScrollToTop />
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/"            element={<Home />} />
                    <Route path="/cars"        element={<Cars />} />
                    <Route path="/cars/:id"    element={<CarDetails />} />
                    <Route path="/brands"      element={<Brands />} />
                    <Route path="/wishlist"    element={<Wishlist />} />
                    <Route path="/compare"     element={<Compare />} />
                    
                    <Route path="/test-drive"  element={<TestDrive />} />
                    <Route path="/about"       element={<About />} />
                    <Route path="/contact"     element={<Contact />} />
                    <Route path="/faq"         element={<FAQ />} />
                    <Route path="/login"       element={<Login />} />
                    <Route path="/signup"      element={<Signup />} />
                    <Route path="*"            element={
                      <div className="text-center py-32">
                        <p className="text-6xl font-display font-bold text-lux-gold">404</p>
                        <p className="text-lux-muted mt-4">Page not found</p>
                      </div>
                    } />
                  </Routes>
                </main>
                <Footer />
                <CompareBar />
                <CompareModal />
              </div>
            )}
          </BrowserRouter>
        </CompareProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}