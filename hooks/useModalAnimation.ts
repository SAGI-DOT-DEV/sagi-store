'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export function useModalAnimation(open: boolean, onClose: () => void) {
  const root = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const { contextSafe } = useGSAP(() => {
    if (!open || !root.current) return;
    closing.current = false;
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.3;
    gsap.from(root.current, { opacity: 0, duration, clearProps: 'opacity' });
    gsap.from(root.current.querySelector('[data-modal-body]'), { y: 16, scale: 0.97, duration, ease: 'power3.out', clearProps: 'transform' });
  }, { scope: root, dependencies: [open], revertOnUpdate: true });

  const close = contextSafe(() => {
    if (closing.current) return;
    if (!root.current) { onClose(); return; }
    closing.current = true;
    const body = root.current.querySelector('[data-modal-body]');
    gsap.killTweensOf([root.current, body]);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.2;
    gsap.to(root.current, { opacity: 0, duration, onComplete: onClose });
    if (body) gsap.to(body, { y: 10, scale: 0.98, duration, ease: 'power2.in' });
  });
  return { root, close };
}
