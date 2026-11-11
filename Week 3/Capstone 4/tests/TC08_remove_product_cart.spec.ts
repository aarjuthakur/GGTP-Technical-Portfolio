import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC08: Remove product from cart and verify', async ({ page }) => {
  // Description: Verify product can be removed from cart successfully

  const capture = new ScreenshotCapture();

  // Navigate to homepage
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC08', 'step1_homepage', 'Homepage loaded');

  // Step 1: Add product to cart via hover overlay
  await page.locator('.productinfo img').first().hover();
  await page.locator('.product-overlay a.add-to-cart').first().click();

  // Handle modal — click View Cart
  const viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  await expect(viewCartLink).toBeVisible({ timeout: 5000 });
  await viewCartLink.click();
  await page.waitForLoadState('domcontentloaded');
  await capture.captureWithAnnotation(page, 'TC08', 'step2_cart_with_item', 'Item in cart before removal');

  // Verify item is in cart
  const cartRows = page.locator('#cart_info_table tbody tr');
  const itemsBefore = await cartRows.count();
  expect(itemsBefore).toBeGreaterThan(0);

  // Step 2: Remove product from cart using the X button (the anchor IS the .cart_quantity_delete)
  await page.locator('a.cart_quantity_delete').first().click();
  await page.waitForTimeout(2000);
  await capture.captureWithAnnotation(page, 'TC08', 'step3_after_removal', 'Product removed from cart');

  // Verify cart is empty
  await expect(page.locator('#empty_cart')).toBeVisible({ timeout: 10000 });
});
