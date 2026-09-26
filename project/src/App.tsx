import { FormEvent, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  Handshake,
  Leaf,
  Menu,
  Play,
  Search,
  ShoppingBag,
  UserRound,
  Verified,
  X,
} from 'lucide-react';

type Product = {
  id: string;
  name: string;
  detail: string;
  price: string;
  category: string;
  image?: string;
};

type FeaturedItem = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badges: string[];
  dark: boolean;
};

const productImages = {
  plantain:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCf3XyS_AS2LeqwGel1Mz8dIDj_5eJS6hYMu1par9rehAmbHtDB3XausXnN8flgfgolhRwi9FKiS_sXaeKTqJOctyZ0T4szv5DM-j5jwfZMYLgvDcqFzLMQimN28VJjvaXIX4GeWSvteraV55W39KwUTMM34clnLyPYCqDxSlC_8NSkl1AmDElh1TdeoFjwBGCn1XbOZPlee6SJ0s-SR36mao0XfAtOQrmjvLua0KE6SqjfjqfP4ioxevFKhlW2udNi8EU',
  ogbono:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC0QwZNhxyZV_akJgljNqEdVpTLP8r3BwOmcKN962sitzLBY6Gc4amkoORrrSI5kYFxLTEmS7hrcAqYIuZOpeeGh-nfHpEK98QIciyJN5cStgG8FAniWLIi7EHeHELIkNKjopXULuNLJvE339bjZ9mgkwR9xOpDpqfISJrWKsZDNDyqpKjXaDlm6UrcbsEtJf0XS1EiKUWUASTZ98Weg-bNjV59cpyHzpMtcT1JFSkHWrkt-dCsmDx3chMPYWL_TczB-6k',
  egusi:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDOfLHRjPQshcZlYu1SzOfnSXjF5y593-OpiY4ipNnIWlr0s7-oISiWi9114WqzNeQKFG4Dzrf2u4ODwGSOPvytIM273T5t1zn5FWHN1grDKwS52WUaSDuS3_-MfkmsjdxWOfow9xQ1kUztWziOrZWTzdhRvC8ddEAwo5NAvsSzUfDFTWRcK_ATpoUtBRSu5WQFv0lmrpSkKX9cbcvucvMjrxQ4Lj5ERwLWP_1UVnU4OzofvZFTKU_hgnv2B5Pe1Os53xY',
};

const products: Product[] = [
  { id: 'plantain', name: 'Farine de Plantain', detail: '1KG • Whole Green Plantain', price: '$18.50 CAD', category: 'Heritage Flours', image: productImages.plantain },
  { id: 'ogbono', name: "Soupe d'Ogbono", detail: '500G • African Bush Mango', price: '$24.00 CAD', category: 'Artisanal Soups', image: productImages.ogbono },
  { id: 'egusi', name: "Soupe d'Égousi", detail: '500G • Whole Melon Seeds', price: '$22.00 CAD', category: 'Artisanal Soups', image: productImages.egusi },
  { id: 'trio', name: 'Terroir Trio Reserve', detail: 'Complete Set • Free Express Delivery', price: '$58.00 CAD', category: 'Tasting Bundles' },
];

const featured: FeaturedItem[] = [
  { eyebrow: 'PREMIUM HARVEST', title: 'Farine de Plantain', subtitle: 'Plantain Flour', description: 'Pure green plantain. 100% natural, gluten-free, authentic taste and fresh vitality for refined pantry creations.', image: productImages.plantain, badges: ['100% Pure Green Plantains', 'Gluten-Free & Nutrient-Dense', '1KG Heritage Reserve'], dark: false },
  { eyebrow: 'WILD SOURCED RESERVE', title: "Soupe d'Ogbono", subtitle: 'Ogbono Soup', description: 'African Bush Mango Seeds. Hand-cracked for a rich, velvety draw, deep savory umami, and ancestral character.', image: productImages.ogbono, badges: ['500G Artisanal Pack', '100% Wild Sourced', 'Zero Preservatives'], dark: true },
  { eyebrow: 'GOLDEN HARVEST MELON', title: "Soupe d'Égousi", subtitle: 'Egusi Soup', description: 'Hand-selected whole melon seeds. Golden richness, nutty depth, and refined protein for iconic stews.', image: productImages.egusi, badges: ['Triple Sorted', '500G Heritage Batch', 'High-Protein & Fiber'], dark: false },
];

