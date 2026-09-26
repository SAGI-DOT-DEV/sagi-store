export function CatalogFeedback({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return <div role="status" className="rounded-2xl border border-neutral-200 p-10 text-center"><p className="text-sm leading-6 text-neutral-600">{message}</p>{onRetry && <button onClick={onRetry} className="store-button store-button-outline mt-5">Try again</button>}</div>;
}
