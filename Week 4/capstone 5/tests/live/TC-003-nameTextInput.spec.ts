import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { validUser, nameBoundaries } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-003 - Text Field Input (published form)', () => {
  test('accepts a valid name and enforces the 3 character minimum', async ({ forms, steps }) => {
    await forms.openAndStart(PUBLISHED_FORM_URL);
    steps.push('Opened the published survey and passed the cover page');

    await forms.fillText(LIVE_Q.fullName, validUser.name);
    steps.push(`Typed the valid name "${validUser.name}"`);

    const nameField = forms.question(LIVE_Q.fullName).locator('[data-automation-id="textInput"]');
    await expect(nameField, 'The typed name should be kept in the field').toHaveValue(validUser.name);
    steps.push('Re-read the field and confirmed the value was stored');

    await forms.fillText(LIVE_Q.email, validUser.email);
    await forms.fillText(LIVE_Q.company, validUser.company);
    await forms.fillText(LIVE_Q.employees, validUser.employees);
    steps.push('Completed e-mail, company and headcount so Page 1 is otherwise valid');

    await forms.fillText(LIVE_Q.fullName, nameBoundaries.tooShort);
    await forms.next();
    steps.push(`Replaced the name with "${nameBoundaries.tooShort}" (2 characters) and pressed Next`);

    await expect(forms.progress, 'A name below the minimum length must block navigation').toContainText(
      'Page 1 of 6',
    );
    await expect(
      forms.errorMessages.filter({ hasText: /character|length|3/i }).first(),
      'Forms should raise its minimum-length restriction message',
    ).toBeVisible();
    steps.push('Navigation stayed on Page 1 and the minimum-length message was shown');

    workflow('TC-003 - Name text field accepts valid input and enforces the minimum length', steps);
  });
});
