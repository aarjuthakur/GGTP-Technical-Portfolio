import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC04: Login with invalid credentials - should show error', async ({ page }) => {
  // Description: Verify error handling when login with incorrect email/password

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC04', 'step1_login_page', 'Login page loaded');

  // Fill invalid credentials using stable data-qa selectors
  await page.locator('input[data-qa="login-email"]').fill('invalid.email@test.com');
  await page.locator('input[data-qa="login-password"]').fill('WrongPassword123');

  await capture.captureWithAnnotation(page, 'TC04', 'step2_filled_form', 'Invalid credentials filled');

  await page.locator('button[data-qa="login-button"]').click();

  await page.waitForLoadState('domcontentloaded');
  await capture.captureWithAnnotation(page, 'TC04', 'step3_error_message', 'Error message displayed');

  // Verify error message appears
  const errorMsg = page.locator('p:has-text("Your email or password is incorrect")');
  await expect(errorMsg).toBeVisible({ timeout: 10000 });
});
