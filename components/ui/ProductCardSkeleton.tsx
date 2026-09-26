export function ProductCardSkeleton() {
  return <div aria-hidden="true" className="rounded-2xl border border-neutral-200 bg-white p-4 motion-safe:animate-pulse"><div className="aspect-square rounded-xl bg-neutral-100" /><div className="mt-5 space-y-3"><div className="h-2 w-1/3 rounded bg-neutral-200" /><div className="h-5 w-4/5 rounded bg-neutral-200" /><div className="h-3 w-1/2 rounded bg-neutral-100" /><div className="h-12 w-full rounded-full bg-neutral-200" /></div></div>;
}
