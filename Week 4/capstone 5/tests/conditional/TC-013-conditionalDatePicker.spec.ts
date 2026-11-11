import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachSatisfaction } from '../support/journey';

test.describe('TC-013 - Conditional date picker', () => {
  test('shows the purchase-date field only on the positive branch', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);
    const purchaseDate = '2026-02-14';

    await reachSatisfaction(survey, { rating: 4, nps: 9 });
    await expect(
      survey.satisfactionBranch.purchaseDateInput,
      'The date field should be visible on the positive branch',
    ).toBeVisible();
    await survey.satisfactionBranch.purchaseDateInput.fill(purchaseDate);
    await expect(
      survey.satisfactionBranch.purchaseDateInput,
      'The date field should keep the chosen date',
    ).toHaveValue(purchaseDate);
    steps.push(`On the positive branch the date field accepted "${purchaseDate}"`);

    await reachSatisfaction(survey, { rating: 1, nps: 9 });
    await expect(
      survey.satisfactionBranch.improvementBranch,
      'The improvement branch should be shown',
    ).toBeVisible();
    await expect(
      survey.satisfactionBranch.purchaseDateInput,
      'The date field should not be available on the improvement branch',
    ).toBeHidden();
    steps.push('On the improvement branch the date field was hidden');

    workflow('TC-013 - Conditional date picker shows only on the positive branch', steps);
  });
});
