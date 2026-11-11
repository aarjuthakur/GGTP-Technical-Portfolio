import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachFeedback } from '../support/journey';

test.describe('TC-017 - NPS <= 5 detractor path', () => {
  test('shows the detractor branch for an NPS score of 5 or less', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    for (const nps of [5, 0]) {
      await reachFeedback(survey, { rating: 5, nps });
      await expect(
        survey.feedback.detractorBranch,
        `An NPS of ${nps} should show the detractor branch`,
      ).toBeVisible();
      await expect(
        survey.feedback.promoterBranch,
        `An NPS of ${nps} should hide the promoter branch`,
      ).toBeHidden();
      await expect(
        survey.feedback.passiveBranch,
        `An NPS of ${nps} should hide the passive branch`,
      ).toBeHidden();
      steps.push(`NPS ${nps} showed the detractor branch and hid the others`);
    }

    workflow('TC-017 - NPS <= 5 shows the detractor path', steps);
  });
});
