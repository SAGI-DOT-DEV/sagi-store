import { apiRequest } from './api-client';
import type { LoginInput, RegisterInput, AddressInput } from '../schemas/auth.schema';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  profile?: { firstName?: string; lastName?: string; phone?: string | null } | null;
  addresses?: Address[];
}
export interface Address { id: string; phone?: string | null; phone2?: string | null; label?: string | null; line1: string; line2?: string | null; city: string; state?: string | null; country: string; postalCode: string; isDefault: boolean; }

interface AuthResult { user: AuthUser; accessToken: string; }

export const authService = {
  resendVerification: (input: LoginInput) => apiRequest<{verificationEmailSent:boolean}>('/api/v1/auth/resend-verification', {method:'POST',body:JSON.stringify(input)}),
  login: (input: LoginInput) => apiRequest<AuthResult>('/api/v1/auth/login', { method: 'POST', body: JSON.stringify(input) }),
  verifyEmail: (token: string) => apiRequest<{verified:boolean}>('/api/v1/auth/verify-email', {method:'POST',body:JSON.stringify({token})}),
  register: (input: RegisterInput) => {
    const { confirmPassword: _confirmPassword, ...body } = input;
    return apiRequest<{ email: string; verificationEmailSent: boolean }>('/api/v1/auth/register', { method: 'POST', body: JSON.stringify(body) });
  },
  me: (token: string) => apiRequest<AuthUser>('/api/v1/auth/me', {}, token),
  refresh: () => apiRequest<{ accessToken: string }>('/api/v1/auth/refresh', { method: 'POST' }),
  logout: () => apiRequest<null>('/api/v1/auth/logout', { method: 'POST' }),
  createAddress: (input: AddressInput, token: string) => apiRequest<Address>('/api/v1/addresses', { method: 'POST', body: JSON.stringify(input) }, token),
  updateAddress: (id: string, input: Partial<AddressInput>, token: string) => apiRequest<Address>(`/api/v1/addresses/${id}`, { method: 'PATCH', body: JSON.stringify(input) }, token),
};
