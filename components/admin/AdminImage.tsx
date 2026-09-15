'use client';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

export function AdminImage({src,alt,width=500,height=500,...props}: Omit<ImageProps,'src'> & {src:string}) {
  const [failed,setFailed]=useState<string>();
  return <Image {...props} src={!src || failed===src ? '/product-placeholder.svg' : src} alt={alt} width={width} height={height} unoptimized onError={()=>setFailed(src)}/>;
}
