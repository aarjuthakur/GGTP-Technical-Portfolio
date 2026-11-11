import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-005 - Employee number input', () => {
  test('accepts valid numeric values at the boundary and above', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);
    const boundaries = ['1', '100000'];

    await survey.goto();
    steps.push('Opened the survey on Page 1');

    for (const value of boundaries) {
      await survey.demographics.nameInput.fill(validUser.name);
      await survey.demographics.emailInput.fill(validUser.email);
      await survey.demographics.companyInput.fill(validUser.company);
      await survey.demographics.employeesInput.fill(value);

      await expect(
        survey.demographics.employeesInput,
        `The employee count field should keep the value "${value}"`,
      ).toHaveValue(value);
      steps.push(`Entered employee count "${value}" and verified it is kept`);

      await survey.next();
      await survey.productUsage.expectVisible();
      await expect(
        survey.demographics.error('q4'),
        `No validation error should be shown for "${value}"`,
      ).toBeHidden();
      steps.push(`Confirmed "${value}" is accepted and the survey reached Page 2`);

      await survey.back();
      await survey.demographics.expectVisible();
    }

    workflow('TC-005 - Employee number input accepts valid boundary values', steps);
  });
});
