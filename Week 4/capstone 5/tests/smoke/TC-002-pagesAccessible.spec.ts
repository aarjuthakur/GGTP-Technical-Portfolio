import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser, productUsage, positiveBranchData } from '../../fixtures/surveyData';

test.describe('TC-002 - All Pages Accessible', () => {
  test('every page of the survey can be reached', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    steps.push('Opened the survey on Page 1');

    await survey.completeDemographics(validUser);
    await expect(survey.pageSection(2), 'Page 2 should be visible after demographics').toBeVisible();
    steps.push('Completed Page 1 and reached Page 2 (Product Usage)');

    await survey.completeProductUsage({
      source: productUsage.source,
      features: [...productUsage.features],
      rating: 5,
      nps: 9,
    });
    await expect(survey.pageSection(3), 'Page 3 should be visible after product usage').toBeVisible();
    steps.push('Completed Page 2 and reached Page 3 (Satisfaction branch)');

    await survey.satisfactionBranch.fillPositive({
      likes: positiveBranchData.likes,
      bestFeature: positiveBranchData.bestFeature,
      purchaseDate: positiveBranchData.purchaseDate,
    });
    await survey.next();
    await expect(survey.pageSection(4), 'Page 4 should be visible after the satisfaction branch').toBeVisible();
    steps.push('Completed the Page 3 positive branch and reached Page 4 (Detailed feedback)');

    await survey.feedback.selectCaseStudy('No');
    await survey.next();
    await expect(survey.pageSection(5), 'Page 5 should be visible after detailed feedback').toBeVisible();
    steps.push('Completed the Page 4 promoter branch and reached Page 5 (Preferences)');

    await survey.preferences.selectFollowUp('No');
    await survey.preferences.selectLikert('agree');
    await survey.next();
    await survey.thankYou.expectVisible();
    steps.push('Completed Page 5 and reached Page 6 (Thank you)');

    await expect(survey.progressText, 'Progress should report the last page').toHaveText('Page 6 of 6');
    steps.push('Verified the progress indicator shows "Page 6 of 6"');

    workflow('TC-002 - All six pages are reachable in sequence', steps);
  });
});
