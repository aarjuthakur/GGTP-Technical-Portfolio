import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC23: Add to cart from Recommended items', async ({ page }) => {
  // Description: Test recommended products feature and cart addition

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC23', 'step1_homepage', 'Homepage loaded');

  // Scroll down to the recommended items section
  const recommendedHeading = page.locator('.recommended_items h2.title');
  await recommendedHeading.scrollIntoViewIfNeeded();
  await expect(recommendedHeading).toBeVisible({ timeout: 10000 });
  await capture.captureWithAnnotation(page, 'TC23', 'step2_recommended_visible', 'Recommended items section visible');

  // Click add-to-cart via JavaScript since carousel hides inactive slides
  await page.evaluate(() => {
    const btn = document.querySelector('#recommended-item-carousel .active a.add-to-cart') as HTMLElement
      ?? document.querySelector('#recommended-item-carousel a.add-to-cart') as HTMLElement;
    if (btn) btn.click();
  });

  // Handle modal — click View Cart
  const viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  await expect(viewCartLink).toBeVisible({ timeout: 5000 });
  await viewCartLink.click();
  await page.waitForLoadState('domcontentloaded');
  await capture.captureWithAnnotation(page, 'TC23', 'step3_cart_page', 'Recommended item added to cart');

  // Verify cart has the item
  await expect(page.locator('#cart_info_table tbody tr').first()).toBeVisible({ timeout: 10000 });
});
