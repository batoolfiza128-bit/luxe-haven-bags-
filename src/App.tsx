/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Product } from './types';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { CartDrawer } from './components/store/CartDrawer';
import { HomeView } from './components/store/HomeView';
import { CatalogView } from './components/store/CatalogView';
import { ProductDetailView } from './components/store/ProductDetailView';
import { CartView } from './components/store/CartView';
import { CheckoutView } from './components/store/CheckoutView';
import { OrderConfirmationView } from './components/store/OrderConfirmationView';
import { AccountView } from './components/store/AccountView';
import { AboutView } from './components/store/AboutView';
import { ContactView } from './components/store/ContactView';
import { FaqView } from './components/store/FaqView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, toasts, removeToast } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // If in admin mode, show full admin dashboard without storefront chrome
  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#141413]">
      {/* 1. Slim Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar Navigation (Top Bar Contract) */}
      <Navbar />

      {/* 3. Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView onQuickView={(prod) => setQuickViewProduct(prod)} />
        )}
        {currentView === 'catalog' && (
          <CatalogView onQuickView={(prod) => setQuickViewProduct(prod)} />
        )}
        {currentView === 'product' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order-confirmation' && <OrderConfirmationView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'faq' && <FaqView />}
      </main>

      {/* 4. Luxury Footer */}
      <Footer />

      {/* 5. Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* 6. Quick View Inspection Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* 7. Discreet Toast Notifications */}
      <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#141413] text-[#FAF8F5] border border-[#3B372F] p-3.5 shadow-2xl flex items-center justify-between gap-3 text-xs animate-slideUp"
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'gold' && <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />}
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#4BB543] shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-[#C5A880] shrink-0" />}
              <span className="font-light tracking-wide">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8C8476] hover:text-[#FAF8F5] transition-colors p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
