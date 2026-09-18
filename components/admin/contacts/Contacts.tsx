'use client';
import {useEffect,useState} from 'react';
import {Download,RefreshCw} from 'lucide-react';
import {useAuth} from '../../../context/AuthContext';
import {listContacts,type ContactKind,type AdminContact} from '../../../services/admin/contacts.service';
import {downloadContactsCsv} from '../../../services/admin/contacts-export';
import {ContactsTable} from './ContactsTable';

export default function Contacts({kind}:{kind:ContactKind}) {
  const {accessToken}=useAuth();
  const [revision,setRevision]=useState(0),[search,setSearch]=useState(''),[page,setPage]=useState(1),[exporting,setExporting]=useState(false),[message,setMessage]=useState('');
  const key=JSON.stringify([accessToken,kind,revision]);
  const [result,setResult]=useState<{key:string;rows?:AdminContact[];error?:string}>();
  useEffect(()=>{
    if(!accessToken)return;
    let active=true;
    listContacts(kind,accessToken).then(rows=>{if(active)setResult({key,rows});}).catch(error=>{if(active)setResult({key,error:error instanceof Error?error.message:'Unable to load contacts.'});});
    return()=>{active=false;};
  },[key,accessToken,kind]);
  const current=result?.key===key?result:undefined,rows=current?.rows??[];
  const filtered=rows.filter(row=>[row.firstName,row.lastName,row.email].join(' ').toLowerCase().includes(search.trim().toLowerCase()));
  const pages=Math.max(1,Math.ceil(filtered.length/20)),currentPage=Math.min(page,pages);
  async function exportAll(){
    if(!accessToken||exporting)return;
    setExporting(true);setMessage('');
    try {const all=await listContacts(kind,accessToken);downloadContactsCsv(kind,all);setMessage(`Downloaded ${all.length} contacts. Keep this file private.`);}
    catch(error){setMessage(error instanceof Error?error.message:'Export failed. Please retry.');}
    finally{setExporting(false);}
  }
  return <div className="p-admin-margin-mobile md:p-admin-margin-desktop space-y-8">
    <header className="flex flex-wrap justify-between items-end gap-6"><div><p className="text-xs uppercase tracking-widest text-admin-on-surface-variant mb-3">Community directory</p><h1 className="font-serif text-4xl">{kind==='users'?'Users':'Distributors'}</h1><p className="mt-3 text-admin-on-surface-variant">{kind==='users'?'Registered customer and admin accounts. Pending sign-ups are not included.':'People who have signed up to become distributors.'}</p></div><div className="flex flex-wrap gap-3"><button onClick={()=>setRevision(n=>n+1)} className="border border-admin-outline-variant px-4 py-3 text-xs uppercase flex items-center gap-2"><RefreshCw size={16}/>Refresh</button><button disabled={!current?.rows||!rows.length||exporting} onClick={exportAll} className="bg-admin-primary text-white px-4 py-3 text-xs uppercase tracking-wider flex items-center gap-2 disabled:opacity-40"><Download size={16}/>{exporting?'Exporting…':'Export all names & emails'}</button></div></header>
    <p className="text-xs text-admin-on-surface-variant">CSV exports include every contact in this directory, regardless of the current search or page. Registration does not imply marketing consent.</p>
    {message&&<p role="status" className="border border-admin-outline-variant p-4 text-sm">{message}</p>}
    <label className="block text-xs uppercase tracking-widest">Search names or emails<input type="search" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} className="block w-full md:max-w-md mt-3 border border-admin-outline-variant bg-transparent p-3 text-sm" placeholder="Search contacts…"/></label>
    {!current?<div role="status" className="space-y-3 animate-pulse"><span className="sr-only">Loading contacts</span>{[0,1,2,3].map(i=><div key={i} className="h-20 bg-admin-surface-container-high"/>)}</div>:current.error?<p role="alert">{current.error} <button onClick={()=>setRevision(n=>n+1)} className="underline">Retry</button></p>:<>
      {filtered.length?<ContactsTable contacts={filtered.slice((currentPage-1)*20,currentPage*20)} users={kind==='users'}/>:<div className="border border-admin-outline-variant bg-white p-10 text-center"><h2 className="font-serif text-2xl">{rows.length?'No matching contacts':'No contacts yet'}</h2><p className="mt-2 text-sm text-admin-on-surface-variant">{rows.length?'Try another name or email address.':'New sign-ups will appear here.'}</p></div>}
      <nav aria-label="Contacts pagination" className="flex justify-between items-center gap-4 text-sm"><button disabled={currentPage===1} onClick={()=>setPage(currentPage-1)} className="border px-4 py-2 disabled:opacity-40">Previous</button><span>{filtered.length} contacts · {currentPage} / {pages}</span><button disabled={currentPage===pages} onClick={()=>setPage(currentPage+1)} className="border px-4 py-2 disabled:opacity-40">Next</button></nav>
    </>}
  </div>;
}
