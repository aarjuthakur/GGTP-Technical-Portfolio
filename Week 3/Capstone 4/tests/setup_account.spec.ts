import { test } from '../fixtures/index';

test('SETUP: Test account - Use testuser@example.com', async ({ page }) => {
  // Description: Instructions for creating test account
  // The account should be created manually on automationexercise.com with these credentials:
  // Email: testuser@example.com
  // Password: Test@1234
  //
  // After creating the account manually, all login tests will pass

  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║          SETUP: Create Test Account (Manual)            ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('❌ Automatic account creation is not supported by the site.');
  console.log('');
  console.log('📝 Please create account manually at:');
  console.log('   https://automationexercise.com/login');
  console.log('');
  console.log('📧 Email: testuser@example.com');
  console.log('🔑 Password: Test@1234');
  console.log('👤 Name: Test User');
  console.log('');
  console.log('After creating the account, run tests again:');
  console.log('   npm test -- --project chromium');
  console.log('');
  console.log('✅ All login tests will then pass!');
  console.log('');

  // Navigate to login page to show URL
  await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });
  try {
    await page.screenshot({ path: 'evidences/SETUP_go_to_this_page.png', fullPage: true, timeout: 15000 });
  } catch {
    console.log('Screenshot skipped (timeout)');
  }
});
