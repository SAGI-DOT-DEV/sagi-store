'use client';

import { useState } from 'react';
import { registerSchema, type RegisterInput } from '../../schemas/auth.schema';
import { useAuth } from '../../context/AuthContext';
import { AuthField } from './AuthField';

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const { register } = useAuth();
  const [values, setValues] = useState<RegisterInput>({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({}); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [deliveryFailed, setDeliveryFailed] = useState(false);
  const update = (key: keyof RegisterInput, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setMessage(''); const parsed = registerSchema.safeParse(values);
    if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({}); setBusy(true);
    try {
      const result = await register(parsed.data);
      setSent(result.verificationEmailSent);
      setDeliveryFailed(!result.verificationEmailSent);
      setMessage(result.verificationEmailSent
        ? 'Check your inbox and spam folder. Verify your email before signing in.'
        : 'We could not confirm that your verification email was sent. Your account is not active yet. Please wait a moment and retry; use the newest link if you receive more than one.');
    }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to create your account'); } finally { setBusy(false); }
  };
  if (sent) return <div className="space-y-4"><p role="status" className="rounded-md bg-[#F4F4F4] px-3 py-3 text-sm text-[#404040]">{message}</p><button onClick={onSuccess} className="w-full rounded-full bg-[#000000] py-3 text-xs font-semibold uppercase tracking-widest text-[#FFFFFF]">Back to sign in</button><button onClick={()=>{setSent(false);setDeliveryFailed(true);}} className="w-full text-xs underline">Email not received? Retry verification</button></div>;
  return <form onSubmit={submit} className="space-y-4">
    <div className="grid grid-cols-2 gap-3"><AuthField label="First name" value={values.firstName} onChange={(e) => update('firstName', e.target.value)} error={errors.firstName} /><AuthField label="Last name" value={values.lastName} onChange={(e) => update('lastName', e.target.value)} error={errors.lastName} /></div>
    <AuthField label="Email address" type="email" autoComplete="email" value={values.email} onChange={(e) => update('email', e.target.value)} error={errors.email} />
    <AuthField label="Password" type="password" autoComplete="new-password" value={values.password} onChange={(e) => update('password', e.target.value)} error={errors.password} />
    <AuthField label="Confirm password" type="password" autoComplete="new-password" value={values.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} error={errors.confirmPassword} />
    {message && <p role="status" className="rounded-md bg-[#F4F4F4] px-3 py-2 text-xs text-[#404040]">{message}</p>}
    <button disabled={busy} className="w-full rounded-full bg-[#000000] py-3 text-xs font-semibold uppercase tracking-widest text-[#FFFFFF] transition hover:bg-[#272727] disabled:opacity-60">{busy ? 'Creating account…' : deliveryFailed ? 'Retry verification email' : 'Create account'}</button>
  </form>;
}
