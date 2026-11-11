import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-005 - Number Field Input (published form)', () => {
  test('accepts a numeric headcount and rejects words', async ({ forms, steps }) => {
    await forms.openAndStart(PUBLISHED_FORM_URL);
    steps.push('Opened the published survey and passed the cover page');

    await forms.fillText(LIVE_Q.fullName, validUser.name);
    await forms.fillText(LIVE_Q.email, validUser.email);
    await forms.fillText(LIVE_Q.company, validUser.company);
    steps.push('Completed name, e-mail and company with valid values');

    await forms.fillText(LIVE_Q.employees, 'twenty five');
    await forms.next();
    steps.push('Entered the non numeric value "twenty five" and pressed Next');

    await expect(forms.progress, 'Non numeric input must block navigation').toContainText('Page 1 of 6');
    await expect(
      forms.errorMessages.filter({ hasText: /number|numeric|digit/i }).first(),
      'Forms should raise its number restriction message',
    ).toBeVisible();
    steps.push('Navigation was blocked and the number restriction message was displayed');

    await forms.fillText(LIVE_Q.employees, validUser.employees);
    await forms.next();
    steps.push(`Entered the numeric value "${validUser.employees}" and pressed Next`);

    await expect(forms.progress, 'A numeric headcount should let the respondent continue').toContainText(
      'Page 2 of 6',
    );
    steps.push('The form advanced to Page 2 of 6');

    workflow('TC-005 - Headcount number field accepts digits and rejects text', steps);
  });
});
