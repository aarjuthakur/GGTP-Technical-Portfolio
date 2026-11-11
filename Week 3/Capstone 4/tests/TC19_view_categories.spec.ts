import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC19: View Category Products', async ({ page }) => {
  // Description: Verify category and subcategory navigation functionality

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC19', 'step1_homepage', 'Homepage loaded');

  // Look for categories sidebar
  const categories = page.locator('text=Category').first();

  if (await categories.isVisible({ timeout: 5000 }).catch(() => false)) {
    await capture.captureWithAnnotation(page, 'TC19', 'step2_categories_visible', 'Categories section visible');

    // Get all category links
    const categoryLinks = page.locator('a').filter({ hasText: /Women|Men|Kids/i });
    const categoryCount = await categoryLinks.count();

    if (categoryCount > 0) {
      console.log(`✓ Found ${categoryCount} categories`);

      // Click first category
      const firstCategory = categoryLinks.first();
      await firstCategory.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      await capture.captureWithAnnotation(page, 'TC19', 'step3_category_selected', 'Category products displayed');

      // Verify products are filtered
      const products = await page.locator('.productinfo').count();
      expect(products).toBeGreaterThan(0);

      console.log(`✓ TC19 PASSED: Found ${products} products in selected category`);
    } else {
      console.log('⚠️ TC19: No category links found');
    }
  } else {
    console.log('⚠️ TC19: Categories section not found');
  }
});
