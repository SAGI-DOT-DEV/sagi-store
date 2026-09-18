'use client';
import {useEffect,useState} from 'react';
import {useAuth} from '../../../context/AuthContext';
import {shippingSettingsService,type ShippingSettings as Settings} from '../../../services/admin/shipping-settings.service';
import {ShippingSettingsForm} from './ShippingSettingsForm';
export default function ShippingSettings(){
 const {accessToken}=useAuth();const [retry,setRetry]=useState(0);const key=JSON.stringify([accessToken,retry]);
 const [result,setResult]=useState<{key:string;data?:Settings|null;error?:string}>();
 useEffect(()=>{if(!accessToken)return;let active=true;shippingSettingsService.get(accessToken).then(data=>{if(active)setResult({key,data});}).catch(error=>{if(active)setResult({key,error:error instanceof Error?error.message:'Unable to load shipping settings.'});});return()=>{active=false;};},[accessToken,key]);
 const current=result?.key===key?result:undefined;
 return <div className="p-admin-margin-mobile md:p-admin-margin-desktop space-y-8 max-w-5xl"><header><p className="text-xs uppercase tracking-widest text-admin-on-surface-variant">Delivery configuration</p><h1 className="font-serif text-4xl mt-3">Shipping settings</h1><p className="mt-4 text-admin-on-surface-variant">Manage the dispatch address used for checkout shipping quotes.</p></header><aside className="border border-admin-outline-variant bg-admin-surface-container-low p-5 text-sm">The customer selects their own saved delivery address at checkout. The backend sends that destination, this dispatch address and the cart parcel details to Shippo. This form does not edit customer addresses or calculate a distance in kilometres. Existing orders are unchanged.</aside>
 {!current?<div role="status" className="space-y-4 animate-pulse"><span className="sr-only">Loading shipping settings</span>{[0,1,2].map(i=><div key={i} className="h-28 bg-admin-surface-container-high"/>)}</div>:current.error?<p role="alert">{current.error} <button className="underline" onClick={()=>setRetry(n=>n+1)}>Retry</button></p>:accessToken&&<ShippingSettingsForm key={key} initial={current.data??null} token={accessToken}/>}
 </div>;
}
