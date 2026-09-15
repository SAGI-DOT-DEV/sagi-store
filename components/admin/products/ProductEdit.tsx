'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {useAuth} from '../../../context/AuthContext';
import {adminProductsService} from '../../../services/admin/products.service';
import type {AdminProduct,AdminCategory} from '../../../schemas/admin-product.schema';
import {AdminProductForm} from './AdminProductForm';
export default function ProductEdit({id}:{id:string}){
 const {accessToken,user}=useAuth();
 const [revision,setRevision]=useState(0);
 const [result,setResult]=useState<{key:string;product?:AdminProduct;categories?:AdminCategory[];categoryError?:boolean;error?:string}>();
 const key=JSON.stringify([id,user?.id,revision]);
 useEffect(()=>{if(!accessToken)return;let active=true;
  Promise.all([adminProductsService.get(id,accessToken),adminProductsService.categories().catch(()=>null)]).then(([product,categories])=>{if(active)setResult({key,product,categories:categories??[],categoryError:categories===null});}).catch(()=>{if(active)setResult({key,error:'Unable to load this product. It may no longer exist, or the backend is unavailable.'});});
  return()=>{active=false;};
 },[id,accessToken,key]);
 const current=result?.key===key?result:undefined;
 return <div className="p-admin-margin-mobile md:p-admin-margin-desktop"><Link href="/admin/products" className="text-sm underline">Back to products</Link>
 {!current?<div role="status" className="h-64 bg-admin-surface-variant motion-safe:animate-pulse mt-8"><span className="sr-only">Loading product</span></div>:current.error?<div role="alert" className="py-8"><p>{current.error}</p><button onClick={()=>setRevision(n=>n+1)} className="underline mt-4">Retry</button></div>:current.product&&accessToken&&<>
 {current.categoryError&&<p role="alert" className="mt-6">Categories could not load. The current category is preserved; reload the page before changing it.</p>}
 <AdminProductForm key={current.product.id} product={current.product} categories={current.categories??[]} categoryError={Boolean(current.categoryError)} token={accessToken}/>
 </>}
 </div>;
}
