'use client';

import { useState } from 'react';
import { loginSchema, type LoginInput } from '../../schemas/auth.schema';
import { useAuth } from '../../context/AuthContext';
import { AuthField } from './AuthField';
import { ApiError } from '../../services/api-client';
import { resendVerificationAction } from '../../services/auth.actions';

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();
  const [values, setValues] = useState<LoginInput>({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const change = (key: keyof LoginInput, value: string) => { setValues(current=>({...current,[key]:value})); setVerificationRequired(false); setResent(false); setMessage(''); };
  const resend = async () => {
    if (resending || busy || resent) return;
    setResending(true);
    try {
      const result = await resendVerificationAction(values);
      setResent(result.verificationEmailSent);
      setMessage(result.verificationEmailSent ? 'Verification email sent. Check your inbox and spam folder. Use the newest link; it expires in 24 hours.' : 'We could not confirm delivery. Please wait a moment and retry.');
    } catch(error) { setMessage(error instanceof Error ? error.message : 'Unable to resend verification email'); }
    finally { setResending(false); }
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); if (busy || resending) return; setMessage(''); setVerificationRequired(false); setResent(false);
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({}); setBusy(true);
    try { await login(parsed.data); onSuccess(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to sign in'); setVerificationRequired(error instanceof ApiError && error.code === 'EMAIL_VERIFICATION_REQUIRED'); } finally { setBusy(false); }
  };
  return <form onSubmit={submit} className="space-y-4">
    <AuthField disabled={busy || resending} label="Email address" type="email" autoComplete="email" value={values.email} onChange={(e) => change('email',e.target.value)} error={errors.email} />
    <AuthField disabled={busy || resending} label="Password" type="password" autoComplete="current-password" value={values.password} onChange={(e) => change('password',e.target.value)} error={errors.password} />
    {message && <p role="status" className={`rounded-md px-3 py-2 text-xs ${verificationRequired ? 'bg-[#F4F4F4] text-[#404040]' : 'bg-neutral-50 text-neutral-700'}`}>{message}</p>}
    {verificationRequired && <button type="button" disabled={resending || busy || resent} onClick={()=>void resend()} className="w-full rounded-full border border-[#737373] px-4 py-3 text-xs font-semibold text-[#535353] disabled:opacity-60">{resending ? 'Sending verification email…' : resent ? 'Verification email sent' : 'Resend verification email'}</button>}
    <button disabled={busy} className="w-full rounded-full bg-[#000000] py-3 text-xs font-semibold uppercase tracking-widest text-[#FFFFFF] transition hover:bg-[#272727] disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
  </form>;
}
