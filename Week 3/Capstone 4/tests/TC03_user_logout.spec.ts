import { test, expect } from '../fixtures/index';
import { TEST_CREDENTIALS } from '../config/env.config';

test('TC03: Logout after successful login', async ({ page }) => {
  // Description: Verify user can logout and is redirected to login page

  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });

  // Fill login credentials using data-qa selectors
  await page.locator('input[data-qa="login-email"]').fill(TEST_CREDENTIALS.email);
  await page.locator('input[data-qa="login-password"]').fill(TEST_CREDENTIALS.password);
  await page.locator('button[data-qa="login-button"]').click();

  // Wait for logged-in homepage
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => null);

  // Verify logged in — Logout link visible in nav
  const logoutBtn = page.locator('a[href="/logout"]');
  await expect(logoutBtn).toBeVisible({ timeout: 10000 });

  // Click logout
  await logoutBtn.click();
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => null);

  // Verify user is logged out — Signup/Login link visible again
  const signupLink = page.locator('a[href="/login"]');
  await expect(signupLink).toBeVisible({ timeout: 10000 });
});
