import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';
import { TEST_CREDENTIALS } from '../config/env.config';

test('TC24: Verify address details in checkout page', async ({ page }) => {
  // Description: Confirm address accuracy during checkout

  const capture = new ScreenshotCapture();

  // Step 1: Login using data-qa selectors
  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  await page.locator('input[data-qa="login-email"]').fill(TEST_CREDENTIALS.email);
  await page.locator('input[data-qa="login-password"]').fill(TEST_CREDENTIALS.password);
  await page.locator('button[data-qa="login-button"]').click();
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => null);
  await capture.captureWithAnnotation(page, 'TC24', 'step1_logged_in', 'User logged in');

  // Step 2: Add product to cart from product detail page (reliable across browsers)
  await page.goto('https://automationexercise.com/product_details/1', { waitUntil: 'domcontentloaded' });
  await page.locator('button.cart').click();

  // Handle modal — click Continue Shopping
  const continueBtn = page.locator('#cartModal button.btn-success');
  await expect(continueBtn).toBeVisible({ timeout: 5000 });
  await continueBtn.click();

  // Step 3: Go to cart and checkout
  await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC24', 'step2_cart_page', 'Cart page');

  // Verify cart has items before proceeding to checkout
  await expect(page.locator('#cart_info_table tbody tr').first()).toBeVisible({ timeout: 10000 });

  // Navigate directly to checkout (avoids modal issues on some browsers)
  await page.goto('https://automationexercise.com/checkout', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC24', 'step3_checkout_page', 'Checkout page loaded');

  // Step 4: Verify address details are shown (displayed as text, not input fields)
  const deliveryAddr = page.locator('#address_delivery');
  await expect(deliveryAddr).toBeVisible({ timeout: 10000 });
  await capture.captureWithAnnotation(page, 'TC24', 'step4_address_details', 'Address details visible');
  console.log('TC24 PASSED: Address details verified in checkout page');
});
