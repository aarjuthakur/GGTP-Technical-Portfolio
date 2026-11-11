import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { improvementBranch, positiveBranch, satisfiedPageTwo } from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-017 - Detractor path shows the issue question (published form)', () => {
  test('Very unlikely reveals only the issue box', async ({ forms, steps }) => {
    await forms.reachBranch(PUBLISHED_FORM_URL, validUser, { ...satisfiedPageTwo, nps: 0 });
    await forms.completePageThree(positiveBranch);
    await forms.completePageFour(improvementBranch);
    await expect(forms.question(LIVE_Q.recommendColleague), 'Page 5 should ask for a recommendation').toBeVisible();
    steps.push('Completed Pages 1 to 4 and arrived on Page 5 with NPS 0 recorded');

    await forms.selectChoice(LIVE_Q.recommendColleague, 4); // Very unlikely
    await expect(forms.question(LIVE_Q.issue), 'A detractor must be asked to describe the issue').toBeVisible();
    steps.push('Selected "Very unlikely" and verified the issue question is shown');

    await expect(forms.question(LIVE_Q.caseStudy), 'The case study belongs to the promoter branch').toHaveCount(0);
    await expect(forms.question(LIVE_Q.makeTen), 'The suggestion belongs to the passive branch').toHaveCount(0);
    steps.push('Verified no promoter or passive question is shown');

    await expect(
      forms.page.locator('input[type=file]'),
      'The anonymous form has no file-upload question (limitation D-2)',
    ).toHaveCount(0);
    steps.push('Confirmed the anonymous form offers no file upload (D-2)');

    workflow('TC-017 - Detractor path shows only the issue question', steps);
  });
});
