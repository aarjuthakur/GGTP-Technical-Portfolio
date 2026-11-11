import { test, expect } from '../fixtures/index';
import { generateUniqueEmail, TEST_CREDENTIALS } from '../config/env.config';

test('TC01: Register a new user with unique email', async ({ page, loginPage }) => {
  // Description: Verify user can successfully register with a unique email address

  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });

  // Generate unique email for this test
  const uniqueEmail = generateUniqueEmail();
  const userName = 'TestUser';

  // Fill signup form
  await page.fill('input[data-qa="signup-name"]', userName);
  await page.fill('input[data-qa="signup-email"]', uniqueEmail);
  await page.click('button[data-qa="signup-button"]');

  // Fill account creation details
  await page.click('#id_gender1');
  await page.fill('#password', TEST_CREDENTIALS.password);
  await page.selectOption('#days', '15');
  await page.selectOption('#months', '3');
  await page.selectOption('#years', '1990');
  await page.click('#newsletter');
  await page.click('#optin');

  await page.fill('#first_name', TEST_CREDENTIALS.firstName);
  await page.fill('#last_name', TEST_CREDENTIALS.lastName);
  await page.fill('#address1', '123 Test Street');
  await page.selectOption('#country', 'United States');
  await page.fill('#state', 'Illinois');
  await page.fill('#city', 'Chicago');
  await page.fill('#zipcode', '60601');
  await page.fill('#mobile_number', '5551234567');

  // Click create account button
  await page.click('button[data-qa="create-account"]');

  // Verify account was created
  await expect(page.locator('h2[data-qa="account-created"]')).toBeVisible();
  const confirmMessage = await page.textContent('h2[data-qa="account-created"]');
  expect(confirmMessage).toContain('Account Created');
});
