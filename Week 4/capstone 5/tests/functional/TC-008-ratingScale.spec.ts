import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-008 - Rating scale', () => {
  test('accepts the lower and upper boundary ratings', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    await survey.completeDemographics(validUser);
    steps.push('Completed Page 1 and reached Page 2');

    await survey.productUsage.selectRating(1);
    await expect(
      survey.productUsage.ratingStar(1),
      'The 1-star choice should be marked selected',
    ).toHaveClass(/selected/);
    steps.push('Selected the lowest rating (1 star) and verified it is active');

    await survey.productUsage.selectRating(5);
    await expect(
      survey.productUsage.ratingStar(5),
      'The 5-star choice should be marked selected',
    ).toHaveClass(/selected/);
    await expect(
      survey.productUsage.ratingStar(1),
      'The earlier rating should be cleared',
    ).not.toHaveClass(/selected/);
    steps.push('Selected the highest rating (5 stars) and confirmed only one star is active');

    await expect(
      survey.productUsage.error('q7'),
      'No rating validation error should be shown',
    ).toBeHidden();
    steps.push('Confirmed no validation error was raised for the rating');

    workflow('TC-008 - Rating scale accepts boundary values', steps);
  });
});
