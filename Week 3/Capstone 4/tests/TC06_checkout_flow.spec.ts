import { test, expect } from '../fixtures/index';
import { TEST_CREDENTIALS } from '../config/env.config';

test('TC06: Complete checkout flow - login, add product, and place order', async ({ page }) => {
  // Description: Verify complete e2e checkout flow from login to order placement

  // Step 1: Login using data-qa selectors
  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  await page.locator('input[data-qa="login-email"]').fill(TEST_CREDENTIALS.email);
  await page.locator('input[data-qa="login-password"]').fill(TEST_CREDENTIALS.password);
  await page.locator('button[data-qa="login-button"]').click();
  await page.waitForLoadState('domcontentloaded');

  // Verify logged in
  await expect(page.locator('a[href="/logout"]')).toBeVisible({ timeout: 15000 });

  // Step 2: Add product to cart from product detail page (reliable across browsers)
  await page.goto('https://automationexercise.com/product_details/1', { waitUntil: 'domcontentloaded' });
  const addToCartBtn = page.locator('button.cart');
  await expect(addToCartBtn).toBeVisible({ timeout: 15000 });
  await addToCartBtn.click();

  // Handle modal — click View Cart
  const viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  await expect(viewCartLink).toBeVisible({ timeout: 5000 });
  await viewCartLink.click();
  await page.waitForLoadState('domcontentloaded');

  // Step 3: Proceed to checkout
  await expect(page).toHaveURL(/view_cart/);
  const checkoutBtn = page.locator('a.check_out');
  await expect(checkoutBtn).toBeVisible({ timeout: 10000 });
  await checkoutBtn.click();
  await page.waitForLoadState('domcontentloaded');

  // Step 4: Verify checkout page loaded
  await expect(page).toHaveURL(/checkout/);
  await expect(page.locator('#address_delivery')).toBeVisible({ timeout: 10000 });
});
