'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminGate } from './AdminGate';
import Icon from './Icon';
import {AdminNavigation} from './AdminNavigation';
export function AdminShell({children}:{children:ReactNode}) {
 const [open,setOpen]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const pathname=usePathname(),router=useRouter();const {logout}=useAuth();
 useEffect(()=>{if(!open)return;const handler=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};document.addEventListener('keydown',handler);return ()=>document.removeEventListener('keydown',handler);},[open]);
 async function signOut(){setBusy(true);try{await logout();router.replace('/admin/login');}catch{setError('Could not sign out. Please retry.');}finally{setBusy(false);}}
 return <AdminGate><a href="#admin-content" className="sr-only focus:not-sr-only">Skip to content</a>
 <header className="md:hidden flex fixed inset-x-0 top-0 h-16 items-center justify-between border-b border-admin-outline-variant bg-admin-surface px-5 z-40"><Link href="/admin" className="font-serif text-2xl">SAGI Admin</Link><button aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="admin-navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>
 {open&&<button aria-label="Close navigation" className="fixed inset-0 top-16 z-40 bg-black/30 md:hidden" onClick={()=>setOpen(false)}/>}
 <nav id="admin-navigation" aria-label="Admin navigation" className={`fixed left-0 top-16 bottom-0 md:top-0 w-64 z-50 flex-col border-r border-admin-outline-variant bg-admin-surface-container-low p-4 overflow-y-auto ${open?'flex':'hidden md:flex'}`}>
 <Link href="/admin" onClick={()=>setOpen(false)} className="my-6 px-4 flex gap-3 items-center"><Icon name="diamond"/><div><span className="font-serif text-xl">SAGI Admin</span><span className="block text-[10px] uppercase tracking-widest mt-1">Management Suite</span></div></Link>
 <AdminNavigation key={pathname} pathname={pathname} onNavigate={()=>setOpen(false)}/>
 <Link href="/" className="px-4 py-3 text-sm underline">Visit storefront</Link>
 <button disabled={busy} onClick={signOut} className="flex gap-3 items-center px-4 py-3 border-t border-admin-outline-variant text-sm"><LogOut size={18}/>{busy?'Signing out...':'Sign out'}</button>{error&&<p role="alert" className="text-sm text-red-700">{error}</p>}
 </nav>
 <main id="admin-content" className="md:ml-64 pt-16 md:pt-0 min-w-0">{pathname!=='/admin'&&!pathname.startsWith('/admin/products')&&!pathname.startsWith('/admin/categories')&&!pathname.startsWith('/admin/orders')&&!pathname.startsWith('/admin/inventory')&&!pathname.startsWith('/admin/reports')&&!pathname.startsWith('/admin/transactions')&&!pathname.startsWith('/admin/analytics')&&!pathname.startsWith('/admin/users')&&!pathname.startsWith('/admin/distributors')&&!pathname.startsWith('/admin/shipping-settings')&&<div className="border-b border-admin-outline-variant bg-[#fff8df] px-5 py-3 text-xs text-[#574500]">Design preview — sample data in CAD. Admin data and save/export actions are not connected yet.</div>}{children}</main>
 </AdminGate>;
}
