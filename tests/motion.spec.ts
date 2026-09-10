import { test, expect, type Page } from '@playwright/test';

test.beforeEach(({}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop' && testInfo.project.name !== 'iphone',
    'motion checks run on one desktop and one phone viewport',
  );
});

const animatedOpacities = (page: Page) =>
  page
    .locator('[data-reveal], [data-hero-item]')
    .evaluateAll((els) => els.map((el) => Number(getComputedStyle(el).opacity)));

test('reduced motion shows all content immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const hasJsMotion = await page.evaluate(() =>
    document.documentElement.classList.contains('js-motion'),
  );
  expect(hasJsMotion).toBe(false);
  for (const opacity of await animatedOpacities(page)) expect(opacity).toBe(1);
});

test('animations never leave content hidden', async ({ page }) => {
  await page.goto('/smoothie-bike');
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 3) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await page.waitForTimeout(1200);
  for (const opacity of await animatedOpacities(page)) expect(opacity).toBeGreaterThan(0.99);
});

test('the hero heading is visible straight away', async ({ page }) => {
  await page.goto('/');
  const opacity = await page
    .getByRole('heading', { level: 1 })
    .evaluate((el) => Number(getComputedStyle(el).opacity));
  expect(opacity).toBe(1);
});
