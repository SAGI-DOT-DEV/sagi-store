'use client';
import {useEffect,useRef,useSyncExternalStore} from 'react';
import {usePathname} from 'next/navigation';
import Script from 'next/script';
import {GA_ID,analyticsConsent,analyticsEnabled,initializeAnalytics,setAnalyticsConsent,trackEvent} from '../../services/analytics';
function subscribe(callback:()=>void){window.addEventListener('sagi:analytics-consent',callback);window.addEventListener('storage',callback);return()=>{window.removeEventListener('sagi:analytics-consent',callback);window.removeEventListener('storage',callback);};}
function preference(){if(!analyticsEnabled())return 'disabled';return analyticsConsent()??'unknown';}
export function GoogleAnalytics(){
 const pathname=usePathname();const consent=useSyncExternalStore(subscribe,preference,()=> 'disabled');const lastPage=useRef('');
 useEffect(()=>{const admin=pathname.startsWith('/admin');(window as unknown as Record<string,unknown>)[`ga-disable-${GA_ID}`]=admin||consent!=='granted';if(admin||consent!=='granted'){lastPage.current='';return;}if(initializeAnalytics()&&lastPage.current!==pathname){trackEvent('page_view');lastPage.current=pathname;}},[pathname,consent]);
 if(consent==='disabled'||pathname.startsWith('/admin'))return null;
 function choose(value:'granted'|'denied'){setAnalyticsConsent(value);}
 return <>{consent==='granted'&&<Script id="sagi-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive"/>}{consent==='unknown'&&<aside aria-label="Analytics preferences" className="fixed bottom-4 inset-x-4 z-[1000] mx-auto max-w-xl rounded-xl border border-[#E4E4E4] bg-[#FFFFFF] p-5 shadow-xl text-[#000000]"><h2 className="font-serif text-xl">Your privacy, your choice</h2><p className="mt-2 text-sm text-[#535353]">Allow optional Google Analytics cookies to help us understand visits and shopping activity? The store works without them.</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={()=>choose('denied')} className="border border-[#000000] rounded-full px-5 py-2 text-sm">Decline analytics</button><button onClick={()=>choose('granted')} className="bg-[#000000] text-white rounded-full px-5 py-2 text-sm">Allow analytics</button></div></aside>}</>;
}
