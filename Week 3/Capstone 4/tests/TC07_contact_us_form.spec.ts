import { test, expect } from '../fixtures/index';

test('TC07: Fill and submit Contact Us form', async ({ page }) => {
  // Description: Verify user can submit contact form and receive success confirmation

  await page.goto('https://automationexercise.com/contact_us', { waitUntil: 'domcontentloaded' });

  // Fill contact form fields using data-qa selectors
  await page.locator('input[data-qa="name"]').fill('John Doe');
  await page.locator('input[data-qa="email"]').fill('john.doe@example.com');
  await page.locator('input[data-qa="subject"]').fill('Test Subject');
  await page.locator('textarea[data-qa="message"]').fill('This is a test message for contact form submission');

  // Register dialog handler BEFORE clicking submit (the site shows a JS confirm alert)
  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  await page.locator('input[data-qa="submit-button"]').click();
  await page.waitForLoadState('domcontentloaded');

  // Verify success message (use the status-specific one to avoid matching footer newsletter alert)
  const successMsg = page.locator('.status.alert-success');
  await expect(successMsg).toBeVisible({ timeout: 10000 });
});
