import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import {
  improvementBranch,
  positiveBranch,
  preferencesFollowUpNo,
  satisfiedPageTwo,
} from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-020 - Follow-up No skips the contact block (published form)', () => {
  test('No hides the contact block and the response still submits', async ({ forms, steps }) => {
    await forms.reachBranch(PUBLISHED_FORM_URL, validUser, satisfiedPageTwo);
    await forms.completePageThree(positiveBranch);
    await forms.completePageFour(improvementBranch);
    await forms.completePageFive(0);
    await expect(forms.question(LIVE_Q.followUp), 'Page 6 should ask about follow-up').toBeVisible();
    steps.push('Completed Pages 1 to 5 and arrived on Page 6');

    for (let row = 0; row < preferencesFollowUpNo.likert.length; row += 1) {
      await forms.selectLikert(LIVE_Q.likert, row, preferencesFollowUpNo.likert[row]);
    }
    await forms.moveRanking(LIVE_Q.channelRank, preferencesFollowUpNo.channelFirst);
    steps.push('Answered the Likert grid and reordered the communication channels');

    await forms.selectChoice(LIVE_Q.followUp, 1); // No
    await expect(
      forms.question(LIVE_Q.contactMethod),
      'No must not reveal the contact method',
    ).toHaveCount(0);
    await expect(forms.question(LIVE_Q.contactTime), 'No must not reveal the contact time').toHaveCount(0);
    steps.push('Answered No and verified the contact block stays hidden');

    await expect(forms.submitButton, 'The final page should offer Submit').toBeVisible();
    await forms.submit();
    await expect(forms.thankYouMessage, 'Forms should confirm the submission').toBeVisible();
    steps.push('Submitted without contact details and verified the confirmation message');

    workflow('TC-020 - Follow-up No skips the contact block and the response submits', steps);
  });
});
