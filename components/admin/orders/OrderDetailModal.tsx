'use client';
import {useEffect,useRef,useState} from 'react';
import {Modal} from '../../ui/Modal';
import {adminOrdersService,nextFulfillment,statusLabel,type AdminOrderDetail} from '../../../services/admin/orders.service';
import {updateOrderStatus} from '../../../services/admin/orders.actions';
import {ApiError} from '../../../services/api-client';
import {OrderDetailContent} from './OrderDetailContent';
export function OrderDetailModal({id,token,onClose,onUpdated}:{id:string;token:string;onClose:()=>void;onUpdated:()=>void}){
 const [revision,setRevision]=useState(0),[result,setResult]=useState<{key:string;order?:AdminOrderDetail;error?:string}>();
 const [confirm,setConfirm]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');const submitting=useRef(false);
 const key=JSON.stringify([id,token,revision]);
 useEffect(()=>{let active=true;adminOrdersService.get(id,token).then(order=>{if(active)setResult({key,order});}).catch(()=>{if(active)setResult({key,error:'Unable to load this order.'});});return()=>{active=false;};},[id,token,key]);
 const current=result?.key===key?result:undefined;const next=current?.order?nextFulfillment(current.order.status):undefined;
 async function update(){
  if(!next||submitting.current)return;submitting.current=true;setBusy(true);setError('');setMessage('');
  try{await updateOrderStatus(id,next,token);setMessage('Order updated successfully.');setConfirm(false);onUpdated();setRevision(n=>n+1);}
  catch(cause){setError(cause instanceof ApiError?cause.message:'Unable to confirm the update. Refresh the order before retrying.');setConfirm(false);setRevision(n=>n+1);onUpdated();}
  finally{submitting.current=false;setBusy(false);}
 }
 return <Modal open onClose={onClose} title="Order details" maxWidth="max-w-3xl"><div className="text-[#000000]"><h2 className="font-serif text-3xl pr-8">Order details</h2><p className="text-xs break-all mt-3">{id}</p>
 {message&&<p role="status" className="mt-4 text-neutral-800">{message}</p>}{error&&<p role="alert" className="mt-4 text-neutral-700">{error}</p>}
 {!current?<div role="status" className="h-48 mt-6 animate-pulse bg-[#F4F4F4]"><span className="sr-only">Loading order</span></div>:current.error?<p role="alert" className="py-8">{current.error} <button onClick={()=>setRevision(n=>n+1)} className="underline">Retry</button></p>:current.order&&<>
 <OrderDetailContent order={current.order}/>
 {next&&<section className="border-t mt-6 pt-6"><h3 className="font-serif text-xl">Fulfillment</h3>{confirm?<><p className="text-sm my-3">Change this order to {statusLabel(next)}? This triggers the existing customer notification flow.</p><div className="flex gap-3"><button disabled={busy} onClick={update} className="bg-[#000000] text-white px-4 py-3 text-xs">{busy?'Updating...':'Confirm update'}</button><button disabled={busy} onClick={()=>setConfirm(false)} className="border px-4 py-3 text-xs">Cancel</button></div></>:<button disabled={busy} onClick={()=>setConfirm(true)} className="mt-3 bg-[#000000] text-white px-4 py-3 text-xs">Mark as {statusLabel(next)}</button>}</section>}
 </>}</div></Modal>;
}
