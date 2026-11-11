import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser, productUsage, positiveBranchData } from '../../fixtures/surveyData';

test.describe('TC-025 - Response data verification', () => {
  test('shows every entered answer correctly in the response summary', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);
    const rating = 5;
    const nps = 9;
    const contactTime = '09:30';

    await survey.goto();
    await survey.completeDemographics(validUser);
    await survey.completeProductUsage({
      source: productUsage.source,
      features: [...productUsage.features],
      rating,
      nps,
    });
    await survey.completeSatisfactionPositive(positiveBranchData);
    await survey.completeFeedbackPromoter('Yes');
    steps.push('Completed Pages 1 to 4 with known answers');

    await survey.preferences.selectFollowUp('Yes');
    await survey.preferences.selectContactMethod('Email');
    await survey.preferences.fillContactTime(contactTime);
    await survey.preferences.selectLikert('agree');
    steps.push('Completed Page 5 (follow-up Yes, contact by Email, Likert agree)');

    await survey.next();
    await survey.thankYou.expectVisible();
    steps.push('Reached Page 6 and opened the response summary');

    const expected: Array<[string, string]> = [
      ['Name', validUser.name],
      ['Email', validUser.email],
      ['Company', validUser.company],
      ['Employees', validUser.employees],
      ['Heard about us', productUsage.source],
      ['Features', productUsage.features.join(', ')],
      ['Overall rating', String(rating)],
      ['Recommendation (NPS)', String(nps)],
      ['Liked most', positiveBranchData.likes],
      ['Best feature', positiveBranchData.bestFeature],
      ['Purchase date', positiveBranchData.purchaseDate],
      ['Case study', 'Yes'],
      ['Preferred contact', 'Email'],
      ['Follow-up', 'Yes'],
      ['Product meets needs', 'Agree'],
    ];

    for (const [label, value] of expected) {
      await expect(
        survey.thankYou.getSummaryEntry(label),
        `The summary row "${label}" should show "${value}"`,
      ).toContainText(value);
      steps.push(`Verified "${label}: ${value}"`);
    }
    steps.push(`Verified all ${expected.length} summary rows match the answers that were entered`);

    workflow('TC-025 - Response data verification', steps);
  });
});
