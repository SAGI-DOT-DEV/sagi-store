import type { InputHTMLAttributes } from 'react';

export function AuthField({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return <label className="block space-y-1.5">
    <span className="text-[11px] uppercase tracking-widest font-semibold text-[#6B6457]">{label}</span>
    <input {...props} className="w-full rounded-lg border border-[#E1D9CA] bg-[#FAF9F5] px-3.5 py-3 text-sm text-[#1C1A17] outline-none transition focus:border-[#8C7B5A] focus:ring-2 focus:ring-[#D4AF37]/20" />
    {error && <span className="text-xs text-red-700">{error}</span>}
  </label>;
}
