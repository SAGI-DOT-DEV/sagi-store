'use client';

import { useState } from 'react';
import { loginSchema, type LoginInput } from '../../schemas/auth.schema';
import { useAuth } from '../../context/AuthContext';
import { AuthField } from './AuthField';

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();
  const [values, setValues] = useState<LoginInput>({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setMessage('');
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) { setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({}); setBusy(true);
    try { await login(parsed.data); onSuccess(); } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to sign in'); } finally { setBusy(false); }
  };
  return <form onSubmit={submit} className="space-y-4">
    <AuthField label="Email address" type="email" autoComplete="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} error={errors.email} />
    <AuthField label="Password" type="password" autoComplete="current-password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} error={errors.password} />
    {message && <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{message}</p>}
    <button disabled={busy} className="w-full rounded-full bg-[#1C1A17] py-3 text-xs font-semibold uppercase tracking-widest text-[#FAF9F5] transition hover:bg-[#33302B] disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>
  </form>;
}
