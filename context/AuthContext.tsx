'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authService, type AuthUser } from '../services/auth.service';
import { loginAction, registerAction } from '../services/auth.actions';
import { addressSchema, type AddressInput, type LoginInput, type RegisterInput } from '../schemas/auth.schema';
import { ApiError, saveSessionToken, TOKEN_KEY } from '../services/api-client';
import { z } from 'zod';

const USER_KEY = 'sagi_auth_user';
const cachedUserSchema = z.object({
  id: z.string(), email: z.string().email(), role: z.string(),
  profile: z.object({ firstName: z.string().optional(), lastName: z.string().optional() }).nullable().optional(),
  addresses: z.array(z.object({
    id: z.string(), label: z.string().nullable().optional(), line1: z.string(), line2: z.string().nullable().optional(),
    city: z.string(), state: z.string().nullable().optional(), country: z.string(), postalCode: z.string(), isDefault: z.boolean(),
  })).optional(),
});
function clearUserCache() { try { window.localStorage.removeItem(USER_KEY); } catch { /* Storage may be disabled. */ } }

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  sessionError: boolean;
  retrySession: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<{ email: string; verificationEmailSent: boolean }>;
  logout: () => Promise<void>;
  addAddress: (address: AddressInput) => Promise<void>;
  updateAddress: (id: string, address: AddressInput) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const [restoreAttempt, setRestoreAttempt] = useState(0);
  const retrySession = () => { setIsLoading(true); setSessionError(false); setRestoreAttempt(value => value + 1); };

  useEffect(() => {
    if (!user) return;
    try { window.localStorage.setItem(USER_KEY, JSON.stringify(user)); } catch { /* Cache is optional. */ }
  }, [user]);

  useEffect(() => {
    const handleSessionExpired = () => {
      clearUserCache();
      window.localStorage.removeItem(TOKEN_KEY);
      setAccessToken(null);
      setUser(null);
      setAuthModalOpen(true);
    };
    const handleRefreshed = (event: Event) => {
      setAccessToken((event as CustomEvent<string>).detail);
      setAuthModalOpen(false);
    };
    window.addEventListener('sagi:session-expired', handleSessionExpired);
    window.addEventListener('sagi:session-refreshed', handleRefreshed);
    return () => {
      window.removeEventListener('sagi:session-expired', handleSessionExpired);
      window.removeEventListener('sagi:session-refreshed', handleRefreshed);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const restore = async () => {
      const saved = window.localStorage.getItem(TOKEN_KEY);
      if (!saved) { clearUserCache(); setIsLoading(false); return; }
      try {
        const cache = cachedUserSchema.safeParse(JSON.parse(window.localStorage.getItem(USER_KEY) || 'null'));
        if (cache.success) {
          setUser(cache.data);
          setAccessToken(saved);
          setIsLoading(false);
        }
      } catch { clearUserCache(); }
      try {
        const restoredUser = await authService.me(saved);
        if (!active || !window.localStorage.getItem(TOKEN_KEY)) return;
        setAccessToken(window.localStorage.getItem(TOKEN_KEY));
        setUser(restoredUser);
        setAuthModalOpen(false);
      } catch (error) {
        if (active && !(error instanceof ApiError && error.status === 401)) setSessionError(true);
      } finally { if (active) setIsLoading(false); }
    };
    void restore();
    return () => { active = false; };
  }, [restoreAttempt]);

  const login = async (input: LoginInput) => {
    const result = await loginAction(input);
    saveSessionToken(result.accessToken);
    setAccessToken(result.accessToken);
    try { setUser(await authService.me(result.accessToken)); } catch (error) {
      if (!window.localStorage.getItem(TOKEN_KEY) || (error instanceof ApiError && error.status === 401)) throw error;
      setUser(result.user);
    }
    setAuthModalOpen(false);
    setSessionError(false);
  };

  const register = (input: RegisterInput) => registerAction(input);

  const logout = async () => {
    clearUserCache();
    saveSessionToken(null);
    setAccessToken(null); setUser(null); setAuthModalOpen(false);
    try { await authService.logout(); } finally {
      window.localStorage.removeItem(TOKEN_KEY); setAccessToken(null); setUser(null);
    }
  };

  const addAddress = async (input: AddressInput) => {
    if (!accessToken) throw new Error('Please sign in to add an address');
    const address = await authService.createAddress(addressSchema.parse(input), accessToken);
    setUser((current) => current ? { ...current, addresses: [address, ...(current.addresses || []).filter((item) => item.id !== address.id).map((item) => address.isDefault ? { ...item, isDefault: false } : item)] } : current);
  };

  const updateAddress = async (id: string, input: AddressInput) => {
    if (!accessToken) throw new Error('Please sign in to edit an address');
    const address = await authService.updateAddress(id, addressSchema.parse(input), accessToken);
    setUser((current) => current ? { ...current, addresses: (current.addresses || []).map((item) => item.id === id ? address : (address.isDefault ? { ...item, isDefault: false } : item)) } : current);
  };

  return <AuthContext.Provider value={{ user, accessToken, isLoading, sessionError, retrySession, authModalOpen, setAuthModalOpen, login, register, logout, addAddress, updateAddress }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
