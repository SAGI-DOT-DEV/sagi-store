import { CategoryFilterSkeleton } from '../ui/CategoryFilterSkeleton';

export function CategoryPills({ categories, selected, onSelect, loading = false }: { categories: string[]; selected: string; onSelect: (value: string) => void; loading?: boolean }) {
  return <div className="store-no-scrollbar flex max-w-full gap-2 overflow-x-auto py-2" aria-label="Product categories">
    {loading ? <CategoryFilterSkeleton /> : ['All', ...categories.filter(value => value !== 'All')].map(category => <button key={category} aria-pressed={selected === category} onClick={() => onSelect(category)} className={`shrink-0 rounded-full border px-5 py-3 text-[11px] font-semibold uppercase tracking-wider transition-colors ${selected === category ? 'border-black bg-black text-white' : 'border-neutral-200 bg-white text-neutral-600 hover:border-black hover:text-black'}`}>{category === 'All' ? 'All products' : category}</button>)}
  </div>;
}
