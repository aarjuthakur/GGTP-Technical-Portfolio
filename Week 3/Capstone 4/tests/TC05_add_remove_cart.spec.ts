import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC05: Add product to cart and verify', async ({ page }) => {
  // Description: Verify adding product to cart works correctly

  const capture = new ScreenshotCapture();

  // Step 1: Navigate to home page
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC05', 'step1_homepage', 'Homepage loaded with products');

  // Step 2: Hover over the first product overlay to reveal the add-to-cart button, then click
  const productOverlay = page.locator('.product-overlay').first();
  const productImage = page.locator('.productinfo img').first();
  await productImage.hover();
  const overlayAddBtn = productOverlay.locator('a.add-to-cart');
  await overlayAddBtn.click();
  await capture.captureWithAnnotation(page, 'TC05', 'step2_added_to_cart', 'Clicked Add to Cart on first product');

  // Step 3: Handle the modal — click View Cart link in the modal
  const viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  await expect(viewCartLink).toBeVisible({ timeout: 5000 });
  await viewCartLink.click();
  await page.waitForLoadState('domcontentloaded');
  await capture.captureWithAnnotation(page, 'TC05', 'step3_view_cart', 'Cart page displayed');

  // Verify cart page loaded and has items
  await expect(page).toHaveURL(/view_cart/);
  const cartRows = page.locator('#cart_info_table tbody tr');
  await expect(cartRows.first()).toBeVisible({ timeout: 10000 });
  console.log('TC05 PASSED: Product added to cart');
});
