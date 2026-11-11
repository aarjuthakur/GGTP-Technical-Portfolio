import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { SURVEY } from '../../utils/constants';

test.describe('TC-001 - Form Page Load', () => {
  test('survey loads without errors and shows Page 1', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error' && !message.text().includes('404')) {
        errors.push(message.text());
      }
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await survey.goto();
    steps.push('Opened the survey URL');

    await expect(survey.title, 'Survey title should be visible').toBeVisible();
    await expect(survey.title, 'Survey title text should match').toHaveText(SURVEY.title);
    steps.push('Verified the survey title is displayed');

    await survey.demographics.expectVisible();
    steps.push('Verified Page 1 (Welcome & Demographics) and the welcome message are visible');

    await expect(survey.progressText, 'Progress should start on page 1').toHaveText('Page 1 of 6');
    steps.push('Verified the progress indicator shows "Page 1 of 6"');

    expect(errors, 'No console or page errors should occur while loading the form').toEqual([]);
    steps.push('Confirmed no console or page errors were raised on load');

    workflow('TC-001 - Form loads and Page 1 is displayed', steps);
  });
});
