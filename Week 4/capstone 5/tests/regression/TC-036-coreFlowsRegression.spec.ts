import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser, productUsage, positiveBranchData } from '../../fixtures/surveyData';

test.describe('TC-036 - Core functional regression', () => {
  test('the critical functional paths still work after the form update', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    // 1. Structure intact.
    await survey.goto();
    await expect(survey.title, 'The survey heading should still be shown').toContainText(
      'Customer Satisfaction Survey',
    );
    for (let pageNo = 1; pageNo <= 6; pageNo += 1) {
      await expect(
        page.getByTestId(`page-${pageNo}`),
        `Page ${pageNo} should still exist after the update`,
      ).toHaveCount(1);
    }
    steps.push('The survey still has its heading and all six pages');

    // 2. Required-field validation still blocks an empty page.
    await survey.next();
    await expect(
      survey.demographics.error('q1'),
      'Advancing with an empty name should still raise the name validation message',
    ).toBeVisible();
    await expect(
      survey.demographics.error('q2'),
      'Advancing with an empty email should still raise the email validation message',
    ).toBeVisible();
    await expect(
      survey.currentPageNumber(),
      'A failed page must not advance',
    ).resolves.toBe(1);
    steps.push('Empty Page 1 was still blocked by the required-field validation');

    // 3. Valid demographics still advance.
    await survey.completeDemographics(validUser);
    await expect(
      survey.productUsage.section,
      'Valid demographics should still advance to Page 2',
    ).toBeVisible();
    steps.push('Valid demographics still advance to Page 2');

    // 4. The positive branch still follows a rating of 5.
    await survey.completeProductUsage({
      source: productUsage.source,
      features: [...productUsage.features],
      rating: 5,
      nps: 9,
    });
    await expect(
      survey.satisfactionBranch.positiveBranch,
      'A rating of 5 should still show the positive branch',
    ).toBeVisible();
    steps.push('A rating of 5 still shows the positive Page 3 branch');

    // 5. The survey still completes and confirms.
    await survey.completeSatisfactionPositive(positiveBranchData);
    await survey.completeFeedbackPromoter('Yes');
    await survey.preferences.selectFollowUp('No');
    await survey.preferences.selectLikert('agree');
    await survey.next();
    await survey.submit();
    await expect(
      survey.thankYou.statusMessage,
      'Submitting a complete response should still record it',
    ).toContainText('Your response has been recorded');
    expect(await survey.isSubmitted(), 'The survey should be flagged as submitted').toBe(true);
    steps.push('The full journey still submits and the confirmation still appears');

    workflow('TC-036 - Core functional flows survive the form update', steps);
  });
});
