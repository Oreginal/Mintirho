import { test, expect, type Page } from '@playwright/test';
import { isMobileProject } from './routes';

const desktopOnly = (name: string) => name !== 'desktop';

test.describe('desktop dropdowns', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(desktopOnly(testInfo.project.name), 'desktop navigation only');
  });

  const servicesTrigger = (page: Page) =>
    page.locator('.primary-nav').getByRole('button', { name: 'Services' });

  test('opens on click and navigates', async ({ page }) => {
    await page.goto('/');
    const trigger = servicesTrigger(page);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const link = page.locator('.primary-nav').getByRole('link', { name: 'Medical Surveillance' });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/services\/medical-surveillance\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Medical Surveillance');
  });

  test('supports the keyboard', async ({ page }) => {
    await page.goto('/');
    const trigger = servicesTrigger(page);
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#nav-panel-2 a').first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#nav-panel-2 a').nth(1)).toBeFocused();
    // End reaches the last item in the panel: the "All services" overview link.
    await page.keyboard.press('End');
    await expect(page.locator('#nav-panel-2 a').last()).toHaveText(/All services/);
    await expect(page.locator('#nav-panel-2 a').last()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('closes on outside click and when focus leaves', async ({ page }) => {
    await page.goto('/');
    const trigger = servicesTrigger(page);
    await trigger.click();
    await page.mouse.click(10, 500);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.click();
    const wellness = page.locator('.primary-nav').getByRole('button', { name: 'Wellness' });
    await wellness.focus();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('opens on hover for mouse users', async ({ page }) => {
    await page.goto('/');
    await page.locator('.primary-nav').getByRole('button', { name: 'Wellness' }).hover();
    await expect(
      page.locator('.primary-nav').getByRole('link', { name: 'Smoothie Bike' }),
    ).toBeVisible();
  });

  test('keeps working after a client side page transition', async ({ page }) => {
    await page.goto('/');
    await page.locator('.primary-nav').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    const trigger = servicesTrigger(page);
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('marks the current page', async ({ page }) => {
    await page.goto('/services/risk-assessment');
    await expect(
      page.locator('.primary-nav a[aria-current="page"]', { hasText: 'Risk Assessment' }),
    ).toHaveCount(1);
  });
});

test.describe('mobile and tablet menu', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      !isMobileProject(testInfo.project.name) && testInfo.project.name !== 'tablet',
      'small screens only',
    );
  });

  test('opens, expands a section, navigates and closes', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.primary-nav')).toBeHidden();

    const openButton = page.getByRole('button', { name: 'Open menu' });
    await openButton.click();
    const dialog = page.locator('dialog[data-menu]');
    await expect(dialog).toBeVisible();

    const wellness = dialog.getByRole('button', { name: 'Wellness' });
    await expect(wellness).toHaveAttribute('aria-expanded', 'false');
    await wellness.click();
    await expect(wellness).toHaveAttribute('aria-expanded', 'true');

    await dialog.getByRole('link', { name: 'Smoothie Bike' }).click();
    await expect(page).toHaveURL(/\/smoothie-bike\/?$/);
    await expect(page.locator('dialog[data-menu]')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Mintirho Smoothie Bike');
  });

  test('closes with Escape and returns focus', async ({ page }) => {
    await page.goto('/contact');
    const openButton = page.getByRole('button', { name: 'Open menu' });
    await openButton.click();
    await expect(page.locator('dialog[data-menu]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog[data-menu]')).toBeHidden();
    await expect(openButton).toBeFocused();
  });

  test('keeps focus out of the page behind the open menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    // A native modal dialog makes the page inert. Tabbing past the last item may
    // move focus to the browser's own UI (reported as body), which is expected;
    // focus must never reach page content behind the menu.
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const allowed = await page.evaluate(() => {
        const el = document.activeElement;
        return !el || el === document.body || !!el.closest('dialog[data-menu]');
      });
      expect(allowed).toBe(true);
    }
  });

  test('the close button closes the menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.locator('dialog[data-menu]').getByRole('button', { name: 'Close menu' }).click();
    await expect(page.locator('dialog[data-menu]')).toBeHidden();
  });
});
