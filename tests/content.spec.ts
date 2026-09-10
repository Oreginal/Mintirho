import { test, expect } from '@playwright/test';
import { routes, isDesktopProject } from './routes';
import { ORGANIZATION_KEYS, BREADCRUMB_KEYS } from '../src/lib/schema';

// Content rules are viewport independent; run them once.
test.beforeEach(({}, testInfo) => {
  test.skip(!isDesktopProject(testInfo.project.name), 'content checks run on desktop only');
  // The link checks crawl every route in a single test.
  testInfo.setTimeout(120_000);
});

/** Hyphen, dashes and minus sign. The client requires none in visible copy. */
const DASHES = /[-‐-―−]/;
const BANNED = [
  /\bshop\b/i, // Mintirho Shop is discontinued.
  /100%\s*black owned/i, // Removed at the client's request.
  /b-?bbee/i,
  /\bsasom\b/i,
  /\bhpcsa\b/i,
  // "Accredited practice" is shown at the client's request; see site.accreditation.
  /\bcertified\b/i,
  /trusted by/i,
  /\b24\s*\/\s*7\b/,
];
const FORBIDDEN_SCHEMA_KEYS = [
  'aggregateRating',
  'review',
  'priceRange',
  'offers',
  'areaServed',
  'geo',
  'medicalSpecialty',
];

for (const route of routes) {
  test(`copy rules on ${route}`, async ({ page }) => {
    await page.goto(route);

    const texts = await page.evaluate(() => {
      const alts = Array.from(document.querySelectorAll('img[alt]')).map(
        (img) => img.getAttribute('alt') ?? '',
      );
      const labels = Array.from(document.querySelectorAll('[aria-label]')).map(
        (el) => el.getAttribute('aria-label') ?? '',
      );
      const description =
        document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
      const menu = document.querySelector('dialog[data-menu]')?.textContent ?? '';
      return [document.body.innerText, menu, document.title, description, ...alts, ...labels];
    });

    for (const text of texts) {
      const match = text.match(new RegExp(`.{0,30}${DASHES.source}.{0,30}`));
      expect(match?.[0], `dash found in visible text on ${route}`).toBeUndefined();
      for (const pattern of BANNED) {
        expect(text, `banned phrase ${pattern} on ${route}`).not.toMatch(pattern);
      }
    }
  });

  test(`structured data on ${route} only contains verified keys`, async ({ page }) => {
    await page.goto(route);
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((n) => JSON.parse(n.textContent ?? '{}')));

    expect(blocks.length).toBeGreaterThan(0);

    const walk = (value: unknown) => {
      if (Array.isArray(value)) return value.forEach(walk);
      if (value && typeof value === 'object') {
        for (const [key, child] of Object.entries(value)) {
          expect(FORBIDDEN_SCHEMA_KEYS, `forbidden schema key ${key}`).not.toContain(key);
          walk(child);
        }
      }
    };

    for (const block of blocks) {
      walk(block);
      const type = block['@type'];
      const allowed: readonly string[] =
        type === 'BreadcrumbList' ? BREADCRUMB_KEYS : ORGANIZATION_KEYS;
      for (const key of Object.keys(block)) {
        expect(allowed, `unexpected schema key "${key}" on ${route}`).toContain(key);
      }
    }
  });
}

test('every internal link and asset resolves', async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const found = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    found.forEach((href) => hrefs.add(href.split('#')[0].split('?')[0] || '/'));
  }

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), `broken link ${href}`).toBe(200);
  }
});

test('contact links use correct formats and external links are safe', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const links = await page.locator('a[href]').evaluateAll((anchors) =>
      anchors.map((a) => ({
        href: a.getAttribute('href') ?? '',
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel') ?? '',
      })),
    );

    for (const link of links) {
      if (link.href.startsWith('tel:')) expect(link.href).toMatch(/^tel:\+27\d{9}$/);
      if (link.href.startsWith('mailto:')) {
        expect(link.href).toMatch(/^mailto:(admin|ivlounge)@mintirhohcs\.co\.za(\?subject=.+)?$/);
      }
      if (link.href.includes('wa.me')) expect(link.href).toMatch(/^https:\/\/wa\.me\/27810498443/);
      if (link.target === '_blank') expect(link.rel).toContain('noopener');
    }
  }
});
