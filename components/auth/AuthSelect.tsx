import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export function AuthSelect({ label, error, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return <label className="block space-y-1.5"><span className="text-[11px] uppercase tracking-widest font-semibold text-[#535353]">{label}</span><span className="relative block"><select {...props} className="w-full appearance-none rounded-lg border border-[#D4D4D4] bg-[#FFFFFF] px-3.5 py-3 pr-10 text-sm font-medium text-[#000000] outline-none transition hover:border-[#AAAAAA] focus:border-[#737373] focus:bg-[#FFFFFF] focus:ring-2 focus:ring-[#737373]/20">{children}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" /></span>{error && <span className="text-xs text-neutral-700">{error}</span>}</label>;
}
