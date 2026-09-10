import { test, expect } from '@playwright/test';
import { routes } from './routes';

// The contact page embeds Google Maps; stub it so tests never depend on a third party.
test.beforeEach(async ({ page }) => {
  await page.route('https://www.google.com/maps**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<!doctype html><title>Map</title>',
    }),
  );
});

for (const route of routes) {
  test.describe(`page ${route}`, () => {
    test('loads without errors, overflow or broken images', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(err.message));

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.title()).not.toBe('');
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{40,}/);

      // Scroll through the page so lazy images load and scroll animations run.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
      });
      await page.waitForFunction(
        () =>
          [...document.querySelectorAll('main img')]
            .filter((img) => img.getClientRects().length > 0)
            .every((img) => (img as HTMLImageElement).complete),
        null,
        { timeout: 15_000 },
      );

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, 'page must not scroll horizontally').toBeLessThanOrEqual(0);

      // Only images that are actually displayed (some are desktop only).
      const images = await page.locator('main img').evaluateAll((imgs) =>
        (imgs as HTMLImageElement[])
          .filter((img) => img.getClientRects().length > 0)
          .map((img) => ({
            src: img.currentSrc || img.src,
            alt: img.getAttribute('alt'),
            ok: img.complete && img.naturalWidth > 0,
          })),
      );
      for (const img of images) {
        expect(img.alt, `alt missing on ${img.src}`).not.toBeNull();
        expect(img.ok, `image failed to load: ${img.src}`).toBe(true);
      }

      expect(errors, errors.join('\n')).toEqual([]);
    });
  });
}

test('unknown routes return the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('We could not find that page');
});
