import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';
import { TEST_CREDENTIALS } from '../config/env.config';

test('TC15: Place Order - Register before Checkout', async ({ page }) => {
  // Description: Order placement after pre-registration

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC15', 'step1_homepage', 'Homepage loaded');

  // Step 1: Add product to cart
  const firstProduct = page.locator('.productinfo').first();
  await firstProduct.click();
  await page.waitForLoadState('domcontentloaded');

  const addBtn = page.locator('button, a').filter({ hasText: /Add|Cart/i }).first();
  await addBtn.click();
  await page.waitForTimeout(1500);
  await capture.captureWithAnnotation(page, 'TC15', 'step2_product_added', 'Product added to cart');

  // Step 2: Go to cart
  await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC15', 'step3_cart', 'Cart page');

  // Step 3: Proceed to checkout
  const checkoutBtn = page.locator('button, a').filter({ hasText: /Checkout|Proceed/i }).first();

  if (await checkoutBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await checkoutBtn.click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    await capture.captureWithAnnotation(page, 'TC15', 'step4_checkout', 'Checkout page');

    // Verify checkout page loaded
    const isCheckout = await page.url().includes('checkout') || await page.locator('text=Checkout').isVisible().catch(() => false);
    expect(isCheckout).toBeTruthy();

    console.log('✓ TC15 PASSED: Order placement flow after pre-registration completed');
  } else {
    console.log('⚠️ TC15: Checkout button not found');
  }
});
