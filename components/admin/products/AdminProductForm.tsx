'use client';
import {useRef,useState,type FormEvent} from 'react';
import {Loader2} from 'lucide-react';
import {adminProductUpdateSchema,type AdminProduct,type AdminCategory,type AdminProductUpdate} from '../../../schemas/admin-product.schema';
import {updateAdminProduct} from '../../../services/admin/products.actions';
import {ApiError} from '../../../services/api-client';
import {EditorField,editorControl} from './EditorField';
import {ProductReadOnlyDetails} from './ProductReadOnlyDetails';

function initial(product:AdminProduct):AdminProductUpdate{return {name:product.name,slug:product.slug,description:product.description,origin:product.origin??'',highlights:product.highlights,categoryId:product.categoryId,status:product.status};}
export function AdminProductForm({product,categories,categoryError,token}:{product:AdminProduct;categories:AdminCategory[];categoryError:boolean;token:string}){
 const [saved,setSaved]=useState(product);
 const [draft,setDraft]=useState(()=>initial(product));
 const [highlights,setHighlights]=useState(product.highlights.join('\n'));
 const [errors,setErrors]=useState<Partial<Record<keyof AdminProductUpdate,string>>>({});
 const [message,setMessage]=useState(''),[error,setError]=useState(''),[pending,setPending]=useState(false);
 const submitting=useRef(false);
 function change<K extends keyof AdminProductUpdate>(name:K,value:AdminProductUpdate[K]){setMessage('');setDraft(old=>({...old,[name]:value}));}
 function reset(){setDraft(initial(saved));setHighlights(saved.highlights.join('\n'));setErrors({});setError('');setMessage('');}
 async function submit(event:FormEvent){
  event.preventDefault();if(submitting.current)return;setError('');setMessage('');
  const parsed=adminProductUpdateSchema.safeParse({...draft,origin:draft.origin?.trim()||null,highlights:highlights.split('\n').map(value=>value.trim()).filter(Boolean)});
  if(!parsed.success){const next:typeof errors={};for(const issue of parsed.error.issues)next[issue.path[0] as keyof AdminProductUpdate]=issue.message;setErrors(next);return;}
  setErrors({});setPending(true);submitting.current=true;
  try{const updated=await updateAdminProduct(product.id,parsed.data,token);setSaved(updated);setDraft(initial(updated));setHighlights(updated.highlights.join('\n'));setMessage('Product saved successfully.');}
  catch(cause){setError(cause instanceof ApiError?cause.message:'Unable to confirm the save. Reload the product to verify before retrying.');}
  finally{setPending(false);submitting.current=false;}
 }
 return <form onSubmit={submit} noValidate><header className="flex flex-wrap justify-between items-end gap-6 border-b py-8"><h1 className="font-serif text-3xl">Edit Product</h1><div className="flex gap-3"><button type="button" disabled={pending} onClick={reset} className="border px-5 py-3 text-xs uppercase">Discard changes</button><button type="submit" disabled={pending} className="flex items-center gap-2 bg-black text-white px-5 py-3 text-xs uppercase">{pending&&<Loader2 size={16} className="animate-spin"/>}{pending?'Saving...':'Save changes'}</button></div></header>
 {message&&<p role="status" className="mt-6 border border-neutral-700 text-neutral-800 p-4">{message}</p>}{error&&<p role="alert" className="mt-6 text-neutral-700">{error}</p>}
 <fieldset disabled={pending} className="grid xl:grid-cols-3 gap-6 py-8"><legend className="sr-only">Product details</legend>
 <section className="xl:col-span-2 border border-admin-outline-variant bg-white p-6 space-y-6"><h2 className="font-serif text-xl">General information</h2>
 <EditorField label="Product name" required maxLength={200} value={draft.name} onChange={e=>change('name',e.target.value)} error={errors.name}/>
 <EditorField label="Slug" required maxLength={200} value={draft.slug} onChange={e=>change('slug',e.target.value)} error={errors.slug}/>
 <label className="block"><span className="text-xs uppercase tracking-widest">Description</span><textarea required rows={6} maxLength={10000} value={draft.description} onChange={e=>change('description',e.target.value)} className={editorControl}/>{errors.description&&<span className="text-xs text-neutral-700">{errors.description}</span>}</label>
 <EditorField label="Origin (optional)" maxLength={150} value={draft.origin??''} onChange={e=>change('origin',e.target.value)} error={errors.origin}/>
 <label className="block"><span className="text-xs uppercase tracking-widest">Highlights (optional)</span><textarea rows={4} value={highlights} onChange={e=>{setHighlights(e.target.value);setMessage('');}} className={editorControl}/><span className="block text-xs mt-2">One per line. Up to 5 highlights, 40 characters each; cards show the first two.</span>{errors.highlights&&<span className="text-xs text-neutral-700">{errors.highlights}</span>}</label>
 </section>
 <section className="border border-admin-outline-variant bg-white p-6 space-y-6 self-start"><h2 className="font-serif text-xl">Organization & visibility</h2>
 <label className="block"><span className="text-xs uppercase tracking-widest">Category</span><select disabled={categoryError} value={draft.categoryId??''} onChange={e=>change('categoryId',e.target.value||null)} className={editorControl}><option value="">No category</option>{categoryError&&saved.category&&<option value={saved.category.id}>{saved.category.name}</option>}{categories.map(category=><option key={category.id} value={category.id}>{category.name}</option>)}</select>{errors.categoryId&&<span className="text-xs text-neutral-700">{errors.categoryId}</span>}</label>
 <label className="block"><span className="text-xs uppercase tracking-widest">Status</span><select value={draft.status} onChange={e=>change('status',e.target.value as AdminProductUpdate['status'])} className={editorControl}><option value="ACTIVE">Active</option><option value="DRAFT">Draft</option><option value="ARCHIVED">Archived</option></select></label>
 <p className="text-xs text-admin-on-surface-variant">Only active products appear in the storefront. Draft and archived products remain accessible here.</p>
 </section></fieldset><ProductReadOnlyDetails product={saved}/>
 </form>;
}
