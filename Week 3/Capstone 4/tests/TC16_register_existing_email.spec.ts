import { test, expect } from '../fixtures/index';
import { TEST_CREDENTIALS } from '../config/env.config';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC16: Register User with existing email - should show error', async ({ page }) => {
  // Description: Verify error message when registering with already-registered email

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC16', 'step1_homepage', 'Homepage loaded');

  // Click on Signup/Login
  await page.click('a[href="/login"]');
  await page.waitForLoadState('domcontentloaded');

  // Fill signup form with existing email
  const nameInput = page.locator('input[data-qa="signup-name"]');
  const emailInput = page.locator('input[data-qa="signup-email"]');

  await nameInput.fill('Test User');
  // Using email that already exists (newuser1101@example.com)
  await emailInput.fill(TEST_CREDENTIALS.email);
  await capture.captureWithAnnotation(page, 'TC16', 'step2_form_filled', 'Signup form filled with existing email');

  const signupBtn = page.locator('button[data-qa="signup-button"]');
  await signupBtn.click();

  // Wait for error message
  await page.waitForTimeout(2000);
  await capture.captureWithAnnotation(page, 'TC16', 'step3_error_shown', 'Error message displayed');

  // Verify error message appears
  const errorMsg = page.locator('text=Email Address already exist');
  const isErrorVisible = await errorMsg.isVisible({ timeout: 5000 }).catch(() => false);

  expect(isErrorVisible).toBeTruthy();
  console.log('✓ TC16 PASSED: Error message shown for existing email');
});
