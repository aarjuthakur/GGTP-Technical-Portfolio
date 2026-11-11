import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { npsBoundaries, validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-009 - NPS Score (published form)', () => {
  test('offers 0-10 only and stores a single score', async ({ forms, steps }) => {
    await forms.reachPageTwo(PUBLISHED_FORM_URL, validUser);
    steps.push('Completed Page 1 and opened Page 2 (Product Usage)');

    const scores = forms.question(LIVE_Q.nps).locator('input[type=radio]');
    const total = await scores.count();
    expect(total, 'An NPS scale must offer exactly eleven scores (0 to 10)').toBe(11);
    steps.push('Counted the scores: exactly 11 radios (0-10) are offered');

    for (const score of [npsBoundaries.promoter, npsBoundaries.minimum, npsBoundaries.maximum]) {
      await forms.selectNps(LIVE_Q.nps, score);
      await expect(
        scores.nth(score),
        `NPS ${score} should be the selected score`,
      ).toBeChecked();
      steps.push(`Selected NPS ${score} and verified it is checked`);
    }

    const checkedCount = await scores.evaluateAll(
      (nodes) => nodes.filter((node) => (node as HTMLInputElement).checked).length,
    );
    expect(checkedCount, 'Only one NPS score may be selected at a time').toBe(1);
    steps.push('Verified the group holds exactly one score');

    workflow('TC-009 - NPS accepts scores 0-10 only and keeps a single selection', steps);
  });
});
