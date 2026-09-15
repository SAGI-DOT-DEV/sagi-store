'use client';
import {useEffect,useState} from 'react';
import {useAuth} from '../../../context/AuthContext';
import {getExperienceReport,reportQuery,reportCsv,type ExperienceReport} from '../../../services/admin/reports.service';
import {ReportsHeader} from './ReportsHeader';
import {ReviewAnalytics} from './ReviewAnalytics';
import {RecentReviews} from './RecentReviews';
export default function Reports(){
 const {accessToken}=useAuth();const [range,setRange]=useState('30'),[page,setPage]=useState(1),[now,setNow]=useState(()=>Date.now()),[revision,setRevision]=useState(0);
 const query=reportQuery(range,page,now),key=JSON.stringify([query,accessToken,revision]);const [result,setResult]=useState<{key:string;data?:ExperienceReport;error?:string}>();
 useEffect(()=>{if(!accessToken)return;let active=true;getExperienceReport(query,accessToken).then(data=>{if(active)setResult({key,data});}).catch(()=>{if(active)setResult({key,error:'Unable to load review reports. Please try again.'});});return()=>{active=false;};},[key,query,accessToken]);
 const current=result?.key===key?result:undefined;
 function refresh(){setNow(Date.now());setRevision(n=>n+1);}
 function download(){if(!current?.data)return;const blob=new Blob([reportCsv(current.data)],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='sagi-experience-'+range+'-'+new Date(now).toISOString().slice(0,10)+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 return <div className="px-admin-margin-mobile md:px-admin-margin-desktop py-12 flex flex-col gap-8"><ReportsHeader range={range} onRange={value=>{setRange(value);setPage(1);setNow(Date.now());}} onRefresh={refresh} onExport={download} canExport={Boolean(current?.data)}/>
 {!current?<div role="status" className="space-y-6 animate-pulse"><span className="sr-only">Loading review reports</span><div className="grid sm:grid-cols-3 gap-6">{[0,1,2].map(i=><div key={i} className="h-40 bg-admin-surface-container-high"/>)}</div><div className="h-64 bg-admin-surface-container-high"/></div>:current.error?<p role="alert">{current.error} <button onClick={refresh} className="underline">Retry</button></p>:current.data&&<><ReviewAnalytics data={current.data}/><RecentReviews reviews={current.data.reviews}/><nav aria-label="Review pagination" className="flex flex-wrap justify-between items-center gap-4 text-sm"><button disabled={page===1} onClick={()=>setPage(n=>n-1)} className="border px-4 py-2 disabled:opacity-40">Previous</button><span>{current.data.totalReviews} reviews · Page {page} of {Math.max(1,current.data.pagination.totalPages)}</span><button disabled={page>=current.data.pagination.totalPages} onClick={()=>setPage(n=>n+1)} className="border px-4 py-2 disabled:opacity-40">Next</button></nav></>}
 </div>;
}
