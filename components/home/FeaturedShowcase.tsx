import Link from 'next/link';
import type { HomeSpotlight } from '../../data/home-content';
import { safeStorePath } from '../../services/home-spotlights';

export function FeaturedShowcase({ content, index }: { content: HomeSpotlight; index: number }) {
  const dark = index % 2 === 1;
  const Heading = index === 0 ? 'h1' : 'h2';
  return <section className={`overflow-hidden px-5 py-16 text-center sm:py-20 ${dark ? 'bg-black text-white' : 'bg-white text-black'}`}>
    <div className="mx-auto flex max-w-3xl flex-col items-center" data-home-reveal={index > 0 ? '' : undefined}>
      <div data-home-hero-copy={index === 0 ? '' : undefined} className="flex w-full flex-col items-center">
        <p className={`store-eyebrow ${dark ? 'text-white/60' : 'text-neutral-500'}`}><span aria-hidden="true" className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />{content.eyebrow}</p>
        <Heading className="store-heading mt-4 text-4xl sm:text-5xl lg:text-6xl">{content.title}</Heading>
        <p className={`store-heading mt-3 text-4xl sm:text-5xl lg:text-6xl ${dark ? 'text-white/60' : 'text-neutral-500'}`}>{content.subtitle}</p>
        <p className={`mt-4 max-w-md text-sm leading-7 ${dark ? 'text-white/70' : 'text-neutral-600'}`}>{content.description}</p>
        <div className="mt-7 flex w-full max-w-md flex-col gap-3 min-[380px]:flex-row"><Link href={safeStorePath(content.href)} className={`store-button flex-1 ${dark ? 'store-button-light' : 'store-button-dark'}`}>{content.primaryCta}</Link><Link href="/journals" className={`store-button flex-1 ${dark ? 'border border-white/30 bg-white/10 text-white hover:bg-white/20' : 'store-button-outline'}`}>{content.secondaryCta}</Link></div>
      </div>
      <div data-home-hero-image={index === 0 ? '' : undefined} className="relative my-10 flex h-72 w-full max-w-md items-center justify-center sm:h-80">
        <img src={content.image || '/product-placeholder.svg'} alt={content.imageAlt || content.title} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} referrerPolicy="no-referrer" onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-placeholder.svg'; }} className="relative h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105" />
      </div>
      {!!content.badges.length && <div className="flex flex-wrap justify-center gap-2">{content.badges.map((badge,i) => <span key={`${badge}-${i}`} className={`rounded-full border px-4 py-2 text-[10px] ${dark ? 'border-white/20 text-white/70' : 'border-neutral-200 text-neutral-600'}`}>{badge}</span>)}</div>}
    </div>
  </section>;
}
