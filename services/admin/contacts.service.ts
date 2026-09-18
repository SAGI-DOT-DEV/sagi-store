import {z} from 'zod';
import {apiRequest} from '../api-client';

export type ContactKind = 'users' | 'distributors';
const person = z.object({firstName:z.string(),lastName:z.string()});
const base = z.object({id:z.string(),email:z.string(),createdAt:z.string()});
const users = z.array(base.extend({role:z.string(),emailVerifiedAt:z.string().nullable(),profile:person.nullable()}));
const distributors = z.array(base.merge(person));
export type AdminContact = z.infer<typeof base> & {firstName:string;lastName:string;role?:string};
export async function listContacts(kind:ContactKind,token:string):Promise<AdminContact[]> {
  const data = await apiRequest('/api/v1/admin/'+kind,{cache:'no-store'},token);
  return kind==='users' ? users.parse(data).map(({profile,...user})=>({...user,firstName:profile?.firstName??'',lastName:profile?.lastName??''})) : distributors.parse(data);
}
