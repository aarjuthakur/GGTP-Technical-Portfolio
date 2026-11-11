import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-009 - NPS score', () => {
  test('accepts the lower and upper boundary scores', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    await survey.completeDemographics(validUser);
    steps.push('Completed Page 1 and reached Page 2');

    await survey.productUsage.selectNps(0);
    await expect(
      survey.productUsage.npsButton(0),
      'The 0 score should be marked selected',
    ).toHaveClass(/selected/);
    steps.push('Selected the lowest NPS score (0) and verified it is active');

    await survey.productUsage.selectNps(10);
    await expect(
      survey.productUsage.npsButton(10),
      'The 10 score should be marked selected',
    ).toHaveClass(/selected/);
    await expect(
      survey.productUsage.npsButton(0),
      'The earlier score should be cleared',
    ).not.toHaveClass(/selected/);
    steps.push('Selected the highest NPS score (10) and confirmed only one score is active');

    await survey.productUsage.selectNps(7);
    await expect(
      survey.productUsage.npsButton(7),
      'The middle score should be marked selected',
    ).toHaveClass(/selected/);
    steps.push('Selected a middle NPS score (7) and confirmed it becomes the active score');

    await expect(
      survey.productUsage.error('q8'),
      'No NPS validation error should be shown',
    ).toBeHidden();
    steps.push('Confirmed no validation error was raised for the NPS score');

    workflow('TC-009 - NPS score accepts boundary values', steps);
  });
});
