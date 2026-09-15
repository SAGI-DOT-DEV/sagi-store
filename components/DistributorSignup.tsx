'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { distributorSchema, type DistributorInput } from '../schemas/distributor.schema';
import { signupDistributorAction } from '../services/distributor.actions';
import { ApiError } from '../services/api-client';

const fields = [
  { name: 'firstName', label: 'First name', type: 'text', autoComplete: 'given-name', maxLength: 100 },
  { name: 'lastName', label: 'Last name', type: 'text', autoComplete: 'family-name', maxLength: 100 },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', maxLength: undefined },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', maxLength: 30 },
] as const;
const empty: DistributorInput = { firstName: '', lastName: '', email: '', phone: '' };

export function DistributorSignup() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof DistributorInput, string>>>({});
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setError('');
    const parsed = distributorSchema.safeParse(values);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof DistributorInput] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    submitting.current = true;
    setPending(true);
    try {
      await signupDistributorAction(parsed.data);
      setComplete(true);
      setValues(empty);
    } catch (cause) {
      setError(cause instanceof ApiError && cause.status === 409
        ? 'This email is already registered for distributor signup.'
        : 'We could not submit your registration. Please try again.');
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return <section id="distributor-signup" tabIndex={-1} className="lg:col-span-5 space-y-6 scroll-mt-28 focus:outline-none" aria-labelledby="distributor-heading">
    <div className="space-y-2">
      <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">Become a distributor</span>
      <h3 id="distributor-heading" className="font-serif text-2xl sm:text-3xl text-[#FAF9F5] leading-snug">Bring SAGI to your community.</h3>
      <p className="text-xs text-[#9E978A] leading-relaxed max-w-md">Interested in distributing our products? Register your contact details to express your interest in becoming a SAGI distributor.</p>
    </div>
    {complete ? <div role="status" className="flex items-start gap-3 rounded-lg border border-[#3E382E] bg-[#24211D] p-4 text-sm text-[#E2D8C7]">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
      <p>Thank you for your interest. Your distributor registration has been received.</p>
    </div> : <form onSubmit={submit} noValidate className="max-w-md space-y-4">
      <fieldset disabled={pending} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <legend className="sr-only">Distributor contact details</legend>
        {fields.map((field) => <label key={field.name} className="block space-y-2">
          <span className="text-xs text-[#C5BDAE]">{field.label}</span>
          <input {...field} required value={values[field.name]} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? 'distributor-' + field.name + '-error' : undefined} className="w-full rounded-sm border border-[#36322A] bg-[#1D1B18] px-3 py-3 text-sm text-[#FAF9F5] outline-none focus:border-[#D4AF37] disabled:opacity-60" />
          {errors[field.name] && <span id={'distributor-' + field.name + '-error'} className="block text-xs text-red-300">{errors[field.name]}</span>}
        </label>)}
      </fieldset>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={pending} className="flex items-center justify-center gap-2 bg-[#D4AF37] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#141311] transition-colors hover:bg-[#C29D2C] disabled:opacity-60">
        {pending ? <><Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />Submitting...</> : <>Sign up as a distributor<ArrowRight aria-hidden="true" className="h-4 w-4" /></>}
      </button>
    </form>}
  </section>;
}
