import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachPreferences } from '../support/journey';

test.describe('TC-020 - Follow-up = No skips the contact block', () => {
  test('skips the contact questions when the user declines a follow-up', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await reachPreferences(survey, { rating: 5, nps: 9, caseStudy: 'No' });
    steps.push('Reached Page 5');

    await survey.preferences.selectFollowUp('No');
    await expect(
      survey.preferences.contactBranch,
      'The contact block should stay hidden when follow-up is No',
    ).toBeHidden();
    steps.push('Selected follow-up "No" and the contact block stayed hidden');

    await survey.preferences.selectLikert('agree');
    steps.push('Answered the Likert question');

    await survey.next();
    await survey.thankYou.expectVisible();
    steps.push('Clicked Next and reached Page 6, confirming the contact questions were skipped');

    workflow('TC-020 - Follow-up = No skips the contact block', steps);
  });
});
