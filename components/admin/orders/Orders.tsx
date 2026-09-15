'use client';
import {useEffect,useState} from 'react';
import {useAuth} from '../../../context/AuthContext';
import {adminOrdersService,orderStatus,statusLabel,type AdminOrder} from '../../../services/admin/orders.service';
import {OrderRow} from './OrderRow';
import {OrderDetailModal} from './OrderDetailModal';
export default function Orders(){
 const {accessToken}=useAuth();
 const [q,setQ]=useState(''),[status,setStatus]=useState(''),[page,setPage]=useState(1),[revision,setRevision]=useState(0),[selected,setSelected]=useState<string>();
 const query=new URLSearchParams({page:String(page),limit:'20',...(q.trim()?{q:q.trim()}:{}),...(status?{status}:{})}).toString();
 const key=JSON.stringify([query,accessToken,revision]);
 const [result,setResult]=useState<{key:string;items?:AdminOrder[];total?:number;pages?:number;error?:string}>();
 useEffect(()=>{if(!accessToken)return;let active=true;const timer=setTimeout(()=>{adminOrdersService.list(query,accessToken).then(data=>{if(active)setResult({key,items:data.items,total:data.pagination.total,pages:data.pagination.totalPages});}).catch(()=>{if(active)setResult({key,error:'Unable to load orders. Please retry.'});});},250);return()=>{active=false;clearTimeout(timer);};},[accessToken,key,query]);
 const current=result?.key===key?result:undefined;
 return <div className="p-admin-margin-mobile md:p-admin-margin-desktop">
 <header className="flex flex-wrap justify-between items-end gap-6 mb-8"><div><h1 className="font-serif text-4xl mb-2">Order Ledger</h1><p className="text-admin-on-surface-variant">Review purchases and manage fulfillment.</p></div><button onClick={()=>setRevision(n=>n+1)} className="border px-4 py-3 text-xs uppercase">Refresh</button></header>
 <div className="grid sm:grid-cols-2 gap-6 mb-8"><label className="text-xs uppercase tracking-widest">Search orders<input type="search" maxLength={200} value={q} onChange={event=>{setQ(event.target.value);setPage(1);}} className="block w-full border border-admin-outline-variant bg-transparent p-3 mt-2 text-sm normal-case" placeholder="Name, email or order ID"/></label><label className="text-xs uppercase tracking-widest">Status<select value={status} onChange={event=>{setStatus(event.target.value);setPage(1);}} className="block w-full border border-admin-outline-variant bg-transparent p-3 mt-2 text-sm"><option value="">All statuses</option>{orderStatus.options.map(value=><option key={value} value={value}>{statusLabel(value)}</option>)}</select></label></div>
 <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 border-b py-4 text-xs uppercase text-admin-on-surface-variant">{['Order','Customer','Date','Total','Status','Details'].map(label=><span key={label}>{label}</span>)}</div>
 {!current?<div role="status"><span className="sr-only">Loading orders</span>{[0,1,2,3,4].map(i=><div key={i} className="animate-pulse h-24 border-b flex items-center gap-6"><div className="h-4 w-1/4 bg-admin-surface-container-high"/><div className="h-4 w-1/2 bg-admin-surface-container-high"/></div>)}</div>:current.error?<p role="alert" className="py-10">{current.error} <button onClick={()=>setRevision(n=>n+1)} className="underline">Retry</button></p>:<>
 {current.items?.map(order=><OrderRow key={order.id} order={order} onOpen={()=>setSelected(order.id)}/>)}
 {!current.items?.length&&<p className="py-12 text-center">No orders match your filters.</p>}
 <nav aria-label="Order pagination" className="flex flex-wrap justify-between items-center gap-4 mt-8 text-sm"><button disabled={page===1} onClick={()=>setPage(n=>n-1)} className="border px-4 py-2 disabled:opacity-40">Previous</button><span>{current.total} orders · Page {page} of {Math.max(1,current.pages??0)}</span><button disabled={page>=(current.pages??0)} onClick={()=>setPage(n=>n+1)} className="border px-4 py-2 disabled:opacity-40">Next</button></nav>
 </>}
 {selected&&accessToken&&<OrderDetailModal key={selected} id={selected} token={accessToken} onClose={()=>setSelected(undefined)} onUpdated={()=>setRevision(n=>n+1)}/>}
 </div>;
}
