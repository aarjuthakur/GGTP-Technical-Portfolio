import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC18: Verify Product quantity in Cart', async ({ page }) => {
  // Description: Verify quantity modification and cart display accuracy

  const capture = new ScreenshotCapture();

  // Navigate to product detail page directly
  await page.goto('https://automationexercise.com/product_details/1', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC18', 'step1_product_page', 'Product detail page');

  // Set quantity to 4
  const quantityInput = page.locator('#quantity');
  await quantityInput.clear();
  await quantityInput.fill('4');
  await capture.captureWithAnnotation(page, 'TC18', 'step2_quantity_set', 'Quantity set to 4');

  // Click add to cart button on the product detail page
  await page.locator('button.cart').click();

  // Handle modal — click View Cart
  const viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  await expect(viewCartLink).toBeVisible({ timeout: 5000 });
  await viewCartLink.click();
  await page.waitForLoadState('domcontentloaded');
  await capture.captureWithAnnotation(page, 'TC18', 'step3_cart_view', 'Cart page with product');

  // Verify quantity in cart (displayed as a button element with class "disabled")
  const cartQuantity = page.locator('.cart_quantity button.disabled').first();
  await expect(cartQuantity).toBeVisible({ timeout: 10000 });
  const quantityText = await cartQuantity.textContent();
  expect(quantityText?.trim()).toBe('4');

  // Verify price is shown
  await expect(page.locator('.cart_total_price').first()).toBeVisible();
});
