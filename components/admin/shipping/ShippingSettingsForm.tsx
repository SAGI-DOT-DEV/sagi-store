'use client';
import {useRef,useState,type FormEvent} from 'react';
import {shippingSettingsSchema,type ShippingSettings} from '../../../services/admin/shipping-settings.service';
import {saveShippingSettings} from '../../../services/admin/shipping-settings.actions';
import {ShippingField} from './ShippingField';
const provinces=[['AB','Alberta'],['BC','British Columbia'],['MB','Manitoba'],['NB','New Brunswick'],['NL','Newfoundland and Labrador'],['NS','Nova Scotia'],['NT','Northwest Territories'],['NU','Nunavut'],['ON','Ontario'],['PE','Prince Edward Island'],['QC','Quebec'],['SK','Saskatchewan'],['YT','Yukon']];
export function ShippingSettingsForm({initial,token}:{initial:ShippingSettings|null;token:string}){
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[saved,setSaved]=useState(false);const sending=useRef(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(sending.current)return;setError('');setSaved(false);
  const data=new FormData(event.currentTarget),text=(key:string)=>String(data.get(key)??'').trim();
  const parsed=shippingSettingsSchema.safeParse({shipFromName:text('shipFromName'),shipFromCompany:text('shipFromCompany')||null,shipFromPhone:text('shipFromPhone')||null,shipFromEmail:text('shipFromEmail')||null,shipFromStreet1:text('shipFromStreet1'),shipFromStreet2:text('shipFromStreet2')||null,shipFromCity:text('shipFromCity'),shipFromState:text('shipFromState')||null,shipFromPostalCode:text('shipFromPostalCode').toUpperCase(),shipFromCountry:'CA',currency:'CAD',freeShippingThreshold:text('freeShippingThreshold')?Number(text('freeShippingThreshold')):null});
  if(!parsed.success){setError(parsed.error.issues.map(issue=>issue.message).join(' '));return;}
  sending.current=true;setBusy(true);
  try{await saveShippingSettings(parsed.data,token);setSaved(true);}catch(cause){setError(cause instanceof Error?cause.message:'Unable to save shipping settings.');}finally{sending.current=false;setBusy(false);}
 }
 const province=provinces.find(([code,name])=>[code,name].includes(initial?.shipFromState??''))?.[0]??initial?.shipFromState??'';
 return <form onSubmit={submit} onChange={()=>setSaved(false)} className="space-y-6">
  <fieldset disabled={busy} className="border border-admin-outline-variant bg-white p-6 md:p-8 space-y-6 disabled:opacity-60"><legend className="font-serif text-2xl px-2">Dispatch address</legend><p className="text-sm text-admin-on-surface-variant">Where orders leave your warehouse. Shippo uses this as the shipping origin.</p>
   <div className="grid md:grid-cols-2 gap-5"><ShippingField label="Sender name" name="shipFromName" required maxLength={150} defaultValue={initial?.shipFromName??''}/><ShippingField label="Company (optional)" name="shipFromCompany" maxLength={150} defaultValue={initial?.shipFromCompany??''}/><ShippingField label="Phone (optional)" name="shipFromPhone" type="tel" maxLength={30} defaultValue={initial?.shipFromPhone??''}/><ShippingField label="Email (optional)" name="shipFromEmail" type="email" defaultValue={initial?.shipFromEmail??''}/></div>
   <ShippingField label="Street address" name="shipFromStreet1" required maxLength={200} defaultValue={initial?.shipFromStreet1??''}/><ShippingField label="Unit / suite (optional)" name="shipFromStreet2" maxLength={200} defaultValue={initial?.shipFromStreet2??''}/>
   <div className="grid md:grid-cols-2 gap-5"><ShippingField label="City" name="shipFromCity" required maxLength={100} defaultValue={initial?.shipFromCity??''}/><label className="block text-xs uppercase tracking-widest text-admin-on-surface-variant">Province / territory<select name="shipFromState" defaultValue={province} className="block w-full border border-admin-outline-variant bg-admin-surface mt-2 p-3 text-sm"><option value="">Select province</option>{province&&!provinces.some(([code])=>code===province)&&<option value={province}>{province}</option>}{provinces.map(([code,name])=><option key={code} value={code}>{name}</option>)}</select></label><ShippingField label="Postal code" name="shipFromPostalCode" required minLength={3} maxLength={20} defaultValue={initial?.shipFromPostalCode??''}/><ShippingField label="Country" value="Canada (CA)" readOnly/></div>
  </fieldset>
  <fieldset disabled={busy} className="border border-admin-outline-variant bg-white p-6 md:p-8 space-y-5"><legend className="font-serif text-2xl px-2">Shipping policy</legend><div className="grid md:grid-cols-2 gap-5"><ShippingField label="Free shipping minimum (CAD)" name="freeShippingThreshold" type="number" min="0" step="0.01" defaultValue={initial?.freeShippingThreshold??''}/><ShippingField label="Currency" value="CAD" readOnly/></div><p className="text-sm text-admin-on-surface-variant">Leave the minimum blank to disable free shipping. Zero gives free shipping to every non-empty cart. Eligible carts bypass Shippo rates.</p></fieldset>
  {error&&<p role="alert" className="text-sm text-neutral-700 border p-4">{error}</p>}{saved&&<p role="status" className="text-sm border border-admin-outline-variant p-4">Shipping settings saved. New shipping-rate requests will use this address.</p>}
  <button disabled={busy} type="submit" className="bg-admin-primary text-white px-6 py-3 text-xs uppercase tracking-widest disabled:opacity-50">{busy?'Saving…':'Save shipping settings'}</button>
 </form>;
}
