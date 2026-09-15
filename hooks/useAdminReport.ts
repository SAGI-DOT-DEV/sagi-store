'use client';
import {useEffect,useState} from 'react';
import {getAdminReport,type ReportKind,type AdminReports} from '../services/admin/overview.service';
export function useAdminReport<K extends ReportKind>(kind:K,query:string,token:string|null,revision:number) {
  const key=JSON.stringify([kind,query,token,revision]);
  const [result,setResult]=useState<{key:string;data?:AdminReports[K];error?:string}>();
  useEffect(()=>{
    if(!token)return;
    let active=true;
    getAdminReport(kind,query,token).then(data=>{if(active)setResult({key,data});}).catch(()=>{
      if(active)setResult({key,error:'Unable to load this report. Please retry.'});
    });
    return ()=>{active=false;};
  },[kind,query,token,key]);
  return result?.key===key?{data:result.data,error:result.error,loading:false}:{data:undefined,error:undefined,loading:true};
}
