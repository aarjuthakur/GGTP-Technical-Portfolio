import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachSatisfaction } from '../support/journey';

test.describe('TC-010 - Rating >= 4 positive branch', () => {
  test('shows the positive questions for a rating of 4 or 5', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    for (const rating of [4, 5]) {
      await reachSatisfaction(survey, { rating, nps: 9 });
      await expect(
        survey.satisfactionBranch.positiveBranch,
        `A rating of ${rating} should show the positive branch`,
      ).toBeVisible();
      await expect(
        survey.satisfactionBranch.improvementBranch,
        `A rating of ${rating} should hide the improvement branch`,
      ).toBeHidden();
      steps.push(`Rating ${rating} showed the positive branch and hid the improvement branch`);
    }

    workflow('TC-010 - Rating >= 4 shows the positive branch', steps);
  });
});
