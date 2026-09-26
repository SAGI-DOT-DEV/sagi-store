import { Minus, Plus } from 'lucide-react';

export function QuantityControl({ value, onChange, min = 1, max = Infinity, disabled = false, label = 'item' }: { value: number; onChange: (quantity: number) => void; min?: number; max?: number; disabled?: boolean; label?: string }) {
  return <div className="inline-flex h-12 shrink-0 items-center rounded-full border border-neutral-300 bg-white text-black">
    <button onClick={() => onChange(value - 1)} disabled={disabled || value <= min} className="store-icon disabled:opacity-30" aria-label={`Decrease quantity of ${label}`}><Minus size={14} /></button>
    <span className="min-w-6 text-center text-xs font-semibold" aria-live="polite">{value}</span>
    <button onClick={() => onChange(value + 1)} disabled={disabled || value >= max} className="store-icon disabled:opacity-30" aria-label={`Increase quantity of ${label}`}><Plus size={14} /></button>
  </div>;
}
