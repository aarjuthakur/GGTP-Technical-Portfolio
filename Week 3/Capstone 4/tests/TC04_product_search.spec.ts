import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC04: Verify products are displayed on homepage', async ({ page }) => {
  // Description: Verify product listing and display works correctly

  const capture = new ScreenshotCapture();

  // Step 1: Navigate to homepage
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('domcontentloaded');
  await capture.captureWithAnnotation(page, 'TC04', 'step1_homepage_loaded', 'Homepage loaded successfully');

  // Step 2: Verify products are visible
  const products = await page.locator('.productinfo');
  const productCount = await products.count();
  expect(productCount).toBeGreaterThan(0);

  // Step 3: Get first product info
  const firstProductName = await page.locator('.productinfo').first().locator('h2').first().textContent();
  expect(firstProductName).toBeTruthy();
  expect(firstProductName?.trim().length).toBeGreaterThan(0);

  await capture.captureWithAnnotation(page, 'TC04', 'step2_products_visible', `${productCount} products visible`);

  // Step 4: Verify product element is visible
  const firstProductElement = page.locator('.productinfo').first();
  await expect(firstProductElement).toBeVisible({ timeout: 10000 });

  console.log(`✓ TC04 PASSED: Found ${productCount} products`);
  console.log(`✓ First product: ${firstProductName}`);
});
