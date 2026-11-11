import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachPreferences } from '../support/journey';

test.describe('TC-019 - Follow-up = Yes shows the contact block', () => {
  test('reveals the contact questions when the user asks for a follow-up', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await reachPreferences(survey, { rating: 5, nps: 9, caseStudy: 'No' });
    await expect(
      survey.preferences.section,
      'Page 5 should be visible',
    ).toBeVisible();
    await expect(
      survey.preferences.contactBranch,
      'The contact block should be hidden before an answer is given',
    ).toBeHidden();
    steps.push('Reached Page 5 with the contact block hidden');

    await survey.preferences.selectFollowUp('Yes');
    await expect(
      survey.preferences.contactBranch,
      'The contact block should appear when follow-up is Yes',
    ).toBeVisible();
    steps.push('Selected follow-up "Yes" and the contact block appeared');

    await survey.preferences.selectContactMethod('Microsoft Teams');
    await survey.preferences.fillContactTime('10:15');
    await expect(
      survey.preferences.contactMethodSelect,
      'The chosen contact method should be kept',
    ).toHaveValue('Microsoft Teams');
    await expect(
      survey.preferences.contactTimeInput,
      'The chosen contact time should be kept',
    ).toHaveValue('10:15');
    steps.push('Chose "Microsoft Teams" at 10:15 and verified both values are kept');

    workflow('TC-019 - Follow-up = Yes reveals the contact block', steps);
  });
});
