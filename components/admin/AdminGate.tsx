'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
export function AdminGate({children}:{children:ReactNode}) {
 const router = useRouter();
 const {user,accessToken,isLoading,sessionError,retrySession}=useAuth();
 
 const [checked,setChecked]=useState<{token:string;allowed:boolean;error?:string}>();
 const [attempt,setAttempt]=useState(0);
 useEffect(()=>{if(!isLoading&&!user&&!sessionError)router.replace('/admin/login');},[isLoading,user,sessionError,router]);
 useEffect(()=>{if(!accessToken)return;let active=true;authService.me(accessToken).then(me=>{if(active)setChecked({token:accessToken,allowed:me.role==='ADMIN'});}).catch(()=>{if(active)setChecked({token:accessToken,allowed:false,error:'Unable to verify administrator access.'});});return ()=>{active=false;};},[accessToken,attempt]);
 if(sessionError || checked?.token===accessToken && checked?.error) return <div className="p-12 text-center" role="alert"><p>Unable to verify administrator access. Check your connection.</p><button className="mt-4 underline" onClick={()=>{retrySession();setAttempt(n=>n+1);}}>Try again</button></div>;
 if(isLoading||!user||!accessToken||checked?.token!==accessToken)return <div role="status" className="p-12 text-center motion-safe:animate-pulse">Checking administrator access...</div>;
 if(!checked.allowed)return <div className="p-12 text-center"><h1 className="font-serif text-3xl">Administrator access required</h1><p className="my-4">Your account does not have access to this area.</p><Link className="underline" href="/">Return to the store</Link></div>;
 return <>{children}</>;
}
