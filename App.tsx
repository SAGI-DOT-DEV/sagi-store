"use client";

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PantryDrawer } from './components/PantryDrawer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { StoryModal } from './components/StoryModal';
import { JournalDetailModal } from './components/JournalDetailModal';

import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { JournalsView } from './views/JournalsView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { ToastContainer } from './components/ToastContainer';

const AppContent: React.FC = () => {
  const { activeView, toasts, dismissToast } = useCart();

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'products':
        return <ProductsView />;
      case 'journals':
        return <JournalsView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'checkout':
        return <CheckoutView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1A17] flex flex-col selection:bg-[#EAE4D7] selection:text-[#1C1A17]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main View Container */}
      <main className="flex-1">{renderActiveView()}</main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Pantry Bag */}
      <PantryDrawer />

      {/* Search & Discovery Modal */}
      <QuickSearchModal />

      {/* Agricultural Provenance Story Modal */}
      <StoryModal />

      {/* Masterclass & Journal Abstract Reader */}
      <JournalDetailModal />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
