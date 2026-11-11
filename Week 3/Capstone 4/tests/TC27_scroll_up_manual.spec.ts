import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC27: Verify Scroll Up without Arrow button', async ({ page }) => {
  // Description: Test manual scroll functionality

  const capture = new ScreenshotCapture();

  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC27', 'step1_homepage', 'Homepage loaded at top');

  // Step 1: Record top position
  const topPosition = await page.evaluate(() => window.scrollY);
  console.log(`✓ Top position: ${topPosition}`);

  // Step 2: Scroll down manually
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight * 5);
  });
  await page.waitForTimeout(1000);

  const bottomPosition = await page.evaluate(() => window.scrollY);
  console.log(`✓ Scrolled to position: ${bottomPosition}`);
  await capture.captureWithAnnotation(page, 'TC27', 'step2_scrolled_down', 'Page scrolled down manually');

  expect(bottomPosition).toBeGreaterThan(topPosition);

  // Step 3: Scroll back up manually without button
  await page.evaluate(() => {
    window.scrollBy(0, -window.innerHeight * 5);
  });
  await page.waitForTimeout(1000);

  const finalPosition = await page.evaluate(() => window.scrollY);
  console.log(`✓ Scrolled back to position: ${finalPosition}`);
  await capture.captureWithAnnotation(page, 'TC27', 'step3_scrolled_back_up', 'Page scrolled back up manually');

  expect(finalPosition).toBeLessThan(bottomPosition);
  console.log('✓ TC27 PASSED: Manual scroll functionality works correctly');
});
