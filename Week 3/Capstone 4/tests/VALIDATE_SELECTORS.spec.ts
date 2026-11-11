import { test, expect } from '../fixtures/index';

test('VALIDATE: Test actual selectors on website', async ({ page }) => {
  // This test finds and validates CORRECT selectors that actually work

  console.log('\n=== VALIDATING SELECTORS ===\n');

  // TEST 1: Homepage & Products
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  console.log('\n1. PRODUCT SELECTORS:');
  const products = page.locator('.productinfo');
  const productCount = await products.count();
  console.log(`   ✅ .productinfo: ${productCount} products found`);

  const productNames = page.locator('.productinfo h2');
  const nameCount = await productNames.count();
  console.log(`   ✅ .productinfo h2: ${nameCount} product names`);

  // TEST 2: Login Link
  console.log('\n2. LOGIN LINK:');
  const loginLink = page.locator('a:has-text("Signup / Login")');
  const isLoginVisible = await loginLink.isVisible({ timeout: 3000 }).catch(() => false);
  console.log(`   ${isLoginVisible ? '✅' : '❌'} a:has-text("Signup / Login"): ${isLoginVisible}`);

  // TEST 3: Click into login page
  if (isLoginVisible) {
    await loginLink.click();
    await page.waitForLoadState('domcontentloaded');

    console.log('\n3. LOGIN FORM SELECTORS:');

    // Find email input
    const emailInputs = page.locator('input[type="email"]');
    const emailCount = await emailInputs.count();
    console.log(`   ✅ input[type="email"]: ${emailCount} fields found`);

    // Find password input
    const passwordInputs = page.locator('input[type="password"]');
    const passwordCount = await passwordInputs.count();
    console.log(`   ✅ input[type="password"]: ${passwordCount} fields found`);

    // Find submit buttons
    const submitButtons = page.locator('button[type="submit"]');
    const submitCount = await submitButtons.count();
    console.log(`   ✅ button[type="submit"]: ${submitCount} buttons found`);

    // Find signup button
    const signupBtn = page.locator('button:has-text("Signup")');
    const signupCount = await signupBtn.count();
    console.log(`   ✅ button:has-text("Signup"): ${signupCount} buttons found`);
  }

  // TEST 4: Cart
  console.log('\n4. CART SELECTORS:');
  await page.goto('https://automationexercise.com/view_cart', { waitUntil: 'domcontentloaded' });

  const cartTable = page.locator('table tbody tr');
  const cartRows = await cartTable.count();
  console.log(`   ✅ table tbody tr: ${cartRows} rows found`);

  const removeLinks = page.locator('a:has-text("X")');
  const removeCount = await removeLinks.count();
  console.log(`   ✅ a:has-text("X"): ${removeCount} remove buttons found`);

  // TEST 5: Newsletter
  console.log('\n5. NEWSLETTER SELECTORS:');
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  const emailInputsAll = page.locator('input[type="email"]');
  const lastEmail = emailInputsAll.last();
  const isLastEmailVisible = await lastEmail.isVisible({ timeout: 3000 }).catch(() => false);
  console.log(`   ${isLastEmailVisible ? '✅' : '❌'} input[type="email"].last(): ${isLastEmailVisible}`);

  const subscribeBtn = page.locator('button:has-text("Subscribe")');
  const subscribeBtnVisible = await subscribeBtn.isVisible({ timeout: 3000 }).catch(() => false);
  console.log(`   ${subscribeBtnVisible ? '✅' : '❌'} button:has-text("Subscribe"): ${subscribeBtnVisible}`);

  // TEST 6: Add to Cart button on product page
  console.log('\n6. ADD TO CART SELECTORS:');
  const firstProduct = page.locator('.productinfo').first();
  if (await firstProduct.isVisible({ timeout: 3000 }).catch(() => false)) {
    await firstProduct.click();
    await page.waitForLoadState('domcontentloaded');

    const addBtn = page.locator('a:has-text("Add")').first();
    const addBtnVisible = await addBtn.isVisible({ timeout: 3000 }).catch(() => false);
    console.log(`   ${addBtnVisible ? '✅' : '❌'} a:has-text("Add"): ${addBtnVisible}`);
  }

  // TEST 7: Categories
  console.log('\n7. CATEGORY SELECTORS:');
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  const categories = page.locator('a:has-text("Women"), a:has-text("Men"), a:has-text("Kids")');
  const categoryCount = await categories.count();
  console.log(`   ✅ Category links: ${categoryCount} found`);

  console.log('\n=== VALIDATION COMPLETE ===\n');
});
