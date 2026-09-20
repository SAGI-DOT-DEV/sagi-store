export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-sm border border-[#E4E4E4] bg-[#FFFFFF]" aria-hidden="true">
      <div className="aspect-square bg-[#F4F4F4]" />
      <div className="space-y-4 p-5">
        <div className="h-2.5 w-2/5 rounded bg-[#E4E4E4]" />
        <div className="h-5 w-4/5 rounded bg-[#E4E4E4]" />
        <div className="h-3 w-full rounded bg-[#F4F4F4]" />
        <div className="h-3 w-3/4 rounded bg-[#F4F4F4]" />
        <div className="flex items-center justify-between border-t border-[#E4E4E4] pt-4">
          <div className="h-5 w-1/4 rounded bg-[#E4E4E4]" />
          <div className="h-9 w-16 rounded-sm bg-[#E4E4E4]" />
        </div>
      </div>
    </div>
  );
}
