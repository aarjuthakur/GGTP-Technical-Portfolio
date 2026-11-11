import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { workflow } from '../../utils/logger';

test.describe('TC-021 - Required Field Validation (published form)', () => {
  test('an empty page cannot be skipped', async ({ forms, steps }) => {
    await forms.openAndStart(PUBLISHED_FORM_URL);
    steps.push('Opened the published survey and passed the cover page');

    await expect(forms.question(LIVE_Q.fullName), 'Page 1 should be on screen').toBeVisible();
    steps.push('Confirmed Page 1 is displayed with every question still unanswered');

    await forms.next();
    steps.push('Pressed Next without answering anything');

    await expect(forms.progress, 'The form must not advance past unanswered required questions').toContainText(
      'Page 1 of 6',
    );
    steps.push('Verified the form stayed on Page 1 of 6');

    await expect(
      forms.errorMessages.first(),
      'Forms should list the questions that still need an answer',
    ).toContainText(/required|need to be completed/i);
    steps.push('Verified the required-field message was raised');

    workflow('TC-021 - Required questions block navigation until they are answered', steps);
  });
});
