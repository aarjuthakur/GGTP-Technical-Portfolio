import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import {
  improvementBranch,
  positiveBranch,
  preferencesFollowUpYes,
  satisfiedPageTwo,
} from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-039 - Forms backend response collection (published form)', () => {
  test('the backend acknowledges a real response and the link collects the next one', async ({
    forms,
    steps,
  }) => {
    // 1. Submit a real response. Each completePageX helper advances the form itself.
    await forms.startPageOne(PUBLISHED_FORM_URL, validUser);
    await forms.next();
    await forms.completePageTwo(satisfiedPageTwo);
    await forms.next();
    await forms.completePageThree(positiveBranch);
    await forms.completePageFour(improvementBranch);
    await forms.completePageFive(0);
    await forms.completePageSix(preferencesFollowUpYes);
    steps.push('Completed the published survey and submitted a real response');

    // 2. The backend acknowledged it.
    await expect(
      forms.thankYouMessage,
      'Forms itself should acknowledge the submitted response',
    ).toBeVisible();
    steps.push('Forms acknowledged the response with "Your response was submitted"');

    // 3. No platform or validation error during the round trip.
    await expect(
      forms.errorMessages,
      'No validation or platform error should be raised while submitting',
    ).toHaveCount(0);
    steps.push('No validation or platform error was raised during the submission');

    // 4. The link is ready for the next response.
    await forms.openAndStart(PUBLISHED_FORM_URL);
    await expect(
      forms.question(LIVE_Q.fullName),
      'Re-opening the link should present a fresh Page 1 for the next respondent',
    ).toBeVisible();
    steps.push('Re-opening the responder link presented a fresh, empty form');

    workflow('TC-039 - The Forms backend collects responses end to end', steps);
  });
});
