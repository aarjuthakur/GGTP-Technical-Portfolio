import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import { improvementBranch, positiveBranch, satisfiedPageTwo } from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-015 - Promoter path shows the case-study question (published form)', () => {
  test('Very likely reveals the case-study branch', async ({ forms, steps }) => {
    test.fail(true, 'DEF-005: a promoter is shown the passive and detractor questions, not the case study');

    await forms.reachBranch(PUBLISHED_FORM_URL, validUser, { ...satisfiedPageTwo, nps: 10 });
    await forms.completePageThree(positiveBranch);
    await forms.completePageFour(improvementBranch);
    await expect(forms.question(LIVE_Q.recommendColleague), 'Page 5 should ask for a recommendation').toBeVisible();
    steps.push('Completed Pages 1 to 4 and arrived on Page 5 with NPS 10 recorded');

    await forms.selectChoice(LIVE_Q.recommendColleague, 0); // Very likely
    await expect(forms.question(LIVE_Q.makeTen), 'The actual promoter path reveals this question').toBeVisible();
    steps.push('Selected "Very likely" and recorded the questions the form actually reveals');

    await expect(
      forms.question(LIVE_Q.caseStudy),
      'A promoter should be invited to the customer case study',
    ).toBeVisible();
    steps.push('Verified the case-study question is shown');

    await expect(forms.question(LIVE_Q.whyNot), 'The improvement question belongs to another page').toHaveCount(0);
    steps.push('Verified no unrelated question leaked into the promoter branch');

    workflow('TC-015 - Promoter path shows the case-study question', steps);
  });
});
