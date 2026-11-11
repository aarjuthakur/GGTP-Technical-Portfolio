import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { satisfiedPageTwo } from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-013 - Conditional date picker (published form)', () => {
  test('the start date question is a date picker', async ({ forms, steps }) => {
    test.fail(true, 'DEF-010: "When did you start using our product?" is a textarea, not a date picker');

    await forms.reachPageTwo(PUBLISHED_FORM_URL, validUser);
    await expect(
      forms.question(LIVE_Q.customerSince).locator('input[role=combobox]'),
      'The reference date question should be a real date picker',
    ).toBeVisible();
    steps.push('Confirmed Page 2 renders "When did you become a customer?" as a date picker');

    await forms.completePageTwo(satisfiedPageTwo);
    await forms.next();
    steps.push('Completed Pages 1 and 2 and arrived on S3A Your Experience');

    const startDate = forms.question(LIVE_Q.startedUsing);
    await expect(startDate, 'The start-date question should be visible on S3A').toBeVisible();
    await forms.fillText(LIVE_Q.startedUsing, '05/01/2024');
    await expect(
      startDate.locator('[data-automation-id="textInput"]'),
      'The entered value should be retained',
    ).toHaveValue('05/01/2024');
    steps.push('Entered 05/01/2024 and verified the value is retained');

    await expect(
      startDate.locator('input[role=combobox]'),
      'A date question must expose a date-picker combobox',
    ).toBeVisible();
    steps.push('Verified the control is a date picker');

    workflow('TC-013 - The conditional start-date question is a date picker', steps);
  });
});
