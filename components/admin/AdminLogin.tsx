'use client';
import {useState,type FormEvent} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Loader2} from 'lucide-react';
import {useAuth} from '../../context/AuthContext';
import {loginSchema} from '../../schemas/auth.schema';
export function AdminLogin(){
 const router = useRouter();
 const {login}=useAuth();
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[pending,setPending]=useState(false);
 async function submit(event:FormEvent){event.preventDefault();if(pending)return;const parsed=loginSchema.safeParse({email,password});if(!parsed.success){setError(parsed.error.issues[0].message);return;}setPending(true);setError('');try{await login(parsed.data);router.replace('/admin');}catch(cause){setError(cause instanceof Error?cause.message:'Unable to sign in.');}finally{setPending(false);}}
 return <div className="min-h-screen flex flex-col justify-center items-center p-6"><div className="w-full max-w-md"><div className="text-center mb-12"><Link href="/" className="font-serif text-5xl tracking-tighter">SAGI</Link><h1 className="mt-4 text-base text-admin-on-surface-variant">Sign in to your admin account</h1></div>
 <form onSubmit={submit} className="space-y-8"><label className="block"><span className="text-xs uppercase tracking-widest">Email address</span><input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} disabled={pending} className="sagi-input w-full h-12 mt-2" placeholder="Enter your email"/></label><label className="block"><span className="text-xs uppercase tracking-widest">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} disabled={pending} className="sagi-input w-full h-12 mt-2" placeholder="Enter your password"/></label>
 {error&&<p role="alert" className="text-red-700 text-sm">{error}</p>}
 <button type="submit" disabled={pending} className="w-full h-12 bg-black text-white uppercase tracking-widest text-xs flex items-center justify-center gap-2">{pending&&<Loader2 size={16} className="animate-spin"/>}{pending?'Signing in...':'Sign in'}</button></form><p className="text-sm text-center mt-8 text-admin-on-surface-variant">Access is restricted to administrator accounts.</p><Link href="/" className="block text-center mt-4 underline text-sm">Return to the store</Link></div></div>;
}
