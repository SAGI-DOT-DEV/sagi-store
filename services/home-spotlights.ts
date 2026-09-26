import { DEFAULT_HOME_SPOTLIGHTS } from '../data/home-spotlights';
import type { HomeContent, HomeSpotlight } from '../data/home-content';

const text = (value: unknown, fallback: string) => typeof value === 'string' && value.trim() ? value : fallback;
export function safeStorePath(value: unknown, fallback = '/products') {
  return typeof value === 'string' && /^\/(?!\/)/.test(value) && !/[\\\s]/.test(value) ? value : fallback;
}
export function normalizeSpotlights(value: unknown, hero?: Partial<HomeContent['hero']>): HomeSpotlight[] {
  if (Array.isArray(value) && value.length) return value.slice(0, 8).filter(item => item && typeof item === 'object').map((item, index) => {
    const fallback = DEFAULT_HOME_SPOTLIGHTS[index % DEFAULT_HOME_SPOTLIGHTS.length];
    return {
      _key: text(item._key, `spotlight-${index}`),
      eyebrow: text(item.eyebrow, fallback.eyebrow), title: text(item.title, fallback.title),
      subtitle: text(item.subtitle, fallback.subtitle), description: text(item.description, fallback.description),
      image: text(item.image, fallback.image), imageAlt: text(item.imageAlt, text(item.title, fallback.imageAlt)),
      primaryCta: text(item.primaryCta, fallback.primaryCta), secondaryCta: text(item.secondaryCta, fallback.secondaryCta),
      href: safeStorePath(item.href), badges: Array.isArray(item.badges) ? item.badges.filter((badge: unknown) => typeof badge === 'string' && badge.trim()) : fallback.badges,
    };
  });
  // Existing published hero fields remain effective until spotlights are authored.
  if (hero && Object.values(hero).some(value => typeof value === 'string' && value.trim())) {
    const first = DEFAULT_HOME_SPOTLIGHTS[0];
    return [{ ...first, eyebrow: text(hero.eyebrow, first.eyebrow), title: text(hero.title, first.title), subtitle: text(hero.emphasis, first.subtitle), description: text(hero.description, first.description), image: text(hero.image, first.image), imageAlt: text(hero.imageAlt, first.imageAlt), primaryCta: text(hero.primaryCta, first.primaryCta), secondaryCta: text(hero.secondaryCta, first.secondaryCta), badges: [] }, ...DEFAULT_HOME_SPOTLIGHTS.slice(1)];
  }
  return DEFAULT_HOME_SPOTLIGHTS;
}
