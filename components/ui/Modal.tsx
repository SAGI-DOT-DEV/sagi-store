'use client';

import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useModalAnimation } from '../../hooks/useModalAnimation';

export function Modal({ open, onClose, title, children, maxWidth = 'max-w-md', dismissible = true }: { open: boolean; onClose: () => void; title: string; children: ReactNode; maxWidth?: string; dismissible?: boolean }) {
  const { root, close } = useModalAnimation(open, onClose);
  useEffect(() => { if (!open || !dismissible) return; const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); }; document.addEventListener('keydown', closeOnEscape); return () => document.removeEventListener('keydown', closeOnEscape); }, [open, close, dismissible]);
  if (!open) return null;
  return createPortal(<div ref={root} className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center overflow-y-auto bg-[#1C1A17]/45 p-4" role="dialog" aria-modal="true" aria-label={title}>
    <div data-modal-body className={`relative my-4 max-h-[calc(100vh-2rem)] w-full overflow-y-auto rounded-2xl bg-[#FAF9F5] p-6 shadow-2xl sm:p-8 ${maxWidth}`}>
      <button disabled={!dismissible} onClick={close} className="absolute right-4 top-4 rounded-full p-2 text-[#7A7264] hover:bg-[#EFECE4] disabled:opacity-40" aria-label={`Close ${title}`}><X className="h-5 w-5" /></button>
      {children}
    </div>
  </div>, document.body);
}
