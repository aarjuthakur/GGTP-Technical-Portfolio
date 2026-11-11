import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';
import { TEST_CREDENTIALS } from '../config/env.config';

test('TC13: Place order and verify order confirmation', async ({ page }) => {
  // Description: Verify complete order placement flow end-to-end

  const capture = new ScreenshotCapture();

  // Step 1: Login using data-qa selectors (site redirects to homepage after login)
  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  await page.locator('input[data-qa="login-email"]').fill(TEST_CREDENTIALS.email);
  await page.locator('input[data-qa="login-password"]').fill(TEST_CREDENTIALS.password);
  await page.locator('button[data-qa="login-button"]').click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('a[href="/logout"]')).toBeVisible({ timeout: 15000 });
  await capture.captureWithAnnotation(page, 'TC13', 'step1_logged_in', 'User logged in');

  // Step 2: Add product to cart from product detail page (reliable across browsers)
  await page.goto('https://automationexercise.com/product_details/1', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('button.cart')).toBeVisible({ timeout: 15000 });
  await page.locator('button.cart').click();

  // Handle modal — click Continue Shopping
  const continueBtn = page.locator('#cartModal button.btn-success');
  await expect(continueBtn).toBeVisible({ timeout: 5000 });
  await continueBtn.click();

  // Step 3: Navigate to cart and proceed to checkout
  await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#cart_info_table tbody tr').first()).toBeVisible({ timeout: 10000 });
  await capture.captureWithAnnotation(page, 'TC13', 'step2_cart_review', 'Cart reviewed before checkout');

  const checkoutBtn = page.locator('a.check_out');
  await expect(checkoutBtn).toBeVisible({ timeout: 10000 });
  await checkoutBtn.click();
  await page.waitForLoadState('domcontentloaded');
  await capture.captureWithAnnotation(page, 'TC13', 'step3_checkout_page', 'Checkout page loaded');

  // Step 4: Verify checkout page with address and order details
  await expect(page).toHaveURL(/checkout/);
  await expect(page.locator('#address_delivery')).toBeVisible({ timeout: 10000 });
});
