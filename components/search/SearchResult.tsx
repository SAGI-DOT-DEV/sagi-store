import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function SearchResult({ title, image, detail, onSelect }: { title: string; image: string; detail: string; onSelect: () => void }) {
  const [failed, setFailed] = useState(false);
  return <button type="button" onClick={onSelect} className="group flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-[#EFECE4] focus-visible:outline-2 focus-visible:outline-[#8C7B5A]">
    <img src={!failed && image ? image : '/product-placeholder.svg'} onError={() => setFailed(true)} alt="" className="h-16 w-16 shrink-0 rounded-md bg-[#EFECE4] object-cover" />
    <span className="min-w-0 flex-1"><span className="block font-serif text-base">{title}</span><span className="mt-1 block text-xs text-[#7A7264]">{detail}</span></span>
    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#8C7B5A]" />
  </button>;
}
