export function StoreLogo({ className = '' }: { className?: string }) {
  if (className.includes('invert')) {
    return <img src="/footer-logo.png" alt="SAGI" width={240} height={80} className={`block h-auto shrink-0 object-contain ${className}`} />;
  }
  return <span className={`relative inline-block aspect-[1328/1267] shrink-0 overflow-hidden ${className}`}>
    <img src="/sagi%20elephant%20black%20(1).png" alt="SAGI" width={3577} height={2167} className="absolute -left-full -top-[3.5%] w-[269.35%] max-w-none" />
  </span>;
}
