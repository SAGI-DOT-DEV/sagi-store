import type {ReactNode} from 'react';
export function ReportState({loading,error,retry,children}:{loading:boolean;error?:string;retry:()=>void;children:ReactNode}) {
  if(error)return <div role="alert" className="border border-admin-outline-variant p-8 text-sm"><p>{error}</p><button onClick={retry} className="mt-4 underline">Try again</button></div>;
  if(loading)return <div role="status" className="space-y-4 py-8"><span className="sr-only">Loading report</span>{[0,1,2].map(i=><div key={i} aria-hidden="true" className="h-12 bg-admin-surface-variant rounded-sm motion-safe:animate-pulse"/>)}</div>;
  return <>{children}</>;
}
