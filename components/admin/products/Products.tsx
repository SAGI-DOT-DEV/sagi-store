'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {useAuth} from '../../../context/AuthContext';
import {adminProductsService} from '../../../services/admin/products.service';
import type {AdminProductPage,AdminCategory} from '../../../schemas/admin-product.schema';
import {AdminProductCard} from './AdminProductCard';
import {ProductCardSkeleton} from '../../ui/ProductCardSkeleton';
export default function Products(){
 const {accessToken}=useAuth();
 const [filters,setFilters]=useState({q:'',status:'',categoryId:'',sort:'createdAt',page:1});
 const [revision,setRevision]=useState(0);
 const [categories,setCategories]=useState<AdminCategory[]>([]);
 const [categoryError,setCategoryError]=useState(false);
 const query=new URLSearchParams({page:String(filters.page),limit:'12',sort:filters.sort,order:filters.sort==='name'?'asc':'desc',...(filters.q.trim()?{q:filters.q.trim()}:{}),...(filters.status?{status:filters.status}:{}),...(filters.categoryId?{categoryId:filters.categoryId}:{})}).toString();
 const key=JSON.stringify([query,accessToken,revision]);
 const [result,setResult]=useState<{key:string;data?:AdminProductPage;error?:string}>();
 useEffect(()=>{let active=true;adminProductsService.categories().then(data=>{if(active){setCategories(data);setCategoryError(false);}}).catch(()=>{if(active)setCategoryError(true);});return()=>{active=false;};},[revision]);
 useEffect(()=>{if(!accessToken)return;let active=true;const timer=window.setTimeout(()=>{
  adminProductsService.list(query,accessToken).then(data=>{if(active)setResult({key,data});}).catch(()=>{if(active)setResult({key,error:'Unable to load products. Check that the backend is running and try again.'});});
 },250);return()=>{active=false;window.clearTimeout(timer);};},[accessToken,query,key]);
 const current=result?.key===key?result:undefined;
 function filter(name:'q'|'status'|'categoryId'|'sort',value:string){setFilters(old=>({...old,[name]:value,page:1}));}
 const control='block w-full border border-admin-outline-variant bg-transparent px-3 py-3 mt-2 text-sm';
 return <div className="p-admin-margin-mobile md:p-admin-margin-desktop"><header className="flex flex-wrap justify-between items-end gap-5"><div><h1 className="font-serif text-4xl">Product Catalog</h1><p className="mt-3 text-admin-on-surface-variant">Manage active products, drafts, and archived products.</p></div><button onClick={()=>setRevision(n=>n+1)} className="border px-4 py-3 text-xs uppercase">Refresh</button></header>
 <Link href="/admin/products/new" className="inline-flex items-center gap-2 mt-6 bg-admin-primary text-white px-5 py-3 text-xs uppercase tracking-widest"><span aria-hidden="true">+</span> Add product</Link>
 <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 my-8">
 <label className="text-xs uppercase tracking-widest">Search<input type="search" maxLength={200} value={filters.q} onChange={e=>filter('q',e.target.value)} placeholder="Name, description or SKU" className={control}/></label>
 <label className="text-xs uppercase tracking-widest">Status<select value={filters.status} onChange={e=>filter('status',e.target.value)} className={control}><option value="">All statuses</option><option value="ACTIVE">Active</option><option value="DRAFT">Draft</option><option value="ARCHIVED">Archived</option></select></label>
 <label className="text-xs uppercase tracking-widest">Category<select value={filters.categoryId} onChange={e=>filter('categoryId',e.target.value)} className={control}><option value="">All categories</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
 <label className="text-xs uppercase tracking-widest">Sort<select value={filters.sort} onChange={e=>filter('sort',e.target.value)} className={control}><option value="createdAt">Newest first</option><option value="name">Name A–Z</option></select></label>
 </div>
 {categoryError&&<p role="alert" className="mb-4 text-sm">Categories could not load. <button onClick={()=>setRevision(n=>n+1)} className="underline">Retry</button></p>}
 {!current?<div role="status" className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"><span className="sr-only">Loading products</span>{[0,1,2,3,4,5].map(i=><ProductCardSkeleton key={i}/>)}</div>:current.error?<div role="alert" className="border p-8"><p>{current.error}</p><button onClick={()=>setRevision(n=>n+1)} className="underline mt-4">Try again</button></div>:current.data&&<>
 {current.data.items.length?<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">{current.data.items.map(product=><AdminProductCard key={product.id} product={product}/>)}</div>:<div className="border p-12 text-center"><p>No products match these filters.</p><button onClick={()=>setFilters({q:'',status:'',categoryId:'',sort:'createdAt',page:1})} className="mt-4 underline">Reset filters</button></div>}
 <nav aria-label="Product pagination" className="flex flex-wrap justify-between gap-4 mt-10 border-t pt-6 text-sm"><button disabled={filters.page===1} onClick={()=>setFilters(old=>({...old,page:old.page-1}))} className="border px-4 py-2">Previous</button><span>{current.data.pagination.total} products · Page {filters.page} of {Math.max(1,current.data.pagination.totalPages)}</span><button disabled={filters.page>=current.data.pagination.totalPages} onClick={()=>setFilters(old=>({...old,page:old.page+1}))} className="border px-4 py-2">Next</button></nav>
 </>}
 </div>;
}
