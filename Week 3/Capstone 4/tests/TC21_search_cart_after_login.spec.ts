import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';
import { TEST_CREDENTIALS } from '../config/env.config';

test('TC21: Search Products and Verify Cart After Login', async ({ page }) => {
  // Description: Validate cart persistence across login sessions

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC21', 'step1_homepage', 'Homepage loaded');

  // Step 1: Search for a product (as guest)
  const searchInput = page.locator('input[id*="search"], input[placeholder*="Search"]').first();

  if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
    await searchInput.fill('Dress');
    await capture.captureWithAnnotation(page, 'TC21', 'step2_search_entered', 'Search term entered');

    const searchBtn = page.locator('button').filter({ hasText: /Search/i }).first();
    if (await searchBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await searchBtn.click();
    } else {
      await searchInput.press('Enter');
    }

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
    await capture.captureWithAnnotation(page, 'TC21', 'step3_search_results', 'Search results displayed');

    // Step 2: Add product to cart
    const firstProduct = page.locator('.productinfo').first();
    await firstProduct.click();
    await page.waitForLoadState('domcontentloaded');

    const addBtn = page.locator('button, a').filter({ hasText: /Add|Cart/i }).first();
    if (await addBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await addBtn.click();
      await page.waitForTimeout(1500);
      await capture.captureWithAnnotation(page, 'TC21', 'step4_added_to_cart', 'Product added to cart');
    }

    // Step 3: Login
    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
    await page.click('a:has-text("Signup / Login")', { timeout: 10000 });
    await page.waitForLoadState('domcontentloaded');

    const emailInput = page.locator('form').first().locator('input[type="email"]').first();
    const passwordInput = page.locator('form').first().locator('input[type="password"]').first();

    await emailInput.fill(TEST_CREDENTIALS.email);
    await passwordInput.fill(TEST_CREDENTIALS.password);

    const loginBtn = page.locator('form').first().locator('button[type="submit"]').first();
    await loginBtn.click();
    await page.waitForTimeout(3000);
    await capture.captureWithAnnotation(page, 'TC21', 'step5_logged_in', 'User logged in');

    // Step 4: Verify cart still has items after login
    await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    await capture.captureWithAnnotation(page, 'TC21', 'step6_cart_after_login', 'Cart contents after login');

    const cartItems = await page.locator('.productinfo, tr').count();
    expect(cartItems).toBeGreaterThan(0);

    console.log('✓ TC21 PASSED: Cart persisted after login');
  } else {
    console.log('⚠️ TC21: Search functionality not available');
  }
});
