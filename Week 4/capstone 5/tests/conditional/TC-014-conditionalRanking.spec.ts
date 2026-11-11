import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachSatisfaction } from '../support/journey';

test.describe('TC-014 - Conditional ranking', () => {
  test('shows the ranking list only on the improvement branch and allows reordering', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await reachSatisfaction(survey, { rating: 3, nps: 9 });
    await expect(
      survey.satisfactionBranch.improvementBranch,
      'The improvement branch should be shown',
    ).toBeVisible();
    await expect(
      survey.satisfactionBranch.improveRanking,
      'The ranking list should be visible on the improvement branch',
    ).toBeVisible();

    const before = await survey.satisfactionBranch.getImprovementOrder();
    steps.push(`Default ranking order: ${before.join(' > ')}`);

    await survey.satisfactionBranch.moveUp('q10b-item-support');
    const after = await survey.satisfactionBranch.getImprovementOrder();
    expect(after, 'The ranking order should change after moving an item up').not.toEqual(before);
    expect(after[1], '"Support" should now be in second place').toBe('Support');
    steps.push(`Moved "Support" up; new order: ${after.join(' > ')}`);

    await reachSatisfaction(survey, { rating: 5, nps: 9 });
    await expect(
      survey.satisfactionBranch.positiveBranch,
      'The positive branch should be shown',
    ).toBeVisible();
    await expect(
      survey.satisfactionBranch.improveRanking,
      'The ranking list should not be available on the positive branch',
    ).toBeHidden();
    steps.push('On the positive branch the ranking list was hidden');

    workflow('TC-014 - Conditional ranking shows only on the improvement branch', steps);
  });
});