function App() {
  const [activeFilter, setActiveFilter] = useState('All Products');
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const visibleProducts = useMemo(
    () => activeFilter === 'All Products' ? products : products.filter((product) => product.category === activeFilter),
    [activeFilter],
  );

  const addToBag = (id: string) => {
    setCartCount((count) => count + 1);
    setAddedId(id);
    window.setTimeout(() => setAddedId(null), 1600);
  };

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink selection:bg-ink selection:text-ivory">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.04] bg-white/85 shadow-[0_1px_10px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="text-[20px] font-bold tracking-[0.26em]">SAGI<span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-ink align-middle" /></a>
          <nav className="hidden items-center gap-8 lg:flex">
            {['Products', 'Terroir', 'Recipes', 'About', 'Quality Standard'].map((item, index) => (
              <a key={item} href={index === 0 ? '#collection' : '#atelier'} className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-ink ${index === 0 ? 'text-ink' : 'text-muted'}`}>{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen((open) => !open)} aria-label="Search" className="icon-button"><Search size={18} /></button>
            <button aria-label="Cart" className="icon-button relative"><ShoppingBag size={18} />{cartCount > 0 && <span className="badge">{cartCount}</span>}</button>
            <button onClick={() => setMenuOpen((open) => !open)} aria-label="Menu" className="icon-button lg:hidden"><Menu size={19} /></button>
            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-ink text-ivory sm:flex"><UserRound size={16} /></div>
            <a href="#collection" className="hidden rounded-full bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-transform hover:-translate-y-0.5 sm:inline-flex">Order Now</a>
          </div>
        </div>
        {searchOpen && <div className="border-t border-black/5 bg-white px-6 py-4"><div className="mx-auto flex max-w-7xl items-center gap-3"><Search size={17} className="text-muted" /><input autoFocus className="w-full bg-transparent text-sm outline-none" placeholder="Search the reserve collection" /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={17} /></button></div></div>}
        {menuOpen && <div className="border-t border-black/5 bg-white px-6 py-4 lg:hidden"><div className="grid gap-4 text-[11px] font-semibold uppercase tracking-[0.18em]">{['Products', 'Terroir', 'Recipes', 'About', 'Quality Standard'].map((item) => <a key={item} href="#collection" onClick={() => setMenuOpen(false)}>{item}</a>)}</div></div>}
      </header>

      <main id="top" className="pt-16">
        {featured.map((item) => <FeaturedSection key={item.title} item={item} onOrder={() => addToBag(item.title)} />)}

        <section id="atelier" className="relative overflow-hidden bg-black px-6 py-20 text-white lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-xl"><span className="eyebrow text-white/60">CULINARY ATELIER • AUTUMN 2025 | MASTERCLASS ARCHIVE</span><h2 className="mt-4 text-4xl font-bold uppercase tracking-[-0.04em] sm:text-6xl">Craft your feast</h2><p className="mt-5 max-w-lg text-sm leading-7 text-white/70">Mastering the art of West African terroir. Slow-simmered rich broths, hand-pounded textures, and heritage recipes that speak for themselves.</p></div>
            <div className="mt-8 flex max-w-lg gap-3"><a href="#collection" className="button-light flex-1">Explore Recipes</a><button className="button-glass flex-1"><Play size={14} fill="currentColor" /> Watch Cookalong</button></div>
            <div className="mt-12 grid gap-3 md:grid-cols-2">
              {[['HARVEST SPECIAL', 'Handmade Plantain Pappardelle', 'Gluten-free pasta sheets folded with wild chanterelles and aged palm butter emulsion.', '40 MIN'], ['SIGNATURE DRAW', 'Truffle Ogbono Velouté', 'Slow-drawn wild mango seed broth enriched with shaved black perigord truffles.', '55 MIN'], ['HERITAGE CLASSIC', 'Slow-Braised Egusi Short Rib', 'Toasted melon seeds ground into thick velvety reduction over 24-hour braised short ribs.', '50 MIN'], ['COASTAL BROTH', 'Heritage Smoked Broth & Catfish', 'Infused alligator pepper pods and wild aromatics paired with tender fire-smoked fillet.', '35 MIN']].map(([label, title, copy, time]) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-md transition-transform hover:-translate-y-1"><div className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{label}</span><span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/65">{time}</span></div><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{copy}</p><a href="#collection" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">Get Recipe <ArrowRight size={14} /></a></article>)}
            </div>
          </div>
        </section>

        <section id="collection" className="bg-white px-6 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><span className="eyebrow">CURATED COLLECTION</span><h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Explore the Collection</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">Certified natural West African food staples sourced directly from sustainable agroforestry co-operatives.</p>
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">{['All Products', 'Heritage Flours', 'Artisanal Soups', 'Tasting Bundles'].map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${activeFilter === filter ? 'bg-ink text-white' : 'bg-mist text-muted hover:bg-stone'}`}>{filter}</button>)}</div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} added={addedId === product.id} onAdd={() => addToBag(product.id)} />)}</div>
        </div></section>

        <section className="bg-stone px-6 py-16 lg:px-10"><div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3"><TrustCard icon={<Verified size={19} />} title="100% Single-Origin" copy="Directly traceable to partnered co-ops across Ivory Coast and Nigeria." /><TrustCard icon={<Leaf size={19} />} title="Zero Preservatives" copy="Sun-cured and traditionally stone-ground without chemicals or binders." /><TrustCard icon={<Handshake size={19} />} title="Direct-to-Farm Trade" copy="3.4x fair trade wage guarantee reinvested into smallholder farming families." /></div></section>
      </main>

      <footer className="bg-black px-6 py-16 text-white lg:px-10"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr]"><div><span className="text-xl font-semibold tracking-[-0.03em]">The SAGI Journal</span><p className="mt-3 max-w-md text-sm leading-6 text-white/55">Curated West African harvests, origins, and seasonal single-origin batches delivered quietly to your pantry.</p><form onSubmit={handleSubscribe} className="mt-7 flex max-w-md items-center rounded-full bg-white/10 p-1"><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={subscribed ? 'You are on the list.' : 'Enter email for reserve access'} className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40" /><button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black" aria-label="Subscribe">{subscribed ? <Check size={16} /> : <ArrowRight size={16} />}</button></form></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-3"><FooterColumn title="Staples" links={['Grains & Flours', 'Aged Palm & Nut Oils', 'Single-Estate Spices']} /><FooterColumn title="Maison" links={['Terroir & Traceability', 'Ethos & Farmers', 'Pantry Concierge']} /><FooterColumn title="Follow" links={['Instagram', 'Journal', 'Contact']} /></div></div><div className="mx-auto mt-16 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.16em] text-white/40 sm:flex-row sm:justify-between"><span>© 2026 SAGI Atelier. All rights reserved.</span><span>Accra · Lagos · London · New York</span></div></footer>
    </div>
  );
}

