import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC01: Navigate to homepage and verify UI elements', async ({ page }) => {
  // Description: Verify homepage loads and displays main UI elements

  const capture = new ScreenshotCapture();

  // Step 1: Navigate to homepage
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('domcontentloaded');
  await capture.captureWithAnnotation(page, 'TC01', 'step1_homepage', 'Homepage loaded');

  // Step 2: Verify page title
  const title = await page.title();
  expect(title).toContain('Automation Exercise');
  console.log(`✓ Page title: ${title}`);

  // Step 3: Verify main navigation elements
  const loginLink = page.locator('a[href="/login"]');
  await expect(loginLink).toBeVisible({ timeout: 10000 });
  await capture.captureWithAnnotation(page, 'TC01', 'step2_navigation', 'Navigation elements visible');

  // Step 4: Verify products section
  const products = await page.locator('.productinfo').count();
  expect(products).toBeGreaterThan(0);
  await capture.captureWithAnnotation(page, 'TC01', 'step3_products', `${products} products displayed`);

  console.log('✓ TC01 PASSED: Homepage verified');
});
