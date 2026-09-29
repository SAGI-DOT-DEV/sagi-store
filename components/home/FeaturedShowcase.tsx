import Link from 'next/link';
import type { HomeSpotlight } from '../../data/home-content';
import { safeStorePath } from '../../services/home-spotlights';

export function FeaturedShowcase({ content, index }: { content: HomeSpotlight; index: number }) {
  const dark = index % 2 === 1;
  const Heading = index === 0 ? 'h1' : 'h2';
  const primaryLabel = content.primaryCta.trim().toLowerCase() === 'explore products' ? 'Buy now' : content.primaryCta;
  return <section className={`overflow-hidden px-5 py-16 text-center sm:py-20 ${dark ? 'bg-black text-white' : 'bg-white text-black'}`}>
    <div className="mx-auto flex max-w-3xl flex-col items-center" data-home-reveal={index > 0 ? '' : undefined}>
      <div data-home-hero-copy={index === 0 ? '' : undefined} className="flex w-full flex-col items-center">
        <Heading className="store-heading text-4xl sm:text-5xl lg:text-6xl">{content.subtitle}</Heading>
        <p className={`mt-4 max-w-md text-sm leading-7 ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{content.description}</p>
        <div className="mt-7 grid w-full max-w-md grid-cols-2 gap-3"><Link href={safeStorePath(content.href)} className={`store-button min-w-0 px-3! sm:px-6! ${dark ? 'store-button-light' : 'store-button-dark'}`}>{primaryLabel}</Link><Link href="/journals" className={`store-button min-w-0 px-3! sm:px-6! ${dark ? 'border border-white/30 bg-white/10 text-white hover:bg-white/20' : 'store-button-outline'}`}>{content.secondaryCta}</Link></div>
      </div>
      <div data-home-hero-image={index === 0 ? '' : undefined} className="relative my-10 flex h-72 w-full max-w-md items-center justify-center sm:h-80">
        <img src={content.image || '/product-placeholder.svg'} alt={content.imageAlt || content.title} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} referrerPolicy="no-referrer" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-placeholder.svg'; }} className="relative h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105" />
      </div>
    </div>
  </section>;
}
