import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import type { MicrosoftFormsPage } from '../../pages/MicrosoftFormsPage';
import { LIVE_Q } from '../../config/liveForm';
import { improvementBranch, positiveBranch, satisfiedPageTwo } from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

async function reachRecommendation(forms: MicrosoftFormsPage): Promise<void> {
  await forms.reachBranch(PUBLISHED_FORM_URL, validUser, { ...satisfiedPageTwo, nps: 6 });
  await forms.completePageThree(positiveBranch);
  await forms.completePageFour(improvementBranch);
}

test.describe('TC-016 - Passive path shows only the suggestion question (published form)', () => {
  test('Neither likely nor unlikely reveals the passive question alone', async ({ forms, steps }) => {
    test.fail(true, 'DEF-006: the passive answer also reveals the case study and the issue box');

    await reachRecommendation(forms);
    steps.push('Completed Pages 1 to 4 and arrived on Page 5 with NPS 6 recorded');

    await forms.selectChoice(LIVE_Q.recommendColleague, 2); // Neither likely nor unlikely
    await expect(forms.question(LIVE_Q.makeTen), 'The passive branch should ask what would make us a 10').toBeVisible();
    steps.push('Selected "Neither likely nor unlikely" and verified the suggestion question');

    await expect(forms.question(LIVE_Q.caseStudy), 'The case study belongs to the promoter branch').toHaveCount(0);
    await expect(forms.question(LIVE_Q.issue), 'The issue box belongs to the detractor branch').toHaveCount(0);
    steps.push('Verified no promoter or detractor question is shown');

    workflow('TC-016 - Passive path shows only the suggestion question', steps);
  });

  test('Somewhat unlikely still reveals the passive question', async ({ forms, steps }) => {
    test.fail(true, 'DEF-006: "Somewhat unlikely" hides the suggestion and shows the detractor issue box');

    await reachRecommendation(forms);
    steps.push('Completed Pages 1 to 4 and arrived on Page 5 with NPS 6 recorded');

    await forms.selectChoice(LIVE_Q.recommendColleague, 3); // Somewhat unlikely
    steps.push('Selected "Somewhat unlikely"');

    await expect(
      forms.question(LIVE_Q.makeTen),
      'A passive respondent should still be asked what would make us a 10',
    ).toBeVisible();
    steps.push('Verified the passive suggestion question is shown');

    workflow('TC-016 - Passive path shows only the suggestion question', steps);
  });
});
