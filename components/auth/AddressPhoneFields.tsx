'use client';

import type { AddressInput } from '../../schemas/auth.schema';
import { AuthField } from './AuthField';

export function AddressPhoneFields({ values, errors, onChange }: {
  values: Pick<AddressInput, 'phone' | 'phone2'>;
  errors: Record<string, string>;
  onChange: (key: 'phone' | 'phone2', value: string) => void;
}) {
  return <div className="grid gap-3 sm:grid-cols-2">
    <AuthField label="Phone number 1" type="tel" autoComplete="tel" required placeholder="Include country code" value={values.phone || ''} onChange={e => onChange('phone', e.target.value)} error={errors.phone} />
    <AuthField label="Phone number 2 (optional)" type="tel" placeholder="Alternative contact number" value={values.phone2 || ''} onChange={e => onChange('phone2', e.target.value)} error={errors.phone2} />
  </div>;
}
