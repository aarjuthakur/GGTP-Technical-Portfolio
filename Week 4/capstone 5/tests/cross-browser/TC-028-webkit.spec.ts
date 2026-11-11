import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser, productUsage } from '../../fixtures/surveyData';

test.describe('TC-028 - Safari (WebKit) compatibility', () => {
  test('runs the whole survey and the star rating in WebKit', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    await expect(survey.title, 'The survey title should render in WebKit').toBeVisible();
    steps.push('Opened the survey in WebKit (Safari)');

    await survey.completeDemographics(validUser);
    steps.push('Completed Page 1 in WebKit');

    await survey.productUsage.selectRating(5);
    await expect(
      survey.productUsage.ratingStar(5),
      'The 5-star choice should be marked selected',
    ).toHaveClass(/selected/);
    await survey.productUsage.selectRating(3);
    await expect(
      survey.productUsage.ratingStar(3),
      'The 3-star choice should be marked selected',
    ).toHaveClass(/selected/);
    await expect(
      survey.productUsage.ratingStar(5),
      'The earlier 5-star choice should be cleared',
    ).not.toHaveClass(/selected/);
    steps.push('Verified the star rating script selects and clears correctly in WebKit');

    await survey.productUsage.selectSource(productUsage.source);
    for (const feature of productUsage.features) {
      await survey.productUsage.selectFeature(feature);
    }
    await survey.productUsage.selectRating(5);
    await survey.productUsage.selectNps(9);
    await survey.next();
    steps.push('Finished Page 2 in WebKit');

    await survey.completeSatisfactionPositive({
      likes: 'Fast and reliable.',
      bestFeature: 'Reports',
      purchaseDate: '2024-01-15',
    });
    await survey.completeFeedbackPromoter('Yes');
    steps.push('Completed Pages 3 and 4 in WebKit');

    await survey.preferences.selectFollowUp('No');
    await survey.preferences.selectLikert('agree');
    await survey.next();
    await survey.thankYou.expectVisible();
    steps.push('Completed Pages 5 and 6 in WebKit');

    await expect(
      survey.thankYou.getSummaryEntry('Overall rating'),
      'The summary should show the chosen rating',
    ).toContainText('5');
    await survey.submit();
    await expect(
      survey.thankYou.statusMessage,
      'The confirmation should appear after submitting in WebKit',
    ).toBeVisible();
    steps.push('Submitted in WebKit and saw the confirmation message');

    workflow('TC-028 - Safari (WebKit) compatibility', steps);
  });
});
