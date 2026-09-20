import type { InputHTMLAttributes } from 'react';

export function AuthField({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return <label className="block space-y-1.5">
    <span className="text-[11px] uppercase tracking-widest font-semibold text-[#535353]">{label}</span>
    <input {...props} className="w-full rounded-lg border border-[#E4E4E4] bg-[#FFFFFF] px-3.5 py-3 text-sm text-[#000000] outline-none transition focus:border-[#737373] focus:ring-2 focus:ring-[#737373]/20" />
    {error && <span className="text-xs text-neutral-700">{error}</span>}
  </label>;
}
