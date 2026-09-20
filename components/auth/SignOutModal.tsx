'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LoaderCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../ui/Modal';

export function SignOutModal({ admin, onCancel }: { admin: boolean; onCancel: () => void }) {
  const { logout } = useAuth();
  const router = useRouter();
  const lock = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const cancel = () => { if (!lock.current) onCancel(); };
  const confirm = async () => {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError('');
    try { await logout(); if (admin) router.replace('/admin/login'); }
    catch { setError('Could not complete sign out. Please try again.'); }
    finally { lock.current = false; setBusy(false); }
  };
  return <Modal open onClose={cancel} dismissible={!busy} title="Confirm sign out">
    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F4F4] text-[#737373]"><LogOut aria-hidden="true" className="h-6 w-6" /></span>
    <h2 className="font-serif text-3xl text-[#000000]">Sign out of SAGI?</h2>
    <p className="mt-3 text-sm leading-6 text-[#535353]">{admin ? 'You’ll need to sign in again to access the management suite.' : 'You’ll need to sign in again to manage your bag, addresses and orders.'}</p>
    {error && <p role="alert" className="mt-4 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-700">{error}</p>}
    <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
      <button type="button" autoFocus disabled={busy} onClick={cancel} className="flex-1 rounded-full border border-[#D4D4D4] px-5 py-3 text-sm text-[#535353] disabled:opacity-50">Stay signed in</button>
      <button type="button" disabled={busy} aria-busy={busy} onClick={()=>void confirm()} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#000000] px-5 py-3 text-sm text-[#FFFFFF] disabled:opacity-50">{busy && <LoaderCircle className="h-4 w-4 animate-spin" />}{busy ? 'Signing out…' : 'Sign out'}</button>
    </div>
  </Modal>;
}
