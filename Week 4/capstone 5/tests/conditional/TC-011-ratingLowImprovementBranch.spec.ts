import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachSatisfaction } from '../support/journey';

test.describe('TC-011 - Rating < 4 improvement branch', () => {
  test('shows the improvement questions for a rating below 4', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    for (const rating of [3, 1]) {
      await reachSatisfaction(survey, { rating, nps: 9 });
      await expect(
        survey.satisfactionBranch.improvementBranch,
        `A rating of ${rating} should show the improvement branch`,
      ).toBeVisible();
      await expect(
        survey.satisfactionBranch.positiveBranch,
        `A rating of ${rating} should hide the positive branch`,
      ).toBeHidden();
      steps.push(`Rating ${rating} showed the improvement branch and hid the positive branch`);
    }

    workflow('TC-011 - Rating < 4 shows the improvement branch', steps);
  });
});

//011 - ratingLowImprovementBranch
