import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { neutralPageTwo, veryDissatisfiedPageTwo } from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-011 - Low rating opens the improvement branch (published form)', () => {
  test('rating 3 routes to S3B Help Us Improve', async ({ forms, steps }) => {
    test.fail(true, 'DEF-004: dissatisfied answers skip S3B and jump to Recommendation');

    await forms.reachBranch(PUBLISHED_FORM_URL, validUser, neutralPageTwo);
    steps.push('Completed Pages 1 and 2 with rating 3 and pressed Next');

    // Document what the form actually does before asserting what it should do.
    await expect(forms.progress, 'Forms should at least advance to another page').toContainText('Page');
    steps.push(`Landed on: ${await forms.progress.first().innerText()}`);

    await expect(
      forms.question(LIVE_Q.whyNot),
      'Rating below 4 should open S3B Help Us Improve',
    ).toBeVisible();
    steps.push('Verified S3B is shown for a low rating');

    workflow('TC-011 - Low rating opens the improvement section', steps);
  });

  test('very dissatisfied ends the form instead of opening S3B', async ({ forms, steps }) => {
    test.fail(true, 'DEF-004: Very dissatisfied replaces Next with Submit on Page 2');

    await forms.reachPageTwo(PUBLISHED_FORM_URL, validUser);
    await forms.completePageTwo(veryDissatisfiedPageTwo);
    steps.push('Completed Page 2 with rating 1 and satisfaction "Very dissatisfied"');

    await expect(forms.submitButton, 'Forms should not turn Page 2 into the final step').toBeVisible();
    steps.push('Verified the page offers Submit instead of Next');

    await expect(
      forms.question(LIVE_Q.whyNot),
      'Very dissatisfied should still be asked why, in S3B',
    ).toBeVisible();
    steps.push('Verified S3B is shown for the worst rating');

    workflow('TC-011 - Low rating opens the improvement section', steps);
  });
});
