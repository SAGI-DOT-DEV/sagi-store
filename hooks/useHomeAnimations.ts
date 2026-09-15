'use client';

import { useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useHomeAnimations(catalogLoading: boolean, recipesLoading: boolean) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity,visibility' } });
      timeline.from('[data-home-hero-copy] > *', { y: 26, autoAlpha: 0, stagger: 0.12 })
        .from('[data-home-hero-image]', { y: 22, autoAlpha: 0, scale: 0.97, duration: 1.1 }, 0.15);
      scope.current?.querySelectorAll<HTMLElement>('[data-home-reveal]').forEach(element => {
        gsap.from(element, { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
      });
    }, scope);
    return () => media.revert();
  }, { scope });

  useCardAnimations(scope, '[data-home-card="product"]', catalogLoading);
  useCardAnimations(scope, '[data-home-card="recipe"]', recipesLoading);
  return scope;
}

function useCardAnimations(scope: RefObject<HTMLDivElement | null>, selector: string, loading: boolean) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      scope.current?.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        gsap.from(element, { y: 24, autoAlpha: 0, duration: 0.65, delay: (index % 4) * 0.07, ease: 'power2.out',
          clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
      });
      ScrollTrigger.refresh();
    }, scope);
    return () => media.revert();
  }, { scope, dependencies: [loading, selector], revertOnUpdate: true });
}
