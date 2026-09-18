'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ChevronDown} from 'lucide-react';
import Icon from './Icon';
import {adminNavigation,activeAdminGroup,isAdminLinkActive} from './navigation';

export function AdminNavigation({pathname,onNavigate}:{pathname:string;onNavigate:()=>void}){
  const activeGroup=activeAdminGroup(pathname);
  const [expanded,setExpanded]=useState<string|null>(()=>activeGroup);
  return <ul className="flex-1 space-y-2">
    <li className="mb-5"><Link href="/admin" onClick={onNavigate} aria-current={pathname==='/admin'?'page':undefined} className={`flex gap-3 items-center rounded-lg px-4 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin-primary ${pathname==='/admin'?'bg-admin-primary text-white':'text-admin-on-surface-variant hover:bg-admin-surface-container-high'}`}><Icon name="dashboard"/>Overview</Link></li>
    {adminNavigation.map(group=>{
      const open=expanded===group.id,active=activeGroup===group.id;
      return <li key={group.id}>
        <button type="button" aria-expanded={open} aria-controls={'admin-group-'+group.id} onClick={()=>setExpanded(open?null:group.id)} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin-primary ${active?'bg-admin-surface-container-high text-admin-primary font-medium':'text-admin-on-surface-variant hover:bg-admin-surface-container-high'}`}>
          <Icon name={group.icon}/><span className="flex-1 text-left">{group.label}</span><ChevronDown aria-hidden="true" size={15} className={`transition-transform duration-200 motion-reduce:transition-none ${open?'rotate-180':''}`}/>
        </button>
        <ul id={'admin-group-'+group.id} hidden={!open} className="ml-6 mt-1 mb-3 border-l border-admin-outline-variant pl-3 space-y-1">
          {group.links.map(link=>{const selected=isAdminLinkActive(pathname,link.href);return <li key={link.href}><Link href={link.href} onClick={onNavigate} aria-current={selected?'page':undefined} className={`block rounded-md px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-admin-primary ${selected?'bg-admin-primary text-white':'text-admin-on-surface-variant hover:bg-admin-surface-container-high'}`}>{link.label}</Link></li>;})}
        </ul>
      </li>;
    })}
  </ul>;
}
