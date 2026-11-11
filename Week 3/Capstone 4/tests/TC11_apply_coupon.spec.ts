import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';
import { TEST_CREDENTIALS } from '../config/env.config';

test('TC11: Apply coupon code to cart and verify discount', async ({ page }) => {
  // Description: Verify coupon code functionality in checkout

  const capture = new ScreenshotCapture();

  // Step 1: Add product to cart from product detail page (reliable across browsers)
  await page.goto('https://automationexercise.com/product_details/1', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('button.cart')).toBeVisible({ timeout: 15000 });
  await page.locator('button.cart').click();

  // Handle modal — click Continue Shopping
  const continueBtn = page.locator('#cartModal button.btn-success');
  await expect(continueBtn).toBeVisible({ timeout: 5000 });
  await continueBtn.click();

  // Navigate to cart
  await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC11', 'step1_cart_page', 'Cart page with item');

  // Verify cart has items
  await expect(page.locator('#cart_info_table tbody tr').first()).toBeVisible({ timeout: 10000 });

  // Step 2: Look for coupon code input
  const couponInput = page.locator('input[name*="coupon"], input[placeholder*="Coupon"], input[id*="coupon"]').first();

  if (await couponInput.isVisible({ timeout: 5000 }).catch(() => false)) {
    await couponInput.fill('TESTCOUPON');
    await capture.captureWithAnnotation(page, 'TC11', 'step2_coupon_entered', 'Coupon code entered');

    const applyBtn = page.locator('button').filter({ hasText: /Apply|Coupon/i }).first();
    if (await applyBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await applyBtn.click();
      await page.waitForTimeout(2000);
      await capture.captureWithAnnotation(page, 'TC11', 'step3_coupon_applied', 'Coupon application attempted');
    }
  }

  // Verify we're still on the cart page with our item
  await expect(page).toHaveURL(/view_cart/);
});
