export interface HomeContent {
  showcases?: HomeSpotlight[];
  showcaseOne?: HomeSpotlight;
  showcaseTwo?: HomeSpotlight;
  showcaseThree?: HomeSpotlight;
  spotlights?: HomeSpotlight[];
  hero: { eyebrow: string; title: string; emphasis: string; description: string; image: string; imageAlt: string; primaryCta: string; secondaryCta: string };
  metrics: { value: string; label: string }[];
  philosophy: { eyebrow: string; quote: string; attribution: string };
  staples: { eyebrow: string; title: string; catalogCta: string };
  journals: { eyebrow: string; title: string; description: string; cta: string };
  provenance: { eyebrow: string; title: string; description: string; cta: string };
}

export interface HomeSpotlight {
  _key: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: string;
  secondaryCta: string;
  href: string;
  badges: string[];
}

export const DEFAULT_HOME_CONTENT: HomeContent = {
  hero: { eyebrow: 'Reserve Collection • Autumn 2025', title: 'The modern soul of', emphasis: 'Nigerian grains.', description: 'Bridging centuries of West African agricultural mastery with contemporary luxury gastronomy. Hand-selected, laser-sorted, and single-estate sourced.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0PU5h0NvxsHj9VB5ziaJATj_Zeq_opKokSnDbLREIK4OFZP9VdsRzdgJp_ZXr-SVz_nTYt4ZQuh2BI62hx7lRjF6d9J_03CNf0_jrxzUdElXmnQ9wd-clJVsuDCFAWpJZdHI0W-TEZ6nY5LZU5ZhBeoq_nL37ZsEHCuecGwb01LxX6qgmdYQqOBidNvNRgLARCMDw2LOarV2hHi7Ff5oeGQvo1DCyANhPLxZHfDXOxjlQmDz8FJUnlA', imageAlt: 'Nigerian Grains and Artisanal Ingredients Collection', primaryCta: 'Explore The Staples', secondaryCta: 'Kitchen Journals' },
  metrics: [{ value: '100%', label: 'Stone-Free Guarantee' }, { value: '5', label: 'Historic Belts' }, { value: '12 Mo', label: 'Aged Ferments' }],
  philosophy: { eyebrow: 'Gastronomic Philosophy', quote: '"To touch a grain of true Ijebu garri or aged Ofada rice is to hold the geological and microbial history of West Africa."', attribution: 'The SAGI Culinary Institute • Terroir Manifest' },
  staples: { eyebrow: 'The Staples', title: 'Collection 01: Core Provisions', catalogCta: 'View Full Catalog' },
  journals: { eyebrow: 'Culinary Science & Techniques', title: 'The Kitchen Journals', description: 'Rigorous culinary abstracts documenting hydration ratios, thermal ceilings, and ancestral mechanical techniques.', cta: 'Explore Masterclass Library' },
  provenance: { eyebrow: 'Traceability & Provenance', title: 'Direct estate partnerships across five Nigerian agro-ecological zones.', description: 'We work exclusively with heirloom grower cooperatives in Ogun, Edo, Ebonyi, and Niger State, eliminating middlemen and certifying organic soil integrity.', cta: 'Read The Terroir Map' },
};
