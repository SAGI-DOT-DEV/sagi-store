import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export function AuthSelect({ label, error, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return <label className="block space-y-1.5"><span className="text-[11px] uppercase tracking-widest font-semibold text-[#6B6457]">{label}</span><span className="relative block"><select {...props} className="w-full appearance-none rounded-lg border border-[#D9CFBD] bg-[#F4F0E7] px-3.5 py-3 pr-10 text-sm font-medium text-[#1C1A17] outline-none transition hover:border-[#B9A98D] focus:border-[#8C7B5A] focus:bg-[#FAF9F5] focus:ring-2 focus:ring-[#D4AF37]/20">{children}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C7B5A]" /></span>{error && <span className="text-xs text-red-700">{error}</span>}</label>;
}
