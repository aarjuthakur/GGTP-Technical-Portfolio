import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachFeedback } from '../support/journey';

test.describe('TC-016 - NPS 6-7 passive path', () => {
  test('shows the passive branch for an NPS score of 6 or 7', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    for (const nps of [7, 6]) {
      await reachFeedback(survey, { rating: 5, nps });
      await expect(
        survey.feedback.passiveBranch,
        `An NPS of ${nps} should show the passive branch`,
      ).toBeVisible();
      await expect(
        survey.feedback.promoterBranch,
        `An NPS of ${nps} should hide the promoter branch`,
      ).toBeHidden();
      await expect(
        survey.feedback.detractorBranch,
        `An NPS of ${nps} should hide the detractor branch`,
      ).toBeHidden();
      steps.push(`NPS ${nps} showed the passive branch and hid the others`);
    }

    workflow('TC-016 - NPS 6-7 shows the passive path', steps);
  });
});
