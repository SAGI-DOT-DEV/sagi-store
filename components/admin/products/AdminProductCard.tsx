import Link from 'next/link';
import {AdminImage} from '../AdminImage';
import {formatCAD} from '../../../services/currency';
import type {AdminProduct} from '../../../schemas/admin-product.schema';
export function AdminProductCard({product}:{product:AdminProduct}){
 const available=product.variants.reduce((sum,variant)=>sum+Math.max(0,(variant.inventory?.quantity??0)-(variant.inventory?.reservedQuantity??0)),0);
 const price=product.variants.length?Math.min(...product.variants.map(variant=>variant.price)):null;
 return <article className="border border-admin-outline-variant bg-white p-6 flex flex-col">
 <AdminImage src={product.images[0]?.url||'/product-placeholder.svg'} alt={product.images[0]?.alt||product.name} className="h-44 w-full object-cover"/>
 <div className="flex justify-between gap-2 mt-5 text-[10px] uppercase tracking-widest"><span>{product.category?.name}</span><span className="border border-admin-outline-variant px-2 py-1">{product.status}</span></div>
 <h2 className="font-serif text-2xl mt-3">{product.name}</h2><p className="text-xs mt-2 text-admin-on-surface-variant">{product.origin}</p>
 <p className="mt-4">{price===null?'No variants':(product.variants.length>1?'From ':'')+formatCAD(price)}</p>
 <p className="text-xs mt-2">{available>0?available+' available':'Out of stock'} · {product.variants.length} variants</p>
 <Link href={'/admin/products/'+product.id+'/edit'} className="mt-5 pt-4 border-t border-admin-outline-variant text-xs uppercase underline">Edit product</Link>
 </article>;
}
