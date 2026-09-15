'use client';

import { ArrowRight } from 'lucide-react';

export function DistributorInvite() {
  return <aside className="bg-[#1C1A17] text-[#FAF9F5] p-8 rounded-sm flex flex-col justify-between border border-[#332F27] space-y-6">
    <div className="space-y-3">
      <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">Partner with SAGI</span>
      <h3 className="font-serif text-2xl font-normal leading-snug">Bring our pantry to your community.</h3>
      <p className="text-xs text-[#9E978A] leading-relaxed">Interested in stocking SAGI products? Register your interest in becoming a distributor and share our Nigerian pantry essentials with your customers.</p>
    </div>
    <a href="#distributor-signup" onClick={(event) => {
      const target = document.getElementById('distributor-signup');
      if (!target) return;
      event.preventDefault();
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }} className="w-full bg-[#D4AF37] hover:bg-[#C29D2C] text-[#141311] px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]">
      Become a distributor <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
    </a>
  </aside>;
}
