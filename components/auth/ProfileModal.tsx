'use client';

import { useState } from 'react';
import { MapPin, Plus, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { addressSchema, type AddressInput } from '../../schemas/auth.schema';
import { addressFormValues } from '../../services/address-form';
import { AuthField } from './AuthField';
import { AuthSelect } from './AuthSelect';
import { AddressPhoneFields } from './AddressPhoneFields';
import { Modal } from '../ui/Modal';
import Link from 'next/link';

const COUNTRY_OPTIONS = [{ value: 'NG', label: 'Nigeria (NG)' }, { value: 'CA', label: 'Canada (CA)' }];
const REGION_OPTIONS: Record<string, string[]> = {
  NG: ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'Federal Capital Territory'],
  CA: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon'],
};

export function ProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, addAddress, updateAddress, requestSignOut } = useAuth();
  const { showToast, dismissToast } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState<AddressInput>({ phone: '', phone2: '', label: 'Home', line1: '', line2: '', city: '', state: '', country: 'NG', postalCode: '', isDefault: false });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({}); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  if (!open || !user) return null;
  const update = (key: keyof AddressInput, value: string | boolean) => setValues((current) => ({ ...current, [key]: value }));
  const changeCountry = (country: string) => setValues((current) => ({ ...current, country, state: '' }));
  const submit = async (event: React.FormEvent) => { event.preventDefault(); if (busy) return; const parsed = addressSchema.safeParse(values); if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]))); return; } setErrors({}); setBusy(true); setMessage(''); const toastId = showToast(editingId ? 'Updating address…' : 'Saving address…', undefined, 'loading'); try { if (editingId) await updateAddress(editingId, parsed.data); else await addAddress(parsed.data); setMessage(editingId ? 'Address updated.' : 'Address saved.'); showToast(editingId ? 'Address updated successfully' : 'Address saved successfully'); setShowForm(false); setEditingId(null); setValues({ phone: '', phone2: '', label: 'Home', line1: '', line2: '', city: '', state: '', country: 'NG', postalCode: '', isDefault: false }); } catch (error) { const errorMessage = error instanceof Error ? error.message : 'Could not save address'; setMessage(errorMessage); showToast(errorMessage, undefined, 'error'); } finally { dismissToast(toastId); setBusy(false); } };
  const editAddress = (address: NonNullable<typeof user.addresses>[number]) => { setEditingId(address.id); setValues(addressFormValues(address, user.profile)); setErrors({}); setMessage(''); setShowForm(true); };
  return <Modal open={open} onClose={onClose} title="Your profile" maxWidth="max-w-lg">
      <h2 className="font-serif text-3xl text-[#1C1A17]">Your profile</h2><p className="mt-1 text-sm text-[#7A7264]">Manage your account and delivery addresses.</p>
      <div className="mt-6 rounded-xl bg-[#F1EEE6] p-4"><p className="text-xs uppercase tracking-widest text-[#7A7264]">Account details</p><p className="mt-2 font-medium text-[#1C1A17]">{user.profile?.firstName} {user.profile?.lastName}</p><p className="text-sm text-[#6B6457]">{user.email}</p></div>
      <div className="mt-6"><div className="flex items-center justify-between"><h3 className="font-serif text-xl">Saved addresses</h3><button onClick={() => { setEditingId(null); setValues({ phone: '', phone2: '', label: 'Home', line1: '', line2: '', city: '', state: '', country: 'NG', postalCode: '', isDefault: false }); setErrors({}); setMessage(''); setShowForm(true); }} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#6B6457] hover:text-[#1C1A17]"><Plus className="h-4 w-4" /> Add address</button></div>
        {(user.addresses || []).length ? <div className="mt-3 space-y-2">{user.addresses?.map((address) => <div key={address.id} className="flex gap-3 rounded-lg border border-[#E1D9CA] p-3 text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8C7B5A]" /><div className="min-w-0 flex-1"><p className="font-medium">{address.label || 'Address'} {address.isDefault && <span className="ml-2 text-xs text-[#8C7B5A]">Default</span>}</p><p className="text-[#6B6457]">{address.line1}{address.line2 ? `, ${address.line2}` : ''}, {address.city}, {address.state ? `${address.state}, ` : ''}{address.country} {address.postalCode}</p>{address.phone && <p className="mt-1 text-xs text-[#6B6457]">Phone 1: {address.phone}</p>}{address.phone2 && <p className="text-xs text-[#6B6457]">Phone 2: {address.phone2}</p>}</div><button type="button" onClick={() => editAddress(address)} className="self-start p-1 text-[#8C7B5A] hover:text-[#1C1A17]" aria-label="Edit address"><Pencil className="h-4 w-4" /></button></div>)}</div> : <p className="mt-3 text-sm text-[#7A7264]">No delivery addresses saved yet.</p>}
      </div>
      {showForm && <form onSubmit={submit} className="mt-5 space-y-3 border-t border-[#E1D9CA] pt-5"><div className="grid grid-cols-2 gap-3"><AuthField label="Address label" placeholder="Home, Office" value={values.label || ''} onChange={(e) => update('label', e.target.value)} error={errors.label} /><AuthSelect label="Country" value={values.country} onChange={(e) => changeCountry(e.target.value)} error={errors.country}>{COUNTRY_OPTIONS.map((country) => <option key={country.value} value={country.value}>{country.label}</option>)}</AuthSelect></div><AuthField label="Street address (line 1)" placeholder="123 Main Street" autoComplete="street-address" value={values.line1} onChange={(e) => update('line1', e.target.value)} error={errors.line1} /><AuthField label="Apartment, suite or unit (line 2)" placeholder="Optional" value={values.line2 || ''} onChange={(e) => update('line2', e.target.value)} error={errors.line2} /><div className="grid grid-cols-2 gap-3"><AuthField label="City" placeholder="Lagos" value={values.city} onChange={(e) => update('city', e.target.value)} error={errors.city} /><AuthSelect label={values.country === 'CA' ? 'Province / territory' : 'State'} value={values.state || ''} onChange={(e) => update('state', e.target.value)} error={errors.state}><option value="">Select {values.country === 'CA' ? 'a province' : 'a state'}</option>{(REGION_OPTIONS[values.country] || []).map((region) => <option key={region} value={region}>{region}</option>)}</AuthSelect></div><AddressPhoneFields values={values} errors={errors} onChange={update} /><AuthField label="Postal code" placeholder="100001" autoComplete="postal-code" value={values.postalCode} onChange={(e) => update('postalCode', e.target.value)} error={errors.postalCode} /><label className="flex items-center gap-2 text-sm text-[#6B6457]"><input type="checkbox" checked={Boolean(values.isDefault)} onChange={(e) => update('isDefault', e.target.checked)} /> Make this my default address</label><button disabled={busy} className="w-full rounded-full bg-[#1C1A17] py-3 text-xs font-semibold uppercase tracking-widest text-[#FAF9F5] disabled:opacity-60">{busy ? 'Saving…' : 'Save address'}</button></form>}
      {message && <p className="mt-3 text-xs text-[#6B6457]">{message}</p>}
      <section className="mt-6 border-t border-[#E1D9CA] pt-5">
        <Link href="/purchase-history" onClick={onClose} className="flex w-full items-center justify-between gap-3 rounded-lg border border-[#E1D9CA] p-4 text-left text-[#1C1A17] hover:bg-[#EFECE4]">
          <span className="font-serif text-xl">Purchase history</span><span className="text-xs text-[#8C7B5A]">View orders &rarr;</span>
        </Link>
      </section>
      <button disabled={busy} onClick={() => requestSignOut('storefront')} className="mt-7 text-xs uppercase tracking-wider text-[#8C7B5A] underline underline-offset-4 disabled:opacity-50">Sign out</button>
  </Modal>;
}
