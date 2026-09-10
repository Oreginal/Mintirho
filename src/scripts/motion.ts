/**
 * All GSAP motion for the site lives here. Kept deliberately small:
 *   [data-hero-reveal]  children fade and rise in once on load
 *   [data-reveal]       fades up once when it enters the viewport
 *   [data-drift]        image drifts subtly with scroll (desktop only)
 *
 * Nothing runs when the user prefers reduced motion. Content is never hidden
 * without JS: the `js-motion` class (set by an inline script in BaseLayout)
 * pre-hides animated elements, and a CSS fallback reveals them if this module
 * fails to load. Opacity (not visibility) is used so content stays in the
 * accessibility tree before it is revealed.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power2.out';
let mm: gsap.MatchMedia | undefined;

export function initMotion(): void {
  mm?.revert();
  mm = gsap.matchMedia();

  mm.add(
    {
      motionOK: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 60em)',
    },
    (context) => {
      const { motionOK, desktop } = context.conditions as { motionOK: boolean; desktop: boolean };
      if (!motionOK) return;

      // The hero heading is deliberately not faded so it paints immediately
      // (it is usually the LCP element). Supporting items fade up around it.
      const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero-item]');
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: EASE, stagger: 0.08, delay: 0.05 },
        );
      }

      // Hero media settles with a transform only, which does not delay LCP.
      gsap.utils.toArray<HTMLElement>('[data-hero-media]').forEach((el) => {
        gsap.fromTo(el, { scale: 1.035 }, { scale: 1, duration: 1.2, ease: 'power3.out' });
      });

      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      if (reveals.length) {
        gsap.set(reveals, { opacity: 0, y: 24 });
        ScrollTrigger.batch(reveals, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: EASE,
              stagger: 0.08,
              overwrite: true,
            }),
        });
      }

      if (desktop) {
        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -3, scale: 1.06 },
            {
              yPercent: 3,
              scale: 1.06,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });
      }
    },
  );

  // Hand control from the CSS pre-hide/fallback to GSAP.
  document.documentElement.classList.add('motion-ready');
}

export function destroyMotion(): void {
  mm?.revert();
  mm = undefined;
}
