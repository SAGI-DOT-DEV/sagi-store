'use client';

import { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ProfileModal } from './ProfileModal';
import { Modal } from '../ui/Modal';
import { AccountButtonSkeleton } from './AccountButtonSkeleton';
import { SignOutModal } from './SignOutModal';

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  if (!open) return null;
  return <Modal open={open} onClose={onClose} title="Account access">
      <div className="mb-6 text-center"><UserCircle className="mx-auto mb-3 h-8 w-8 text-[#8C7B5A]" /><h2 className="font-serif text-3xl text-[#1C1A17]">{mode === 'login' ? 'Welcome back' : 'Join SAGI'}</h2><p className="mt-1 text-sm text-[#7A7264]">{mode === 'login' ? 'Sign in to manage your pantry and orders.' : 'Create an account for a more personal pantry.'}</p></div>
      {mode === 'login' ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={() => setMode('login')} />}
      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="mt-5 w-full text-center text-xs text-[#6B6457] underline underline-offset-4">{mode === 'login' ? 'New to SAGI? Create an account' : 'Already have an account? Sign in'}</button>
  </Modal>;
}

export function AccountButton() {
  const { user, isLoading, sessionError, retrySession } = useAuth();
  const { setAuthModalOpen, setProfileModalOpen } = useAuth();
  if (isLoading) return <AccountButtonSkeleton />;
  if (sessionError && !user) return <button onClick={retrySession} className="rounded-full bg-[#1C1A17] px-4 py-2.5 text-xs text-[#FAF9F5]">Retry account</button>;
  return <button onClick={() => user ? setProfileModalOpen(true) : setAuthModalOpen(true)} className="flex items-center gap-2 rounded-full bg-[#1C1A17] px-3.5 py-2.5 text-[#FAF9F5] shadow-sm transition-colors hover:bg-[#33302B]" title={user ? 'Open your profile' : 'Sign in or create an account'}><UserCircle className="h-5 w-5 text-[#D4AF37]" /><span className="text-xs font-semibold uppercase tracking-wider">{user ? 'Profile' : 'Sign in'}</span></button>;
}

// Mounted once in the root layout, never once per desktop/mobile button.
export function AccountModalHost() {
  const { user, authModalOpen, setAuthModalOpen, profileModalOpen, setProfileModalOpen, signOutModal, cancelSignOut } = useAuth();
  if (signOutModal && user) return <SignOutModal admin={signOutModal === 'admin'} onCancel={cancelSignOut} />;
  if (authModalOpen) return <AuthModal open onClose={() => setAuthModalOpen(false)} />;
  if (profileModalOpen && user) return <ProfileModal open onClose={() => setProfileModalOpen(false)} />;
  return null;
}
