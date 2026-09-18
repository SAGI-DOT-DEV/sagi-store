export const GA_ID=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID??'';
export const CONSENT_KEY='sagi_analytics_consent';
type AnalyticsWindow=Window&{dataLayer?:unknown[];gtag?:(...args:unknown[])=>void;[key:string]:unknown};
export type AnalyticsItem={item_id:string;item_name:string;price:number;quantity:number};
let initialized=false;
export function analyticsEnabled(){return typeof window!=='undefined'&&/^G-[A-Z0-9]+$/.test(GA_ID)&&process.env.NEXT_PUBLIC_GA_ENABLED==='true'&&(process.env.NEXT_PUBLIC_GA_DEBUG==='true'||!['localhost','127.0.0.1','::1','[::1]'].includes(window.location.hostname));}
export function consentGranted(){try{return localStorage.getItem(CONSENT_KEY)==='granted';}catch{return false;}}
export function safePageLocation(){
 const page=new URL(window.location.origin+window.location.pathname);
 const landing=new URL(window.location.search||'',page);
 // Campaign labels only. Never forward arbitrary query parameters or fragments.
 for(const key of ['utm_source','utm_medium','utm_campaign']){
  const value=landing.searchParams.get(key);
  if(value&&/^[a-zA-Z0-9_.-]{1,100}$/.test(value))page.searchParams.set(key,value);
 }
 return page.toString();
}
export function initializeAnalytics(){
 if(!analyticsEnabled()||!consentGranted()||window.location.pathname.startsWith('/admin'))return false;
 const win=window as unknown as AnalyticsWindow;win[`ga-disable-${GA_ID}`]=false;
 if(!initialized){
  win.dataLayer=win.dataLayer??[];
  // eslint-disable-next-line prefer-rest-params -- Preserve Google's documented gtag command queue format.
  win.gtag=function(){win.dataLayer!.push(arguments);};
  win.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  win.gtag('js',new Date());
  let referrer='';try{referrer=document.referrer?new URL(document.referrer).origin:'';}catch{}
  win.gtag('config',GA_ID,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:safePageLocation(),page_referrer:referrer,page_title:'SAGI Store',...(process.env.NEXT_PUBLIC_GA_DEBUG==='true'?{debug_mode:true}:{})});initialized=true;
 }
 return true;
}
export function setAnalyticsConsent(value:'granted'|'denied'){
 try{localStorage.setItem(CONSENT_KEY,value);}catch{}
 const win=window as unknown as AnalyticsWindow;
 if(value==='denied'){
  win[`ga-disable-${GA_ID}`]=true;win.gtag?.('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  for(const cookie of document.cookie.split(';')){const name=cookie.split('=')[0].trim();if(!/^_ga(?:_|$)/.test(name))continue;document.cookie=`${name}=; Max-Age=0; path=/`;const parts=location.hostname.split('.');for(let i=0;i<parts.length-1;i++)document.cookie=`${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join('.')}`;}
 }else if(initializeAnalytics())win.gtag?.('consent','update',{analytics_storage:'granted'});
 window.dispatchEvent(new Event('sagi:analytics-consent'));
}
export function trackEvent(name:'page_view'|'view_item'|'add_to_cart'|'begin_checkout'|'purchase'|'search',parameters:Record<string,unknown>={}){
 try{if(!initializeAnalytics())return false;const win=window as unknown as AnalyticsWindow;win.gtag?.('set',{page_location:safePageLocation(),page_title:'SAGI Store'});win.gtag?.('event',name,{...parameters,send_to:GA_ID,page_location:safePageLocation(),page_title:'SAGI Store'});return true;}catch{return false;}
}
export function trackPurchase(order:{id:string;status:string;currency:string;subtotal:string;shippingAmount:string;items:{id:string;variantId?:string;name:string;quantity:number;unitPrice:string}[]}){
 if(!['PAID','PROCESSING','SHIPPED','OUT_FOR_DELIVERY','DELIVERED'].includes(order.status))return;
 try{const key='sagi_ga_purchase:'+order.id;if(localStorage.getItem(key))return;
  if(trackEvent('purchase',{transaction_id:order.id,currency:order.currency,value:Number(order.subtotal),shipping:Number(order.shippingAmount),items:order.items.map(item=>({item_id:item.variantId??item.id,item_name:item.name,price:Number(item.unitPrice),quantity:item.quantity}))}))localStorage.setItem(key,'sent');
 }catch{/* Analytics must never interrupt checkout. */}
}
