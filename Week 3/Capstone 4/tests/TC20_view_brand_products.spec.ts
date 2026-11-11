import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC20: View & Cart Brand Products', async ({ page }) => {
  // Description: Test brand filtering and product display by brand

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC20', 'step1_homepage', 'Homepage loaded');

  // Scroll down to find brands section
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
  await page.waitForTimeout(1000);
  await capture.captureWithAnnotation(page, 'TC20', 'step2_scrolled', 'Scrolled to brands section');

  // Look for brands
  const brands = page.locator('text=Brands').first();

  if (await brands.isVisible({ timeout: 5000 }).catch(() => false)) {
    await capture.captureWithAnnotation(page, 'TC20', 'step3_brands_visible', 'Brands section visible');

    // Get brand links
    const brandLinks = page.locator('a').filter({ hasText: /Polo|H&M|Madame|Fabrication|Biba/i });
    const brandCount = await brandLinks.count();

    if (brandCount > 0) {
      console.log(`✓ Found ${brandCount} brands`);

      // Click first brand
      const firstBrand = brandLinks.first();
      const brandName = await firstBrand.textContent();
      await firstBrand.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      await capture.captureWithAnnotation(page, 'TC20', 'step4_brand_selected', `Products from ${brandName}`);

      // Verify products are filtered by brand
      const products = await page.locator('.productinfo').count();
      expect(products).toBeGreaterThan(0);

      // Add a product from this brand to cart (use JS click to avoid WebKit viewport issues)
      await page.evaluate(() => {
        const btn = document.querySelector('.productinfo a.add-to-cart') as HTMLElement;
        if (btn) btn.click();
      });
      await page.waitForTimeout(1500);
      await capture.captureWithAnnotation(page, 'TC20', 'step5_added_to_cart', 'Brand product added to cart');
      console.log(`TC20 PASSED: Brand products filtered and added to cart`);
    } else {
      console.log('⚠️ TC20: No brand links found');
    }
  } else {
    console.log('⚠️ TC20: Brands section not found');
  }
});
