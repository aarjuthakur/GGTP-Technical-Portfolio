import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachSatisfaction } from '../support/journey';

test.describe('TC-012 - Conditional dropdown', () => {
  test('shows the best-feature dropdown only on the positive branch', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await reachSatisfaction(survey, { rating: 5, nps: 9 });
    await expect(
      survey.satisfactionBranch.bestFeatureSelect,
      'The dropdown should be visible on the positive branch',
    ).toBeVisible();
    await survey.satisfactionBranch.bestFeatureSelect.selectOption('Reports');
    await expect(
      survey.satisfactionBranch.bestFeatureSelect,
      'The dropdown should keep the chosen value',
    ).toHaveValue('Reports');
    steps.push('On the positive branch the dropdown was visible and accepted "Reports"');

    await reachSatisfaction(survey, { rating: 2, nps: 9 });
    await expect(
      survey.satisfactionBranch.improvementBranch,
      'The improvement branch should be shown',
    ).toBeVisible();
    await expect(
      survey.satisfactionBranch.bestFeatureSelect,
      'The dropdown should not be available on the improvement branch',
    ).toBeHidden();
    steps.push('On the improvement branch the dropdown was hidden');

    workflow('TC-012 - Conditional dropdown shows only on the positive branch', steps);
  });
});
