'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';

const announcement = 'Autumn 2025 Reserve: First Cold-Pressed Palm Oil & Aged Ofada Now Released';

export function AnnouncementTicker() {
  const [paused, setPaused] = useState(false);
  return <div className="announcement-ribbon flex items-center bg-[#1C1A17] text-[#EDE7DB]">
    <Link href="/products" className="min-w-0 flex-1 overflow-hidden py-1.5 focus-visible:outline focus-visible:outline-[#D4AF37]" aria-label={`${announcement}. View collection`}>
      <div className="announcement-track flex w-max" style={{animationPlayState:paused ? 'paused' : 'running'}}>
        {[0,1].map(copy=><span key={copy} aria-hidden="true" className="announcement-copy flex shrink-0 items-center justify-center gap-4 whitespace-nowrap px-8 text-[10px] font-medium uppercase tracking-wider sm:text-xs sm:tracking-widest">
          <span>{announcement}</span><span className="text-[#D4AF37] normal-case tracking-normal">View Collection →</span>
        </span>)}
      </div>
    </Link>
    <button type="button" onClick={()=>setPaused(value=>!value)} aria-label={paused ? 'Play announcement' : 'Pause announcement'} className="announcement-toggle shrink-0 px-3 py-2 text-[#D4AF37] focus-visible:outline focus-visible:outline-[#D4AF37]">{paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}</button>
  </div>;
}
