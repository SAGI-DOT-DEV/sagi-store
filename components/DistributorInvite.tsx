'use client';

import { ArrowRight } from 'lucide-react';

export function DistributorInvite() {
  return <aside className="bg-black text-white p-8 rounded-2xl flex flex-col justify-between border border-neutral-800 space-y-6">
    <div className="space-y-3">
      <span className="text-[10px] tracking-[0.3em] uppercase text-[#737373] font-semibold">Partner with SAGI</span>
      <h3 className="font-serif text-2xl font-normal leading-snug">Bring our pantry to your community.</h3>
      <p className="text-xs text-[#A2A2A2] leading-relaxed">Interested in stocking SAGI products? Register your interest in becoming a distributor and share our Nigerian pantry essentials with your customers.</p>
    </div>
    <a href="#distributor-signup" onClick={(event) => {
      const target = document.getElementById('distributor-signup');
      if (!target) return;
      event.preventDefault();
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }} className="store-button w-full bg-neutral-300 text-black hover:bg-neutral-200">
      Become a distributor <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
    </a>
  </aside>;
}
