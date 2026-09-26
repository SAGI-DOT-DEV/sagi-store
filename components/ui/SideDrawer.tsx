'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatedPanel } from './AnimatedPanel';

export function SideDrawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const [mounted,setMounted] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open || !mounted) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = requestAnimationFrame(() => panel.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); }
      if (event.key !== 'Tab') return;
      const elements = Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),[tabindex="0"]') ?? []).filter(element => element.getClientRects().length);
      const first = elements[0]; const last = elements[elements.length - 1];
      if (!first) { event.preventDefault(); panel.current?.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown',onKey);
    return () => { cancelAnimationFrame(timer); document.body.style.overflow = overflow; document.removeEventListener('keydown',onKey); previous?.focus(); };
  }, [open,mounted]);
  if (!mounted) return null;
  return createPortal(<AnimatedPanel open={open} mode="drawer" className="fixed inset-0 z-[80] overflow-hidden"><div data-slide-backdrop className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" /><div data-slide-panel ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white text-black shadow-2xl outline-none sm:inset-y-3 sm:right-3 sm:rounded-3xl">{children}</div></AnimatedPanel>, document.body);
}
