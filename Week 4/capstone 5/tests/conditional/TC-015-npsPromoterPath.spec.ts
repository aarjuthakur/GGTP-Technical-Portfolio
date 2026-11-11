import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachFeedback } from '../support/journey';

test.describe('TC-015 - NPS >= 8 promoter path', () => {
  test('shows the promoter branch for an NPS score of 8 or more', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    for (const nps of [8, 10]) {
      await reachFeedback(survey, { rating: 5, nps });
      await expect(
        survey.feedback.promoterBranch,
        `An NPS of ${nps} should show the promoter branch`,
      ).toBeVisible();
      await expect(
        survey.feedback.passiveBranch,
        `An NPS of ${nps} should hide the passive branch`,
      ).toBeHidden();
      await expect(
        survey.feedback.detractorBranch,
        `An NPS of ${nps} should hide the detractor branch`,
      ).toBeHidden();
      steps.push(`NPS ${nps} showed the promoter branch and hid the others`);
    }

    workflow('TC-015 - NPS >= 8 shows the promoter path', steps);
  });
});
