import type {InputHTMLAttributes} from 'react';
export const editorControl='w-full border border-admin-outline-variant bg-transparent px-3 py-3 text-sm mt-2 rounded-sm';
export function EditorField({label,error,...props}:InputHTMLAttributes<HTMLInputElement>&{label:string;error?:string}){
 return <label className="block"><span className="text-xs uppercase tracking-widest">{label}</span><input {...props} aria-invalid={Boolean(error)} className={editorControl}/>{error&&<span className="block text-xs text-neutral-700 mt-2">{error}</span>}</label>;
}
