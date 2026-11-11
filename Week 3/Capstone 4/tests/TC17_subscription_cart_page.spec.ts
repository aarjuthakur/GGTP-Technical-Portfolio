import { test, expect } from '../fixtures/index';
import { ScreenshotCapture } from '../utils/screenshot';

test('TC17: Verify Subscription in Cart page', async ({ page }) => {
  // Description: Verify newsletter subscription functionality on cart page

  const capture = new ScreenshotCapture();

  // Navigate directly to cart page
  await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });
  await capture.captureWithAnnotation(page, 'TC17', 'step1_cart_page', 'Cart page loaded');

  // Scroll down to the footer subscription section
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  await capture.captureWithAnnotation(page, 'TC17', 'step2_scrolled', 'Scrolled to newsletter section');

  // Fill the subscription email with a unique address (note: site has typo in id — "susbscribe")
  const uniqueEmail = `test_${Date.now()}@example.com`;
  const newsletterInput = page.locator('#susbscribe_email');
  await expect(newsletterInput).toBeVisible({ timeout: 5000 });
  await newsletterInput.fill(uniqueEmail);
  await capture.captureWithAnnotation(page, 'TC17', 'step3_email_entered', 'Newsletter email entered');

  // Dismiss any ad overlays that might block the footer
  await page.evaluate(() => {
    document.querySelectorAll('ins.adsbygoogle, iframe[id^="aswift"]').forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
  });

  // Wait for subscription.js to be loaded (binds on .searchform submit)
  await page.waitForFunction(() => typeof (window as any).jQuery !== 'undefined', { timeout: 10000 });

  // Click subscribe button
  const subscribeBtn = page.locator('#subscribe');
  await subscribeBtn.scrollIntoViewIfNeeded();
  await subscribeBtn.click({ timeout: 10000 });

  // Success message appears briefly (auto-hides after 1.5s), so check immediately
  const successMsg = page.locator('#success-subscribe');
  await expect(successMsg).toBeVisible({ timeout: 5000 });
  await capture.captureWithAnnotation(page, 'TC17', 'step4_subscribed', 'Subscription success message shown');

  console.log('TC17 PASSED: Newsletter subscription on cart page successful');
});
