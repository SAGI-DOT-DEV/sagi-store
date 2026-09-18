import type {InputHTMLAttributes} from 'react';
export function ShippingField({label,...props}:InputHTMLAttributes<HTMLInputElement>&{label:string}){
 return <label className="block text-xs uppercase tracking-widest text-admin-on-surface-variant">{label}{props.required?' *':''}<input {...props} className="block w-full border border-admin-outline-variant bg-transparent mt-2 p-3 text-sm tracking-normal normal-case text-admin-on-surface focus:outline-admin-primary"/></label>;
}
