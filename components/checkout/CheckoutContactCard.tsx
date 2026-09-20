import { Mail, Phone, UserRound } from 'lucide-react';
import type { Address, AuthUser } from '../../services/auth.service';

export function CheckoutContactCard({ user, address }: { user: AuthUser; address?: Address }) {
  const name = [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(' ') || 'Your account';
  return <section className="overflow-hidden rounded-2xl border border-[#E4E4E4] bg-[#FFFFFF]">
    <div className="flex items-center gap-4 border-b border-[#E4E4E4] bg-[#FFFFFF] px-5 py-5 sm:px-6">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#000000] text-[#737373]"><UserRound className="h-5 w-5" aria-hidden="true" /></span>
      <div><p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-[#737373]">Your details</p><h2 className="font-serif text-2xl text-[#000000]">Contact information</h2></div>
    </div>
    <div className="space-y-4 p-5 sm:p-6">
      <p className="font-serif text-xl text-[#000000]">{name}</p>
      <div className="flex items-start gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-[#737373]" aria-hidden="true" /><div className="min-w-0"><p className="text-[10px] uppercase tracking-widest text-[#535353]">Order updates</p><p className="mt-1 break-all text-sm text-[#000000]">{user.email}</p></div></div>
      {address?.phone && <div className="flex items-start gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-[#737373]" aria-hidden="true" /><div><p className="text-[10px] uppercase tracking-widest text-[#535353]">Delivery contact</p><p className="mt-1 text-sm">{address.phone}</p>{address.phone2 && <p className="mt-1 text-xs text-[#535353]">Alternative: {address.phone2}</p>}</div></div>}
      <p className="border-t border-[#E4E4E4] pt-4 text-xs leading-5 text-[#535353]">Your confirmation and order updates will be sent to this email.</p>
    </div>
  </section>;
}