function FeaturedSection({ item, onOrder }: { item: FeaturedItem; onOrder: () => void }) {
  return <section className={`px-6 py-16 text-center sm:py-20 lg:px-10 ${item.dark ? 'bg-black text-white' : 'bg-white text-ink'}`}><div className="mx-auto flex max-w-3xl flex-col items-center"><span className={`eyebrow ${item.dark ? 'text-white/60' : ''}`}><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />{item.eyebrow}</span><h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{item.title}<span className={`mt-1 block text-lg font-normal tracking-normal ${item.dark ? 'text-white/55' : 'text-muted'}`}>{item.subtitle}</span></h1><p className={`mt-4 max-w-md text-sm leading-6 ${item.dark ? 'text-white/65' : 'text-muted'}`}>{item.description}</p><div className="mt-7 flex w-full max-w-md gap-3"><button onClick={onOrder} className={item.dark ? 'button-light flex-1' : 'button-dark flex-1'}>Order Now</button><a href="#atelier" className={item.dark ? 'button-glass flex-1' : 'button-soft flex-1'}>Learn more</a></div><div className="relative mt-10 flex h-[290px] w-full max-w-md items-center justify-center"><div className={`absolute h-52 w-52 rounded-full blur-3xl ${item.dark ? 'bg-white/10' : 'bg-stone'}`} /><img src={item.image} alt={item.title} className="relative z-10 h-full max-w-[280px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105" /></div><div className="flex flex-wrap justify-center gap-2">{item.badges.map((badge) => <span key={badge} className={`rounded-full px-3 py-2 text-[10px] font-medium ${item.dark ? 'bg-white/10 text-white/70' : 'bg-mist text-muted'}`}>{badge}</span>)}</div></div></section>;
}

function ProductCard({ product, added, onAdd }: { product: Product; added: boolean; onAdd: () => void }) {
  return <article className="group rounded-2xl bg-mist p-4 transition-transform duration-300 hover:-translate-y-1"><div className="flex h-52 items-center justify-center overflow-hidden rounded-xl bg-white">{product.image ? <img src={product.image} alt={product.name} className="h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-105" /> : <div className="p-8 text-center"><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Tasting Reserve</span><h3 className="mt-2 text-xl font-semibold">The Terroir Trio</h3><p className="mt-2 text-xs leading-5 text-muted">Three heritage staples in an artisanal linen gift case.</p></div>}</div><div className="mt-5"><div className="flex items-start justify-between gap-3"><h3 className="text-base font-semibold">{product.name}</h3><span className="whitespace-nowrap text-xs font-bold">{product.price}</span></div><p className="mt-1 text-[11px] text-muted">{product.detail}</p><button onClick={onAdd} className={`mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${added ? 'bg-blue text-white' : 'bg-ink text-white hover:bg-black'}`}>{added ? <><Check size={15} /> Added</> : <><ShoppingBag size={15} /> Add to Bag</>}</button></div></article>;
}

function TrustCard({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) { return <article className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">{icon}</div><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted">{copy}</p></div></article>; }
function FooterColumn({ title, links }: { title: string; links: string[] }) { return <div><h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{title}</h3><div className="mt-4 grid gap-3 text-sm text-white/70">{links.map((link) => <a key={link} href="#top" className="transition-colors hover:text-white">{link}</a>)}</div></div>; }

export default App;
