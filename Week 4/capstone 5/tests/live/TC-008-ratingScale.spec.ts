import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-008 - Rating Scale (published form)', () => {
  test('records the exact number of stars clicked', async ({ forms, steps }) => {
    await forms.reachPageTwo(PUBLISHED_FORM_URL, validUser);
    steps.push('Completed Page 1 and opened Page 2 (Product Usage)');

    const group = forms.question(LIVE_Q.rating).locator('[role="radiogroup"]');

    for (const stars of [4, 1, 5]) {
      await forms.selectRating(LIVE_Q.rating, stars);
      await expect(
        group,
        `Clicking ${stars} stars should record exactly ${stars}`,
      ).toHaveAttribute('aria-label', `Selected number: ${stars}`);
      steps.push(`Clicked ${stars} stars and the group reported "Selected number: ${stars}"`);
    }

    const levels = await forms.question(LIVE_Q.rating).locator('[role="radio"]').count();
    expect(levels, 'A 5 level star rating must offer exactly 5 stars').toBe(5);
    steps.push('Verified the control offers exactly 5 levels');

    workflow('TC-008 - Star rating records 1, 4 and 5 stars correctly', steps);
  });
});
