import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import {
  improvementBranch,
  positiveBranch,
  satisfiedPageTwo,
} from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-019 - Follow-up Yes reveals the contact block (published form)', () => {
  test('Yes reveals both contact questions and keeps their values', async ({ forms, steps }) => {
    await forms.reachBranch(PUBLISHED_FORM_URL, validUser, satisfiedPageTwo);
    await forms.completePageThree(positiveBranch);
    await forms.completePageFour(improvementBranch);
    await forms.completePageFive(0);
    await expect(forms.question(LIVE_Q.followUp), 'Page 6 should ask about follow-up').toBeVisible();
    steps.push('Completed Pages 1 to 5 and arrived on Page 6');

    await expect(
      forms.question(LIVE_Q.contactMethod),
      'The contact block must start hidden',
    ).toHaveCount(0);
    steps.push('Verified the contact block is hidden before the follow-up answer');

    await forms.selectChoice(LIVE_Q.followUp, 0); // Yes
    await expect(
      forms.question(LIVE_Q.contactMethod),
      'Yes should reveal the preferred contact method',
    ).toBeVisible();
    await expect(forms.question(LIVE_Q.contactTime), 'Yes should reveal the best contact time').toBeVisible();
    steps.push('Answered Yes and verified both contact questions appeared');

    await forms.selectOption(LIVE_Q.contactMethod, 'Email');
    await forms.selectOption(LIVE_Q.contactTime, '10:00-12:00');
    await expect(
      forms.question(LIVE_Q.contactMethod).locator('[aria-haspopup]'),
      'The contact method should keep the chosen value',
    ).toContainText('Email');
    await expect(
      forms.question(LIVE_Q.contactTime).locator('[aria-haspopup]'),
      'The contact time should keep the chosen value',
    ).toContainText('10:00-12:00');
    steps.push('Chose Email and 10:00-12:00 and verified both values are retained');

    workflow('TC-019 - Follow-up Yes reveals the contact block and retains its answers', steps);
  });
});
