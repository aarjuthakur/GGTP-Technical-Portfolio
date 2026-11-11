import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_FORM, LIVE_Q } from '../../config/liveForm';

test.describe('TC-001 - Form Page Load (published form)', () => {
  test('published survey loads without errors and shows Page 1', async ({ forms, steps }) => {
    const errors: string[] = [];
    forms.page.on('pageerror', (error) => errors.push(error.message));

    await forms.open(PUBLISHED_FORM_URL);
    steps.push('Opened the published Microsoft Forms survey');

    await expect(forms.formTitle, 'Form title should be visible').toHaveText(LIVE_FORM.title);
    steps.push('Verified the form title "' + LIVE_FORM.title + '"');

    await expect(forms.welcomeMessage, 'Welcome/description message should be shown').toBeVisible();
    steps.push('Verified the welcome message is displayed');

    await expect(forms.privacyNotice, 'Responder privacy notice should be shown').toBeVisible();
    steps.push('Verified the privacy notice above the Start button');

    await forms.startButton.click();
    steps.push('Clicked "Start now" to enter the questionnaire');

    await expect(forms.progress, 'Progress should start on page 1 of 6').toContainText('Page 1 of 6');
    steps.push('Verified the progress indicator shows "Page 1 of 6"');

    for (const title of [LIVE_Q.fullName, LIVE_Q.email, LIVE_Q.company, LIVE_Q.employees]) {
      await expect(forms.question(title), `"${title}" should be on Page 1`).toBeVisible();
    }
    steps.push('Verified Page 1 asks name, e-mail, company and headcount');

    expect(errors, 'No uncaught page exception should occur while loading the form').toEqual([]);
    steps.push('Confirmed the load raised no uncaught exceptions');

    await test.info().attach('published-form-page-1', {
      body: await forms.page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  });
});
