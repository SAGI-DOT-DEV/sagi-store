'use client';
import {useRef,useState,type FormEvent} from 'react';
import {Loader2,ArrowRight} from 'lucide-react';
import {StarRating} from './StarRating';
import {reviewInputSchema,type ExperienceReview} from '../../schemas/review.schema';
import {submitReview} from '../../services/reviews.actions';
import {ApiError} from '../../services/api-client';
export function ReviewForm({orderId,token,onSaved,onReload}:{orderId:string;token:string;onSaved:(review:ExperienceReview)=>void;onReload:()=>void}){
 const [overall,setOverall]=useState(0),[delivery,setDelivery]=useState(0),[checkout,setCheckout]=useState(0),[comment,setComment]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');const sending=useRef(false);
 async function submit(event:FormEvent){event.preventDefault();if(sending.current)return;
  const parsed=reviewInputSchema.safeParse({orderId,overallRating:overall,...(delivery?{deliveryRating:delivery}:{}),...(checkout?{checkoutRating:checkout}:{}),...(comment.trim()?{comment:comment.trim()}:{})});
  if(!parsed.success){setError(parsed.error.issues[0].message);return;}sending.current=true;setBusy(true);setError('');
  try{onSaved(await submitReview(parsed.data,token));}catch(cause){setError(cause instanceof ApiError?cause.message:'We could not confirm your review was saved. Check for an existing review before retrying.');}finally{sending.current=false;setBusy(false);}
 }
 return <form onSubmit={submit}><fieldset disabled={busy} className="space-y-6"><legend className="sr-only">Your order experience</legend><StarRating label="Your overall experience" name="overall" value={overall} onChange={setOverall} required/><StarRating label="Delivery experience" name="delivery" value={delivery} onChange={setDelivery}/><StarRating label="Checkout experience" name="checkout" value={checkout} onChange={setCheckout}/><label className="block"><span className="text-sm font-medium">Anything else to share? <span className="text-xs text-[#535353]">(optional)</span></span><textarea value={comment} onChange={event=>setComment(event.target.value)} maxLength={2000} rows={5} placeholder="Tell us what you enjoyed, or what we could do better." className="mt-3 block w-full rounded-xl border border-[#E4E4E4] bg-[#FFFFFF] p-4 text-sm focus:outline-[#737373]"/><span className="mt-2 block text-right text-xs text-[#535353]">{comment.length} / 2000</span></label><p className="text-xs leading-relaxed text-[#535353]">One review per delivered order. Please avoid including personal or payment information.</p>{error&&<div role="alert" className="text-sm text-neutral-700"><p>{error}</p><button type="button" onClick={onReload} className="underline mt-2">Check saved review</button></div>}<button disabled={busy} className="inline-flex items-center gap-3 rounded-full bg-[#000000] px-7 py-4 text-xs uppercase tracking-widest text-[#FFFFFF] disabled:opacity-50">{busy?<Loader2 size={16} className="animate-spin"/>:<ArrowRight size={16}/>} {busy?'Submitting...':'Submit review'}</button></fieldset></form>;
}
