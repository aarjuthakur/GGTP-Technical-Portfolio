import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';
import { completeFullSurvey } from '../support/journey';

test.describe('TC-030 - Tablet responsive (iPad)', () => {
  test('runs the whole survey in a tablet viewport without overflow', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    const viewport = await survey.viewportSize();
    await expect(survey.title, 'The survey title should render on a tablet').toBeVisible();
    await expect(
      survey.progressBar,
      'The progress bar should be visible on a tablet',
    ).toBeVisible();
    const barStart = (await survey.progressBar.boundingBox())?.width ?? 0;
    expect(barStart, 'The progress bar should already have some width on Page 1').toBeGreaterThan(0);
    steps.push(`The progress bar rendered with a width of ${Math.round(barStart)}px on Page 1`);
    expect(
      await survey.hasHorizontalOverflow(),
      'Page 1 should not be wider than the tablet viewport',
    ).toBe(false);
    steps.push(
      `Opened Page 1 in a ${viewport.width}x${viewport.height} tablet viewport with no overflow`,
    );

    await completeFullSurvey(survey);
    await survey.thankYou.expectVisible();
    await expect(
      survey.thankYou.getSummaryEntry('Name'),
      'The summary should render the entered name on a tablet',
    ).toContainText(validUser.name);
    expect(
      await survey.hasHorizontalOverflow(),
      'The last page should not be wider than the tablet viewport',
    ).toBe(false);
    const barEnd = (await survey.progressBar.boundingBox())?.width ?? 0;
    expect(
      barEnd,
      'The progress bar should grow as the survey advances',
    ).toBeGreaterThan(barStart);
    steps.push(
      `Confirmed the progress bar grew from ${Math.round(barStart)}px to ${Math.round(barEnd)}px`,
    );
    steps.push('Completed all pages on the tablet viewport with no horizontal overflow');

    await survey.submit();
    await expect(
      survey.thankYou.statusMessage,
      'The confirmation should appear after submitting on a tablet',
    ).toBeVisible();
    steps.push('Submitted on the tablet viewport and saw the confirmation message');

    workflow('TC-030 - Tablet responsive (iPad)', steps);
  });
});
