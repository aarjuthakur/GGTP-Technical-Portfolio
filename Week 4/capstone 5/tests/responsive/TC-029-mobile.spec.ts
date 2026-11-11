import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { completeFullSurvey } from '../support/journey';

test.describe('TC-029 - Mobile responsive (iPhone)', () => {
  test('completes the survey on a phone-sized viewport without layout overflow', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    const viewport = await survey.viewportSize();
    await expect(survey.title, 'The survey title should render on a phone').toBeVisible();
    expect(
      await survey.hasHorizontalOverflow(),
      'Page 1 should not be wider than the phone viewport',
    ).toBe(false);
    steps.push(`Opened Page 1 in a ${viewport.width}x${viewport.height} phone viewport with no overflow`);

    await completeFullSurvey(survey);
    await survey.thankYou.expectVisible();
    await expect(
      survey.thankYou.summaryList,
      'The summary should render on a phone',
    ).toBeVisible();
    expect(
      await survey.hasHorizontalOverflow(),
      'The last page should not be wider than the phone viewport',
    ).toBe(false);
    steps.push('Completed all pages on the phone viewport with no horizontal overflow');

    await survey.submit();
    await expect(
      survey.thankYou.statusMessage,
      'The confirmation should appear after submitting on a phone',
    ).toBeVisible();
    steps.push('Submitted on the phone viewport and saw the confirmation message');

    workflow('TC-029 - Mobile responsive (iPhone)', steps);
  });
});
