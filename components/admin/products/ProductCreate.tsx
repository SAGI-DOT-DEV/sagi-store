'use client';
import Link from 'next/link';
import {useEffect,useRef,useState,type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import {Loader2} from 'lucide-react';
import {useAuth} from '../../../context/AuthContext';
import {adminProductCreateSchema,type AdminCategory} from '../../../schemas/admin-product.schema';
import {adminProductsService} from '../../../services/admin/products.service';
import {createAdminProduct} from '../../../services/admin/products.actions';
import {ApiError} from '../../../services/api-client';
import {EditorField,editorControl} from './EditorField';
import {CreateVariantFields} from './CreateVariantFields';
import {ProductImageUpload} from './ProductImageUpload';

export default function ProductCreate(){
 const {accessToken}=useAuth();const router=useRouter();
 const [images,setImages]=useState<string[]>([]),[imagesBlocked,setImagesBlocked]=useState(false);
 const [categories,setCategories]=useState<AdminCategory[]>([]),[categoryState,setCategoryState]=useState('loading'),[revision,setRevision]=useState(0);
 const [variants,setVariants]=useState([0]);const nextVariant=useRef(1);
 const [errors,setErrors]=useState<string[]>([]),[pending,setPending]=useState(false),[created,setCreated]=useState(false);const submitting=useRef(false);
 useEffect(()=>{let active=true;adminProductsService.categories().then(items=>{if(active){setCategories(items);setCategoryState('ready');}}).catch(()=>{if(active)setCategoryState('error');});return()=>{active=false;};},[revision]);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(submitting.current||created||imagesBlocked)return;
  if(!accessToken){setErrors(['Please sign in as an administrator before creating a product.']);return;}
  const data=new FormData(event.currentTarget);const value=(key:string)=>String(data.get(key)??'').trim();
  const parsed=adminProductCreateSchema.safeParse({name:value('name'),slug:value('slug'),description:value('description'),origin:value('origin')||null,highlights:value('highlights').split('\n').map(s=>s.trim()).filter(Boolean),categoryId:value('categoryId')||null,status:value('status'),
   images:images.map((url,position)=>({url,position,alt:value('name')})),
   variants:variants.map((_,index)=>{const get=(field:string)=>value(`variant.${index}.${field}`);return {name:get('name'),sku:get('sku'),price:get('price'),inventory:{quantity:get('quantity')},weightGrams:get('weightGrams'),lengthCm:get('lengthCm'),widthCm:get('widthCm'),heightCm:get('heightCm')};}),
  });
  if(!parsed.success){setErrors(parsed.error.issues.map(issue=>`${issue.path.join(' → ')}: ${issue.message}`));return;}
  setErrors([]);setPending(true);submitting.current=true;
  try{const product=await createAdminProduct(parsed.data,accessToken);setCreated(true);router.replace(`/admin/products/${encodeURIComponent(product.id)}/edit`);}
  catch(error){setErrors([error instanceof ApiError?error.message:'Unable to confirm creation. Check the catalog before retrying to avoid duplicates.']);}
  finally{setPending(false);submitting.current=false;}
 }
 const panel='border border-admin-outline-variant bg-white p-6 space-y-6';
 return <div className="p-admin-margin-mobile md:p-admin-margin-desktop"><Link href="/admin/products" className="text-xs uppercase tracking-widest underline">Back to products</Link>
 <form onSubmit={submit}><header className="flex flex-wrap justify-between items-end gap-6 border-b py-8"><div><h1 className="font-serif text-4xl">Add Product</h1><p className="mt-3 text-sm text-admin-on-surface-variant">Build a new provision for your catalog. All prices are in CAD.</p></div><button disabled={pending||created||imagesBlocked||!accessToken} className="flex items-center gap-2 bg-admin-primary text-white px-5 py-3 text-xs uppercase tracking-widest disabled:opacity-50">{(pending||created)&&<Loader2 size={16} className="animate-spin"/>}{created?'Product created':pending?'Creating...':'Create product'}</button></header>
 {errors.length>0&&<div role="alert" className="border border-red-300 bg-red-50 text-red-800 p-4 mt-6"><p>Please check the following:</p><ul className="list-disc pl-5 mt-2">{errors.map((error,i)=><li key={i}>{error}</li>)}</ul></div>}
 <fieldset disabled={pending||created} className="grid xl:grid-cols-3 gap-6 py-8"><legend className="sr-only">New product details</legend><div className="xl:col-span-2 space-y-6"><section className={panel}><h2 className="font-serif text-xl">General information</h2><EditorField label="Product name" name="name" required maxLength={200}/><EditorField label="Slug" name="slug" placeholder="e.g. artisanal-yam-flour" required maxLength={200}/><label className="block text-xs uppercase tracking-widest">Description<textarea name="description" required rows={5} maxLength={10000} className={editorControl}/></label><EditorField label="Origin (optional)" name="origin" maxLength={150}/><label className="block text-xs uppercase tracking-widest">Highlights (optional)<textarea name="highlights" rows={3} className={editorControl}/><span className="block mt-2 normal-case tracking-normal">One per line; up to 5 highlights, 40 characters each.</span></label></section>
 <ProductImageUpload token={accessToken??''} onChange={setImages} onBlocked={setImagesBlocked}/>
 <section className={panel}><h2 className="font-serif text-xl">Variants, stock & shipping</h2><p className="text-xs">Add each packaging option with its own SKU. Dimensions are used to calculate shipping rates.</p>{variants.map((id,index)=><CreateVariantFields key={id} index={index} removable={variants.length>1} onRemove={()=>setVariants(items=>items.filter(item=>item!==id))}/>)}<button type="button" disabled={variants.length>=100} onClick={()=>setVariants(items=>[...items,nextVariant.current++])} className="border px-4 py-3 text-xs uppercase">Add variant</button></section></div>
 <section className={`${panel} self-start`}><h2 className="font-serif text-xl">Organization & visibility</h2><label className="block text-xs uppercase tracking-widest">Category<select name="categoryId" disabled={categoryState!=='ready'} className={editorControl}><option value="">{categoryState==='loading'?'Loading categories...':'No category'}</option>{categories.map(category=><option key={category.id} value={category.id}>{category.name}</option>)}</select></label>{categoryState==='error'&&<p role="alert" className="text-xs">Categories could not load. <button type="button" onClick={()=>setRevision(n=>n+1)} className="underline">Retry</button></p>}<label className="block text-xs uppercase tracking-widest">Status<select name="status" defaultValue="DRAFT" className={editorControl}><option value="DRAFT">Draft</option><option value="ACTIVE">Active</option><option value="ARCHIVED">Archived</option></select></label><p className="text-xs text-admin-on-surface-variant">Drafts stay private. Choose Active to display this product in the storefront.</p></section></fieldset></form></div>;
}
