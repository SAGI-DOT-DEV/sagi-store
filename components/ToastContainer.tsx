"use client";

import { CheckCircle, LoaderCircle, CircleAlert, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export interface ToastItem {
  status?: 'loading' | 'success' | 'error';
  id: string;
  message: string;
  productName?: string;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (!toasts.length || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed bottom-6 right-4 z-[1100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 pointer-events-none" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.status === 'error' ? 'alert' : 'status'}
          className="bg-[#000000] text-[#FFFFFF] border border-[#404040] p-4 rounded-sm shadow-xl flex items-start gap-3 pointer-events-auto animate-in slide-in-from-bottom-5 duration-200"
        >
          {toast.status === 'loading' ? <LoaderCircle className="w-4 h-4 text-[#737373] shrink-0 mt-0.5 animate-spin" /> : toast.status === 'error' ? <CircleAlert className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" /> : <CheckCircle className="w-4 h-4 text-[#737373] shrink-0 mt-0.5" />}
          <div className="flex-1 text-xs">
            <div className="font-bold">{toast.message}</div>
            {toast.productName && (
              <div className="text-[#A2A2A2] mt-0.5">{toast.productName}</div>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#535353] hover:text-[#FFFFFF] p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>, document.body
  );
}
