import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q, LIVE_SECTIONS } from '../../config/liveForm';
import { satisfiedPageTwo } from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-010 - High rating opens the positive branch (published form)', () => {
  test('rating 4 and 5 both reach S3A Your Experience', async ({ forms, steps }) => {
    await forms.reachBranch(PUBLISHED_FORM_URL, validUser, { ...satisfiedPageTwo, rating: 4 });
    steps.push('Completed Pages 1 and 2 with rating 4 and pressed Next');

    await expect(forms.section(LIVE_SECTIONS.s2), 'Rating 4 should open S3A Your Experience').toBeVisible();
    await expect(forms.question(LIVE_Q.likes), 'S3A should ask what the respondent likes most').toBeVisible();
    await expect(forms.question(LIVE_Q.whyNot), 'S3B must stay hidden on the positive path').toHaveCount(0);
    steps.push('Verified S3A is shown and S3B is hidden for rating 4');

    await forms.back();
    await expect(forms.progress, 'Back should return to Page 2').toContainText('Page 2 of 6');
    await forms.selectRating(LIVE_Q.rating, 5);
    // Rating stars are role=radio elements, not native inputs, so aria-checked is the assertion.
    await expect(
      forms.question(LIVE_Q.rating).getByRole('radio', { name: '5 Star' }),
      'Rating 5 should be selected',
    ).toHaveAttribute('aria-checked', 'true');
    await forms.next();
    steps.push('Went back, raised the rating to 5 and pressed Next');

    await expect(forms.section(LIVE_SECTIONS.s2), 'Rating 5 should open S3A Your Experience').toBeVisible();
    await expect(forms.question(LIVE_Q.likes), 'S3A should still be the destination for rating 5').toBeVisible();
    steps.push('Verified S3A is still shown for rating 5');

    workflow('TC-010 - Ratings 4 and 5 both open the positive S3A section', steps);
  });
});
