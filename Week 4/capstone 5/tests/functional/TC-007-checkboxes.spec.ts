import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-007 - Checkboxes', () => {
  test('allows multiple features to be selected and cleared', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    await survey.completeDemographics(validUser);
    steps.push('Completed Page 1 and reached Page 2');

    await survey.productUsage.selectFeature('Dashboard');
    await survey.productUsage.selectFeature('Reports');
    await expect(
      survey.productUsage.featureCheckbox('Dashboard'),
      'Dashboard should stay checked',
    ).toBeChecked();
    await expect(
      survey.productUsage.featureCheckbox('Reports'),
      'Reports should stay checked',
    ).toBeChecked();
    steps.push('Selected "Dashboard" and "Reports" and verified both are checked');

    await survey.productUsage.selectFeature('Reports');
    await expect(
      survey.productUsage.featureCheckbox('Reports'),
      'Reports should be cleared after clicking it again',
    ).not.toBeChecked();
    await expect(
      survey.productUsage.featureCheckbox('Dashboard'),
      'Dashboard should remain checked',
    ).toBeChecked();
    steps.push('Cleared "Reports" and confirmed "Dashboard" is still checked');

    workflow('TC-007 - Checkboxes allow multiple independent selections', steps);
  });
});
