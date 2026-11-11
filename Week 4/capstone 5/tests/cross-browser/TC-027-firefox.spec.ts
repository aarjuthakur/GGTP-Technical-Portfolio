import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';
import { reachPreferences } from '../support/journey';

test.describe('TC-027 - Firefox compatibility', () => {
  test('runs the whole survey and the ranking control in Firefox', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    await expect(survey.title, 'The survey title should render in Firefox').toBeVisible();
    await expect(survey.progressText).toHaveText('Page 1 of 6');
    steps.push('Opened the survey in Firefox; title and progress text rendered');

    await reachPreferences(survey, { rating: 5, nps: 9, caseStudy: 'Yes' });
    steps.push('Completed Pages 1 to 4 in Firefox');

    const before = await survey.preferences.getChannelOrder();
    await survey.preferences.moveUp('q16-item-teams');
    const after = await survey.preferences.getChannelOrder();
    expect(after, 'The ranking order should change after moving an item in Firefox').not.toEqual(
      before,
    );
    expect(after[1], '"Microsoft Teams" should now be in second place').toBe('Microsoft Teams');
    steps.push(`Reordered the channel ranking in Firefox: ${before.join(' > ')} to ${after.join(' > ')}`);

    await survey.preferences.selectFollowUp('Yes');
    await survey.preferences.selectContactMethod('Email');
    await survey.preferences.fillContactTime('09:30');
    await survey.preferences.selectLikert('agree');
    await survey.next();
    await survey.thankYou.expectVisible();
    await survey.submit();
    await expect(
      survey.thankYou.statusMessage,
      'The confirmation should appear after submitting in Firefox',
    ).toBeVisible();
    steps.push('Submitted in Firefox and saw the confirmation message');

    workflow('TC-027 - Firefox compatibility', steps);
  });
});
