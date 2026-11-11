import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachSatisfaction, reachFeedback, reachPreferences } from '../support/journey';

test.describe('TC-037 - Conditional-logic regression', () => {
  test('every branch switch still uses the same boundaries after the form update', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    // 1. Rating boundary.
    for (const [rating, expectedBranch] of [
      [3, 'improvement'],
      [4, 'positive'],
    ] as const) {
      await reachSatisfaction(survey, { rating, nps: 9 });
      if (expectedBranch === 'positive') {
        await expect(
          survey.satisfactionBranch.positiveBranch,
          `A rating of ${rating} should still show the positive branch`,
        ).toBeVisible();
      } else {
        await expect(
          survey.satisfactionBranch.improvementBranch,
          `A rating of ${rating} should still show the improvement branch`,
        ).toBeVisible();
      }
      steps.push(`Rating ${rating} still shows the ${expectedBranch} branch`);
    }

    // 2. NPS bands.
    for (const [nps, branchTestId, label] of [
      [5, 'branch-detractor', 'detractor'],
      [7, 'branch-passive', 'passive'],
      [9, 'branch-promoter', 'promoter'],
    ] as const) {
      await reachFeedback(survey, { rating: 5, nps });
      await expect(
        page.getByTestId(branchTestId),
        `An NPS of ${nps} should still show the ${label} branch`,
      ).toBeVisible();
      steps.push(`NPS ${nps} still shows the ${label} branch`);
    }

    // 3. Follow-up switch.
    await reachPreferences(survey, { rating: 5, nps: 9, caseStudy: 'Yes' });
    await expect(
      survey.preferences.contactBranch,
      'The contact block should start hidden',
    ).toBeHidden();
    await survey.preferences.selectFollowUp('Yes');
    await expect(
      survey.preferences.contactBranch,
      'Follow-up Yes should still reveal the contact block',
    ).toBeVisible();
    await survey.preferences.selectFollowUp('No');
    await expect(
      survey.preferences.contactBranch,
      'Follow-up No should still hide the contact block again',
    ).toBeHidden();
    steps.push('Follow-up Yes/No still reveals and hides the contact block');

    workflow('TC-037 - Conditional branches survive the form update', steps);
  });
});
