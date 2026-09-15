import {EditorField} from './EditorField';
export function CreateVariantFields({index,onRemove,removable}:{index:number;onRemove:()=>void;removable:boolean}){
 const name=(field:string)=>`variant.${index}.${field}`;
 return <section className="border border-admin-outline-variant p-5 space-y-5">
  <div className="flex justify-between"><h3 className="font-serif text-lg">Variant {index+1}</h3>{removable&&<button type="button" onClick={onRemove} className="text-xs underline">Remove variant</button>}</div>
  <div className="grid sm:grid-cols-2 gap-5"><EditorField label="Variant name" name={name('name')} defaultValue="Standard" required maxLength={200}/><EditorField label="SKU" name={name('sku')} required maxLength={100}/><EditorField label="Price (CAD)" name={name('price')} type="number" step="0.01" min="0.01" required/><EditorField label="Initial stock" name={name('quantity')} type="number" min="0" step="1" defaultValue="0" required/>
  <EditorField label="Weight (grams)" name={name('weightGrams')} type="number" min="1" step="1" required/>
  {(['lengthCm','widthCm','heightCm'] as const).map((field,i)=><EditorField key={field} label={['Length (cm)','Width (cm)','Height (cm)'][i]} name={name(field)} type="number" min="0.01" step="any" required/>)}</div>
 </section>;
}
