"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PantryDrawer } from './PantryDrawer';
import { QuickSearchModal } from './QuickSearchModal';
import { StoryModal } from './StoryModal';
import { JournalDetailModal } from './JournalDetailModal';
import { ToastContainer } from './ToastContainer';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { toasts, dismissToast } = useCart();
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1A17] flex flex-col selection:bg-[#EAE4D7] selection:text-[#1C1A17]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <PantryDrawer />
      <QuickSearchModal />
      <StoryModal />
      <JournalDetailModal />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  return <ShellContent>{children}</ShellContent>;
}
