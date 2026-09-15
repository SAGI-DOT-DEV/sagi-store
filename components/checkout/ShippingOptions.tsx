import type { ShippingRate } from '../../services/shipping.service';

export const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat('en', { style: 'currency', currency, currencyDisplay: 'code' }).format(amount);

export function ShippingOptions({ rates, selectedId, onSelect }: {
  rates: ShippingRate[]; selectedId: string; onSelect: (id: string) => void;
}) {
  return <fieldset className="space-y-3">
    <legend className="mb-3 font-serif text-xl text-[#1C1A17]">Shipping options</legend>
    {rates.map((rate) => <label key={rate.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${selectedId === rate.id ? 'border-[#1C1A17] bg-[#F3EFE6]' : 'border-[#D9D2C5]'}`}>
      <input type="radio" name="shippingRate" value={rate.id} checked={selectedId === rate.id} onChange={() => onSelect(rate.id)} className="accent-[#1C1A17]" />
      <span className="flex-1 text-sm"><span className="block font-semibold">{rate.carrier} — {rate.service}</span>
        {rate.estimatedDays != null && <span className="block text-xs text-[#7A7264]">Estimated {rate.estimatedDays} days</span>}
        {rate.durationTerms && <span className="block text-xs text-[#7A7264]">{rate.durationTerms}</span>}
      </span>
      <span className="text-sm font-semibold">{formatMoney(Number(rate.amount), rate.currency)}</span>
    </label>)}
  </fieldset>;
}
