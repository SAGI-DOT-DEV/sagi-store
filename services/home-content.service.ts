import { sanityClient } from '../sanity/client';
import { defineQuery } from 'groq';
import { normalizeSpotlights } from './home-spotlights';
import { DEFAULT_HOME_CONTENT, type HomeContent } from '../data/home-content';

const HOME_QUERY = defineQuery(`*[_type == "homePage" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]{
  showcases[]{ _key, subtitle, description, "image": image.asset->url, imageAlt, primaryCta, secondaryCta, href },
  showcaseOne{ "_key": "showcase-one", subtitle, description, "image": image.asset->url, imageAlt, primaryCta, secondaryCta, href },
  showcaseTwo{ "_key": "showcase-two", subtitle, description, "image": image.asset->url, imageAlt, primaryCta, secondaryCta, href },
  showcaseThree{ "_key": "showcase-three", subtitle, description, "image": image.asset->url, imageAlt, primaryCta, secondaryCta, href },
  "hero": hero{ eyebrow, title, emphasis, description, "image": image.asset->url, imageAlt, primaryCta, secondaryCta },
  spotlights[]{ _key, eyebrow, title, subtitle, description, "image": image.asset->url, imageAlt, primaryCta, secondaryCta, href, badges },
  metrics[]{_key, value, label}, philosophy, staples, journals, provenance
}`);

export async function getHomeContent(): Promise<HomeContent> {
  if (!sanityClient) return DEFAULT_HOME_CONTENT;
  try {
    const content = await sanityClient.fetch<Partial<HomeContent>>(HOME_QUERY, {}, { cache: 'no-store', perspective: 'published' });
    if (!content) return DEFAULT_HOME_CONTENT;

    const text = (value: unknown, fallback: string) => {
      if (typeof value !== 'string' || !value.trim()) return fallback;
      return value;
    };

    const hero = content.hero;
    const philosophy = content.philosophy;
    const staples = content.staples;
    const journals = content.journals;
    const provenance = content.provenance;
    const metrics = DEFAULT_HOME_CONTENT.metrics.map((fallback, index) => ({
      value: text(content.metrics?.[index]?.value, fallback.value),
      label: text(content.metrics?.[index]?.label, fallback.label),
    }));

    const namedShowcases = [content.showcaseOne, content.showcaseTwo, content.showcaseThree];
    const hasNamedShowcase = namedShowcases.some((showcase) => Boolean(showcase));
    const showcaseSource = content.showcases?.length
      ? content.showcases
      : hasNamedShowcase
      ? namedShowcases.map((showcase, index) => ({ ...showcase, _key: showcase?._key || `showcase-${index + 1}` }))
      : content.spotlights;

    return {
      spotlights: normalizeSpotlights(showcaseSource, content.hero),
      hero: {
        eyebrow: text(hero?.eyebrow, DEFAULT_HOME_CONTENT.hero.eyebrow),
        title: text(hero?.title, DEFAULT_HOME_CONTENT.hero.title),
        emphasis: text(hero?.emphasis, DEFAULT_HOME_CONTENT.hero.emphasis),
        description: text(hero?.description, DEFAULT_HOME_CONTENT.hero.description),
        image: text(hero?.image, DEFAULT_HOME_CONTENT.hero.image),
        imageAlt: text(hero?.imageAlt, DEFAULT_HOME_CONTENT.hero.imageAlt),
        primaryCta: text(hero?.primaryCta, DEFAULT_HOME_CONTENT.hero.primaryCta),
        secondaryCta: text(hero?.secondaryCta, DEFAULT_HOME_CONTENT.hero.secondaryCta),
      },
      metrics,
      philosophy: {
        eyebrow: text(philosophy?.eyebrow, DEFAULT_HOME_CONTENT.philosophy.eyebrow),
        quote: text(philosophy?.quote, DEFAULT_HOME_CONTENT.philosophy.quote),
        attribution: text(philosophy?.attribution, DEFAULT_HOME_CONTENT.philosophy.attribution),
      },
      staples: {
        eyebrow: text(staples?.eyebrow, DEFAULT_HOME_CONTENT.staples.eyebrow),
        title: text(staples?.title, DEFAULT_HOME_CONTENT.staples.title),
        catalogCta: text(staples?.catalogCta, DEFAULT_HOME_CONTENT.staples.catalogCta),
      },
      journals: {
        eyebrow: text(journals?.eyebrow, DEFAULT_HOME_CONTENT.journals.eyebrow),
        title: text(journals?.title, DEFAULT_HOME_CONTENT.journals.title),
        description: text(journals?.description, DEFAULT_HOME_CONTENT.journals.description),
        cta: text(journals?.cta, DEFAULT_HOME_CONTENT.journals.cta),
      },
      provenance: {
        eyebrow: text(provenance?.eyebrow, DEFAULT_HOME_CONTENT.provenance.eyebrow),
        title: text(provenance?.title, DEFAULT_HOME_CONTENT.provenance.title),
        description: text(provenance?.description, DEFAULT_HOME_CONTENT.provenance.description),
        cta: text(provenance?.cta, DEFAULT_HOME_CONTENT.provenance.cta),
      },
    };
  } catch { return DEFAULT_HOME_CONTENT; }
}
