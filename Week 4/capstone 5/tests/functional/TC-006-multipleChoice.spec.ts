import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-006 - Multiple choice', () => {
  test('allows exactly one option to be selected', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    await survey.completeDemographics(validUser);
    steps.push('Completed Page 1 and reached Page 2');

    await survey.productUsage.selectSource('Word of mouth');
    await expect(
      survey.productUsage.sourceOption('Word of mouth'),
      'The first option should be selected',
    ).toBeChecked();
    steps.push('Selected "Word of mouth" and verified it is checked');

    await survey.productUsage.selectSource('Social media');
    await expect(
      survey.productUsage.sourceOption('Social media'),
      'The newly chosen option should be selected',
    ).toBeChecked();
    await expect(
      survey.productUsage.sourceOption('Word of mouth'),
      'The previously chosen option should be cleared',
    ).not.toBeChecked();
    steps.push('Selected "Social media" and confirmed only one option stays selected');

    workflow('TC-006 - Multiple choice allows a single selection', steps);
  });
});
