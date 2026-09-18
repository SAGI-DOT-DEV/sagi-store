'use client';
import {useState} from 'react';
import {MailCheck,LoaderCircle} from 'lucide-react';
import {authService} from '../../services/auth.service';
import {useAuth} from '../../context/AuthContext';
export function EmailVerification({token}:{token:string|null}) {
  const {setAuthModalOpen}=useAuth();
  const [busy,setBusy]=useState(false),[verified,setVerified]=useState(false),[message,setMessage]=useState('');
  async function verify(){
    if(!token||busy)return;
    setBusy(true);setMessage('');
    try{const result=await authService.verifyEmail(token);setVerified(result.verified);setMessage(result.verified?'Your email is verified. You can now sign in.':'This link has expired or has already been used. Try signing in, or request a new link by submitting the registration form again.');}
    catch(error){setMessage(error instanceof Error?error.message:'Unable to verify your email. Please retry.');}
    finally{setBusy(false);}
  }
  return <section className="mx-auto max-w-xl px-6 py-24 text-center"><MailCheck className="mx-auto mb-5 h-12 w-12 text-[#8C7B5A]"/><h1 className="font-serif text-4xl text-[#1C1A17]">{verified?'Email confirmed':'Confirm your email'}</h1><p role="status" className="my-6 text-sm leading-6 text-[#6B6457]">{message||(token?'Confirm your email to finish creating your SAGI account.':'This link is missing a valid verification token. Request a new verification email.')}</p>{token&&!verified&&<button disabled={busy} onClick={verify} className="inline-flex items-center gap-2 rounded-full bg-[#1C1A17] px-6 py-3 text-sm text-[#FAF9F5] disabled:opacity-60">{busy&&<LoaderCircle className="h-4 w-4 animate-spin"/>}{busy?'Verifying…':'Verify email'}</button>}<button onClick={()=>setAuthModalOpen(true)} className="mt-5 block w-full text-sm text-[#6B6457] underline">Open sign in</button></section>;
}
