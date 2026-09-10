import { test, expect, type Page } from '@playwright/test';

const ENDPOINT = 'https://api.web3forms.com/submit';

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name === 'tablet', 'covered by desktop and phone projects');
});

async function fillValid(page: Page) {
  await page.getByLabel('Full name').fill('Test Person');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('Message').fill('We would like to book medicals for our staff.');
}

test('shows accessible errors for missing fields', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send enquiry' }).click();

  const name = page.getByLabel('Full name');
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#enquiry-name-error')).toHaveText('Please enter your name.');
  await expect(page.locator('#enquiry-email-error')).toHaveText('Please enter your email address.');
  await expect(page.locator('#enquiry-message-error')).toHaveText('Please enter a message.');

  await name.fill('Test Person');
  await expect(name).not.toHaveAttribute('aria-invalid', 'true');
});

test('validates the email format', async ({ page }) => {
  await page.goto('/contact');
  await fillValid(page);
  await page.getByLabel('Email address').fill('not an email');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.locator('#enquiry-email-error')).toContainText('valid email address');
});

test('submits successfully and confirms', async ({ page }) => {
  let payload = '';
  await page.route(ENDPOINT, async (route) => {
    payload = route.request().postData() ?? '';
    await route.fulfill({ status: 200, json: { success: true } });
  });

  await page.goto('/contact');
  await fillValid(page);
  await page.getByRole('button', { name: 'Send enquiry' }).click();

  const success = page.locator('[data-form-success]');
  await expect(success).toBeVisible();
  await expect(success).toBeFocused();
  await expect(page.locator('form[data-enquiry-form]')).toBeHidden();
  expect(payload).toContain('Test Person');
  expect(payload).toContain('Website enquiry: General enquiry');
});

test('reports a failed submission and allows a retry', async ({ page }) => {
  await page.route(ENDPOINT, (route) => route.fulfill({ status: 500, json: { success: false } }));

  await page.goto('/contact');
  await fillValid(page);
  const submit = page.getByRole('button', { name: 'Send enquiry' });
  await submit.click();

  await expect(page.locator('[data-form-status]')).toContainText('could not be sent');
  await expect(submit).toBeEnabled();
});

test('preselects the topic from the link', async ({ page }) => {
  await page.goto('/contact?topic=iv-lounge');
  await expect(page.getByLabel('What can we help with?')).toHaveValue('iv-lounge');
});

test('the Smoothie Bike page form defaults to the Smoothie Bike topic', async ({ page }) => {
  await page.goto('/smoothie-bike');
  await expect(page.getByLabel('What can we help with?')).toHaveValue('smoothie-bike');
});
