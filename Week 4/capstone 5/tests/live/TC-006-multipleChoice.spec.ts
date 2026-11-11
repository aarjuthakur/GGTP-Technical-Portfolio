import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_CHOICES, LIVE_Q } from '../../config/liveForm';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-006 - Multiple Choice Selection (published form)', () => {
  test('radio options keep exactly one selection', async ({ forms, steps }) => {
    await forms.reachPageTwo(PUBLISHED_FORM_URL, validUser);
    steps.push('Completed Page 1 and opened Page 2 (Product Usage)');

    const first = LIVE_CHOICES.source.indexOf('Social media');
    await forms.selectChoice(LIVE_Q.source, first);
    steps.push(`Selected "${LIVE_CHOICES.source[first]}"`);

    const radios = forms.question(LIVE_Q.source).locator('input[type=radio]');
    await expect(radios.nth(first), 'The clicked option should be checked').toBeChecked();
    steps.push('Verified that option is checked');

    const second = LIVE_CHOICES.source.indexOf('Online search');
    await forms.selectChoice(LIVE_Q.source, second);
    steps.push(`Selected "${LIVE_CHOICES.source[second]}" instead`);

    await expect(radios.nth(second), 'The second option should now be checked').toBeChecked();
    await expect(
      radios.nth(first),
      'A radio group must clear the previous selection',
    ).not.toBeChecked();
    steps.push('Verified only the second option is checked - the first was released');

    workflow('TC-006 - Multiple choice behaves as a single-select radio group', steps);
  });
});
