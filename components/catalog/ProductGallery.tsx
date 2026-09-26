import { useState } from 'react';
import type { Product } from '../../types';

export function ProductGallery({ product }: { product: Product }) {
  const images = [...new Set([product.image, ...product.galleryImages].filter(Boolean))];
  const [selected, setSelected] = useState(images[0] || '/product-placeholder.svg');
  return <div className="space-y-4">
    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 sm:p-14"><img src={selected} alt={product.name} referrerPolicy="no-referrer" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-placeholder.svg'; }} className="h-full w-full object-contain" /></div>
    {images.length > 1 && <div className="store-no-scrollbar flex gap-3 overflow-auto pb-2">{images.map((image,index) => <button key={image} onClick={() => setSelected(image)} aria-label={`View ${product.name} image ${index + 1}`} aria-pressed={image === selected} className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white p-2 ${image === selected ? 'border-black ring-1 ring-black' : 'border-neutral-200'}`}><img src={image} alt="" className="h-full w-full object-contain" referrerPolicy="no-referrer" /></button>)}</div>}
  </div>;
}
