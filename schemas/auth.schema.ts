import { z } from 'zod';

const password = z.string().min(8, 'Password must be at least 8 characters');

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password,
});

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Enter a valid email address'),
  password,
  confirmPassword: z.string().min(1, 'Confirm your password'),
}).refine((values) => values.password === values.confirmPassword, {
  path: ['confirmPassword'], message: 'Passwords do not match',
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const addressSchema = z.object({
  phone: z.string().trim().max(30).regex(/^\+?[\d\s().-]+$/, 'Enter a valid phone number').refine(value => value.replace(/\D/g, '').length >= 7 && value.replace(/\D/g, '').length <= 15, 'Use 7–15 digits'),
  phone2: z.union([z.literal(''), z.string().trim().max(30).regex(/^\+?[\d\s().-]+$/, 'Enter a valid phone number').refine(value => value.replace(/\D/g, '').length >= 7 && value.replace(/\D/g, '').length <= 15, 'Use 7–15 digits')]).optional(),
  label: z.string().trim().max(80).optional(),
  line1: z.string().trim().min(1, 'Address is required').max(200),
  line2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1, 'City is required').max(100),
  state: z.string().trim().max(100).optional(),
  country: z.string().trim().length(2, 'Use a 2-letter country code').transform((value) => value.toUpperCase()),
  postalCode: z.string().trim().min(3, 'Postal code is required').max(20),
  isDefault: z.boolean().optional(),
});
export type AddressInput = z.input<typeof addressSchema>;
