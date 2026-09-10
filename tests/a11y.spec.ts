import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { routes, isMobileProject } from './routes';

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

test.beforeEach(({}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop' && testInfo.project.name !== 'pixel',
    'axe runs on one desktop and one phone viewport',
  );
});

for (const route of routes) {
  test(`no serious accessibility violations on ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
    ).toEqual([]);
  });
}

test('the open mobile menu has no serious violations', async ({ page }, testInfo) => {
  test.skip(!isMobileProject(testInfo.project.name), 'phone only');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const results = await new AxeBuilder({ page }).include('dialog[data-menu]').analyze();
  const serious = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(serious.map((v) => v.id)).toEqual([]);
});
