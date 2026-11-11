import { test, expect } from '../fixtures/index';
import { TEST_CREDENTIALS } from '../config/env.config';

test('TC02: Login with valid credentials', async ({ page }) => {
  // Description: Verify user can login with valid email and password

  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });

  // Fill login credentials using stable data-qa selectors
  await page.locator('input[data-qa="login-email"]').fill(TEST_CREDENTIALS.email);
  await page.locator('input[data-qa="login-password"]').fill(TEST_CREDENTIALS.password);
  await page.locator('button[data-qa="login-button"]').click();

  await page.waitForLoadState('domcontentloaded');

  // Verify user is logged in by checking for logout link
  const logoutBtn = page.locator('a[href="/logout"]');
  await expect(logoutBtn).toBeVisible({ timeout: 15000 });
});
