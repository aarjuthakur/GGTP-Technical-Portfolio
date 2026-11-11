import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q, LIVE_RANKING } from '../../config/liveForm';
import { positiveBranch, satisfiedPageTwo } from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-014 - Conditional ranking input (published form)', () => {
  test('the improvement ranking lists five items and reorders', async ({ forms, steps }) => {
    await forms.reachBranch(PUBLISHED_FORM_URL, validUser, satisfiedPageTwo);
    await expect(forms.question(LIVE_Q.improveRank), 'The ranking must not exist on S3A').toHaveCount(0);
    steps.push('Verified the improvement ranking is absent on S3A');

    await forms.completePageThree(positiveBranch);
    steps.push('Completed S3A and arrived on S3B Help Us Improve');

    await expect(forms.question(LIVE_Q.improveRank), 'S3B should offer the improvement ranking').toBeVisible();
    const before = await forms.rankingOrder(LIVE_Q.improveRank);
    expect(before, 'The ranking should start in the configured order').toEqual([...LIVE_RANKING.improve]);
    steps.push(`Verified the default order: ${before.join(' > ')}`);

    await forms.moveRanking(LIVE_Q.improveRank, 1);
    const after = await forms.rankingOrder(LIVE_Q.improveRank);
    expect(after, 'Dragging the first item down should swap the first two places').toEqual([
      LIVE_RANKING.improve[1],
      LIVE_RANKING.improve[0],
      ...LIVE_RANKING.improve.slice(2),
    ]);
    expect([...after].sort(), 'Reordering must not lose or duplicate any priority').toEqual(
      [...LIVE_RANKING.improve].sort(),
    );
    steps.push(`Dragged the first item down and verified the new order: ${after.join(' > ')}`);

    workflow('TC-014 - The conditional ranking lists five items and can be reordered', steps);
  });
});
