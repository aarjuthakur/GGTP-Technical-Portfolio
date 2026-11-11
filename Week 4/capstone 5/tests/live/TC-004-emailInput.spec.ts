import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { validUser, invalidEmails } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-004 - Email Validation (published form)', () => {
  test('rejects an invalid e-mail and accepts a valid one', async ({ forms, steps }) => {
    await forms.openAndStart(PUBLISHED_FORM_URL);
    steps.push('Opened the published survey and passed the cover page');

    await forms.fillText(LIVE_Q.fullName, validUser.name);
    await forms.fillText(LIVE_Q.company, validUser.company);
    await forms.fillText(LIVE_Q.employees, validUser.employees);
    steps.push('Completed name, company and headcount with valid values');

    const invalid = invalidEmails[0];
    await forms.fillText(LIVE_Q.email, invalid);
    await forms.next();
    steps.push(`Entered the invalid address "${invalid}" and pressed Next`);

    await expect(forms.progress, 'An invalid e-mail must block navigation').toContainText('Page 1 of 6');
    await expect(
      forms.errorMessages.filter({ hasText: /e-?mail|valid|address/i }).first(),
      'Forms should raise the e-mail restriction message',
    ).toBeVisible();
    steps.push('Navigation was blocked and the e-mail restriction message was displayed');

    await forms.fillText(LIVE_Q.email, validUser.email);
    await forms.next();
    steps.push(`Corrected the address to "${validUser.email}" and pressed Next`);

    await expect(forms.progress, 'A valid e-mail should let the respondent continue').toContainText(
      'Page 2 of 6',
    );
    steps.push('The form advanced to Page 2 of 6');

    workflow('TC-004 - E-mail format validation works on the published form', steps);
  });
});
