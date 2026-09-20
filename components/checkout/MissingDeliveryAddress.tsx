import { ArrowRight, MapPin } from 'lucide-react';

export function MissingDeliveryAddress({ onAdd, disabled }: { onAdd: () => void; disabled?: boolean }) {
  return <div className="rounded-2xl border border-dashed border-[#D4D4D4] bg-[#FFFFFF] p-6">
    <MapPin className="mb-4 h-6 w-6 text-[#737373]" aria-hidden="true" />
    <h3 className="font-serif text-2xl text-[#000000]">Where should we deliver?</h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-[#535353]">Your bag is ready. Add a delivery address to see shipping options and your final total.</p>
    <button type="button" disabled={disabled} onClick={onAdd} className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#000000] px-5 py-3 text-xs font-semibold text-[#FFFFFF] transition-colors hover:bg-[#272727] disabled:opacity-50">Add delivery address<ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
  </div>;
}
