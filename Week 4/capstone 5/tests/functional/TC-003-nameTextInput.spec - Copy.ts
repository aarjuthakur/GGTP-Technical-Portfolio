import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-003 - Name text input', () => {
  test('accepts a valid name and allows the survey to continue', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);
    const validName = 'Arjun Mehta';

    await survey.goto();
    steps.push('Opened the survey on Page 1');

    await survey.demographics.nameInput.fill(validName);
    steps.push(`Entered a valid name: "${validName}"`);

    await expect(
      survey.demographics.nameInput,
      'The name field should keep the entered value',
    ).toHaveValue(validName);
    steps.push('Verified the name field keeps the entered value');

    await survey.demographics.emailInput.fill(validUser.email);
    await survey.demographics.companyInput.fill(validUser.company);
    await survey.demographics.employeesInput.fill(validUser.employees);
    steps.push('Completed the remaining required fields on Page 1');

    await survey.next();
    await survey.productUsage.expectVisible();
    steps.push('Clicked Next and reached Page 2, confirming the name was accepted');

    await expect(
      survey.demographics.error('q1'),
      'No name validation error should be shown',
    ).toBeHidden();
    steps.push('Confirmed no validation error was raised for the name field');

    workflow('TC-003 - Name text input accepts a valid value', steps);
  });
});
