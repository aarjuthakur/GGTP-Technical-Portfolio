import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC26: Verify Scroll Up using Arrow button', async ({ page }) => {
  // Description: Test scroll-to-top button functionality

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC26', 'step1_homepage', 'Homepage loaded');

  // Step 1: Scroll down to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  const scrollPositionBefore = await page.evaluate(() => window.scrollY);
  console.log(`Scrolled down to position: ${scrollPositionBefore}`);
  await capture.captureWithAnnotation(page, 'TC26', 'step2_scrolled_down', 'Page scrolled down');

  // Step 2: Click the #scrollUp button (injected by jQuery scrollUp plugin)
  const scrollUpBtn = page.locator('#scrollUp');
  await expect(scrollUpBtn).toBeVisible({ timeout: 5000 });
  await scrollUpBtn.click({ force: true });
  await capture.captureWithAnnotation(page, 'TC26', 'step3_clicked_button', 'Scroll up button clicked');

  // Wait for the scroll animation to complete (poll until scrollY < 100 or 5s timeout)
  await page.waitForFunction(
    () => window.scrollY < 100,
    { timeout: 5000 },
  );

  const scrollPositionAfter = await page.evaluate(() => window.scrollY);
  expect(scrollPositionAfter).toBeLessThan(scrollPositionBefore);
});
