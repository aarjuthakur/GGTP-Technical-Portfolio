import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser, productUsage } from '../../fixtures/surveyData';

test.describe('TC-023 - NPS range validation', () => {
  test('offers only the 0 to 10 range and makes a score mandatory', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    await survey.completeDemographics(validUser);
    steps.push('Completed Page 1 and reached Page 2');

    const values = await survey.productUsage.npsValues();
    expect(values, 'The NPS control should offer exactly 11 scores').toHaveLength(11);
    expect(
      values,
      'The NPS control should offer exactly the scores 0 to 10 in order',
    ).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    steps.push(`Confirmed the NPS control offers only the valid range: ${values.join(', ')}`);

    await survey.productUsage.selectSource(productUsage.source);
    for (const feature of productUsage.features) {
      await survey.productUsage.selectFeature(feature);
    }
    await survey.productUsage.selectRating(5);
    steps.push('Answered every Page 2 question except the NPS score');

    await survey.next();
    expect(
      await survey.currentPageNumber(),
      'The survey should stay on Page 2 while the NPS score is missing',
    ).toBe(2);
    await expect(
      survey.productUsage.error('q8'),
      'An error should be shown for the missing NPS score',
    ).toBeVisible();
    steps.push('Confirmed the survey stays on Page 2 and flags the missing NPS score');

    await survey.productUsage.selectNps(10);
    await expect(
      survey.productUsage.error('q8'),
      'The NPS error should clear once a score is chosen',
    ).toBeHidden();
    await survey.next();
    expect(
      await survey.currentPageNumber(),
      'The survey should advance once a valid score is chosen',
    ).toBe(3);
    steps.push('Chose the highest valid score (10) and reached Page 3');

    workflow('TC-023 - NPS range validation', steps);
  });
});
