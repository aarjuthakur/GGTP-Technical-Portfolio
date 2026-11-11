import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachFeedback } from '../support/journey';

test.describe('TC-018 - File upload on the detractor path', () => {
  test('shows the upload only for detractors and accepts an allowed file', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await reachFeedback(survey, { rating: 5, nps: 5 });
    await expect(
      survey.feedback.detractorBranch,
      'The detractor branch should be shown',
    ).toBeVisible();
    await expect(
      survey.feedback.uploadInput,
      'The file upload should be visible on the detractor branch',
    ).toBeVisible();
    steps.push('The file upload was visible on the detractor branch');

    await survey.feedback.uploadInput.setInputFiles('fixtures/files/sample.pdf');
    await expect(
      survey.feedback.error('q12c'),
      'No file error should be shown for an allowed PDF',
    ).toBeHidden();
    steps.push('Attached fixtures/files/sample.pdf and no file error was raised');

    await reachFeedback(survey, { rating: 5, nps: 9 });
    await expect(
      survey.feedback.promoterBranch,
      'The promoter branch should be shown',
    ).toBeVisible();
    await expect(
      survey.feedback.uploadInput,
      'The file upload should not be available on the promoter branch',
    ).toBeHidden();
    steps.push('On the promoter branch the file upload was hidden');

    workflow('TC-018 - File upload shows only on the detractor path', steps);
  });
});
