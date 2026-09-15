'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/** Keeps contents mounted so both opening and closing can animate. */
export function AnimatedPanel({ open, mode, children, className = '' }: {
  open: boolean; mode: 'dropdown' | 'drawer'; children: ReactNode; className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const panel = element.querySelector<HTMLElement>('[data-slide-panel]');
    const backdrop = element.querySelector<HTMLElement>('[data-slide-backdrop]');
    const targets = [element, panel, backdrop].filter(Boolean) as HTMLElement[];
    gsap.killTweensOf(targets);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : open ? 0.45 : 0.28;
    const hidden = element.style.display === 'none';
    if (!open && hidden) return;
    if (open) gsap.set(element, { display: 'block' });
    const finish = () => { if (!open) gsap.set(element, { display: 'none' }); };
    if (mode === 'dropdown') {
      if (open && hidden) gsap.set(element, { height: 0, opacity: 0 });
      gsap.to(element, { height: open ? 'auto' : 0, opacity: open ? 1 : 0, duration, ease: 'power3.inOut', onComplete: finish });
    } else {
      if (open && hidden) {
        if (panel) gsap.set(panel, { xPercent: 100 });
        if (backdrop) gsap.set(backdrop, { opacity: 0 });
      }
      if (panel) gsap.to(panel, { xPercent: open ? 0 : 100, duration, ease: 'power3.out', onComplete: finish });
      if (backdrop) gsap.to(backdrop, { opacity: open ? 1 : 0, duration, ease: 'power2.out' });
    }
  }, { scope: root, dependencies: [open, mode] });
  return <div ref={root} style={{ display: 'none' }} className={`${mode === 'dropdown' ? 'overflow-hidden' : ''} ${className}`} inert={!open} aria-hidden={!open}>{children}</div>;
}
