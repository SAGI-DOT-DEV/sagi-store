import { UserCircle } from 'lucide-react';

export function AccountButtonSkeleton() {
  return <span role="status" className="inline-flex items-center gap-2 rounded-full bg-[#1C1A17] px-3.5 py-2.5 shadow-sm">
    <span className="sr-only">Restoring your account</span>
    <UserCircle aria-hidden="true" className="h-5 w-5 text-[#D4AF37]/70" />
    <span aria-hidden="true" className="h-3 w-14 rounded-full bg-[#D4AF37]/25 motion-safe:animate-pulse" />
  </span>;
}
