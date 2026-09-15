'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { PurchaseHistory } from '../components/auth/PurchaseHistory';
import { ArrowRight, BookOpen } from 'lucide-react';

export function PurchaseHistoryView() {
  const { user, accessToken, isLoading, setAuthModalOpen } = useAuth();
  return <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
    <header className="mb-10 flex flex-col justify-between gap-8 border-b border-[#E8E2D5] pb-10 sm:mb-12 md:flex-row md:items-end">
      <div className="max-w-xl"><p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8C7B5A]"><BookOpen className="h-4 w-4 text-[#D4AF37]" />The personal collection / Your account</p>
        <h1 className="mt-5 font-serif text-4xl tracking-tight text-[#1C1A17] sm:text-6xl">Purchase history<span className="text-[#D4AF37]">.</span></h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-[#7A7264]">A record of the provisions you brought home. Revisit your orders and follow their journey to your pantry.</p>
      </div>
      <Link href="/products" className="inline-flex w-fit items-center gap-4 rounded-full bg-[#1C1A17] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-[#FAF9F5] transition-colors hover:bg-[#33302B]">Back to the catalog <ArrowRight className="h-4 w-4 text-[#D4AF37]" /></Link>
    </header>
    <div>
      {isLoading ? <p role="status" className="text-sm text-[#7A7264]">Loading your account...</p>
        : user && accessToken ? <PurchaseHistory key={user.id} token={accessToken} />
        : <div className="rounded-xl border border-[#E1D9CA] p-6">
          <p className="text-sm text-[#7A7264]">Sign in to securely view your purchase history.</p>
          <button type="button" onClick={() => setAuthModalOpen(true)} className="mt-4 rounded-lg bg-[#1C1A17] px-6 py-3 text-sm text-[#FAF9F5]">Sign in</button>
        </div>}
    </div>
    <p className="mt-12 border-t border-[#E8E2D5] pt-6 text-center text-[10px] uppercase tracking-[0.25em] text-[#8C7B5A]">SAGI / Thoughtfully sourced. Fondly remembered.</p>
  </div>;
}
