export function CategoryFilterSkeleton() {
  return <div role="status" className="flex items-center gap-2">
    <span className="sr-only">Loading categories</span>
    {[112, 88, 104, 80].map((width, index) => <span key={index} aria-hidden="true" style={{ width }} className="h-8 shrink-0 rounded-full bg-[#EFECE4] motion-safe:animate-pulse" />)}
  </div>;
}
