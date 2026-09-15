'use client';
import {useEffect,useRef} from 'react';
import {trackEvent} from '../../services/analytics';
export function ProductAnalytics({id,name,price}:{id:string;name:string;price:number}){
 const sent=useRef('');useEffect(()=>{function send(){if(sent.current!==id&&trackEvent('view_item',{currency:'CAD',value:price,items:[{item_id:id,item_name:name,price,quantity:1}]}))sent.current=id;}send();window.addEventListener('sagi:analytics-consent',send);return()=>window.removeEventListener('sagi:analytics-consent',send);},[id,name,price]);return null;
}
