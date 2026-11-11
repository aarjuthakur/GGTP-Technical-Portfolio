import { Locator, expect } from '@playwright/test';

export function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function expectVisible(locator: Locator, message: string): Promise<void> {
  await expect(locator, message).toBeVisible();
}

export async function expectHidden(locator: Locator, message: string): Promise<void> {
  await expect(locator, message).toBeHidden();
}

export async function expectText(locator: Locator, expected: string, message: string): Promise<void> {
  await expect(locator, message).toHaveText(expected);
}

export async function expectContains(locator: Locator, expected: string, message: string): Promise<void> {
  await expect(locator, message).toContainText(expected);
}

export async function readRankingOrder(list: Locator): Promise<string[]> {
  const items = list.locator('li');
  const count = await items.count();
  const values: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const value = await items.nth(i).getAttribute('data-value');
    values.push(value ?? '');
  }
  return values;
}
