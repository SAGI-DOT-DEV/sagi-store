import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '../schemas/auth.schema';
import { authService } from './auth.service';

export async function loginAction(input: LoginInput) {
  return authService.login(loginSchema.parse(input));
}

export async function resendVerificationAction(input: LoginInput) {
  return authService.resendVerification(loginSchema.parse(input));
}

export async function registerAction(input: RegisterInput) {
  return authService.register(registerSchema.parse(input));
}
