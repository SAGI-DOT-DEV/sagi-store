'use client';
import {useEffect,useRef,useState} from 'react';
import {Loader2,Upload} from 'lucide-react';
import {AdminImage} from '../AdminImage';
import {uploadProductImage,validateProductImage} from '../../../services/admin/product-images.service';
type Entry={id:number;file:File;url?:string;error?:string};
export function ProductImageUpload({token,onChange,onBlocked}:{token:string;onChange:(urls:string[])=>void;onBlocked:(blocked:boolean)=>void}){
 const [entries,setEntries]=useState<Entry[]>([]),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const current=useRef<Entry[]>([]),nextId=useRef(0),working=useRef(false),active=useRef(true);
 useEffect(()=>{active.current=true;return()=>{active.current=false;};},[]);
 function publish(items:Entry[],uploading:boolean){
  current.current=items;setEntries(items);onChange(items.flatMap(item=>item.url?[item.url]:[]));onBlocked(uploading||items.some(item=>!item.url));
 }
 async function upload(items:Entry[]){
  working.current=true;setBusy(true);publish(current.current,true);
  for(const item of items){
   try{const url=await uploadProductImage(item.file,token);if(!active.current)return;publish(current.current.map(row=>row.id===item.id?{...row,url,error:undefined}:row),true);}
   catch(cause){if(!active.current)return;publish(current.current.map(row=>row.id===item.id?{...row,error:cause instanceof Error?cause.message:'Upload failed. Please retry.'}:row),true);}
  }
  working.current=false;setBusy(false);publish(current.current,false);
 }
 function select(files:File[]){
  if(working.current||!files.length)return;setError('');
  try{if(current.current.length+files.length>50)throw new Error('You can add up to 50 images.');files.forEach(validateProductImage);}
  catch(cause){setError(cause instanceof Error?cause.message:'Invalid image.');return;}
  const added=files.map(file=>({id:nextId.current++,file}));current.current=[...current.current,...added];void upload(added);
 }
 return <section className="border border-admin-outline-variant bg-white p-6 space-y-5"><h2 className="font-serif text-xl">Product images</h2>
 <label className="block border border-dashed border-admin-outline-variant bg-admin-surface p-6 text-center"><Upload className="mx-auto mb-3" size={24}/><span className="block text-sm mb-3">Choose product photos</span><input aria-label="Upload product images" type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={busy||!token||entries.length>=50} onChange={event=>{select(Array.from(event.target.files??[]));event.target.value='';}} className="block w-full text-xs file:mr-3 file:border-0 file:bg-admin-primary file:text-white file:px-4 file:py-2"/></label>
 <p className="text-xs text-admin-on-surface-variant">JPG, PNG or WebP, up to 10 MB each. The first image is the cover. Uploaded URLs are saved when you create the product.</p>
 {error&&<p role="alert" className="text-sm text-neutral-700">{error}</p>}{busy&&<p role="status" className="flex gap-2 text-sm"><Loader2 size={16} className="animate-spin"/>Uploading photos...</p>}
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{entries.map((item,index)=><div key={item.id} className="border border-admin-outline-variant p-3">
 {item.url?<AdminImage src={item.url} alt={item.file.name} className="w-full aspect-square object-cover"/>:<div className="aspect-square bg-admin-surface flex items-center justify-center text-xs">{item.error?'Upload failed':'Waiting for upload'}</div>}
 <p className="text-xs truncate mt-2">{item.file.name}</p>{index===0&&<p className="text-xs mt-1">Cover image</p>}{item.error&&<p role="alert" className="text-xs text-neutral-700 mt-2">{item.error}</p>}
 <div className="flex flex-wrap gap-3 mt-3 text-xs">{item.error&&<button type="button" disabled={busy} onClick={()=>void upload([item])} className="underline">Retry</button>}<button type="button" disabled={busy} onClick={()=>publish(current.current.filter(row=>row.id!==item.id),false)} className="underline">Remove</button></div></div>)}</div>
 {entries.some(item=>item.error)&&<p className="text-xs">Retry or remove failed images before creating the product.</p>}
 </section>;
}
