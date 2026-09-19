import type { Address, AuthUser } from './auth.service';
import type { AddressInput } from '../schemas/auth.schema';

export function addressFormValues(address: Address, profile?: AuthUser['profile']): AddressInput {
  return {
    phone: address.phone?.trim() || profile?.phone?.trim() || '',
    phone2: address.phone2 || '',
    label: address.label || 'Home',
    line1: address.line1,
    line2: address.line2 || '',
    city: address.city,
    state: address.state || '',
    country: address.country,
    postalCode: address.postalCode || '',
    isDefault: address.isDefault,
  };
}
