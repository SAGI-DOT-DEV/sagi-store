import { StorefrontShell } from '../../components/StorefrontShell';
import { EmailVerification } from '../../components/auth/EmailVerification';
export const metadata={title:'Verify your email | SAGI',robots:{index:false,follow:false},referrer:'no-referrer' as const};
export default async function VerifyEmailPage({searchParams}:{searchParams:Promise<{token?:string|string[]}>}) {
  const {token}=await searchParams;
  const valid=typeof token==='string'&&/^[a-zA-Z0-9_-]{20,128}$/.test(token);
  return <StorefrontShell><EmailVerification token={valid?token:null}/></StorefrontShell>;
}
