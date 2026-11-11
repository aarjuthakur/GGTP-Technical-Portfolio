import { Page } from '@playwright/test';

export async function getRandomProduct(page: Page): Promise<string> {
  const products = await page.locator('.productinfo').count();
  const randomIndex = Math.floor(Math.random() * products);
  return await page.locator(`.productinfo:nth-child(${randomIndex + 1}) h2`).textContent() || '';
}

export async function formatCurrency(value: string): Promise<number> {
  return parseFloat(value.replace(/[^0-9.]/g, ''));
}

export async function getCurrentTimestamp(): Promise<string> {
  return new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
}

export async function getTableRowCount(page: Page, tableSelector: string): Promise<number> {
  return await page.locator(`${tableSelector} tbody tr`).count();
}

export async function verifyPageTitle(page: Page, expectedTitle: string): Promise<boolean> {
  const title = await page.title();
  return title.includes(expectedTitle);
}

export async function isElementPresent(page: Page, selector: string): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
}

export async function waitForElementAndClick(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector, { timeout: 10000 });
  await page.click(selector);
}

export async function captureFullPageScreenshot(page: Page, filename: string): Promise<void> {
  await page.screenshot({
    path: `screenshots/${filename}-${Date.now()}.png`,
    fullPage: true
  });
}
