import { ArrowRight, MapPin } from 'lucide-react';

export function MissingDeliveryAddress({ onAdd, disabled }: { onAdd: () => void; disabled?: boolean }) {
  return <div className="rounded-2xl border border-dashed border-[#C9BDA7] bg-[#F3EFE6] p-6">
    <MapPin className="mb-4 h-6 w-6 text-[#8C7B5A]" aria-hidden="true" />
    <h3 className="font-serif text-2xl text-[#1C1A17]">Where should we deliver?</h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-[#6B6457]">Your bag is ready. Add a delivery address to see shipping options and your final total.</p>
    <button type="button" disabled={disabled} onClick={onAdd} className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#1C1A17] px-5 py-3 text-xs font-semibold text-[#FAF9F5] transition-colors hover:bg-[#33302B] disabled:opacity-50">Add delivery address<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
  </div>;
}
