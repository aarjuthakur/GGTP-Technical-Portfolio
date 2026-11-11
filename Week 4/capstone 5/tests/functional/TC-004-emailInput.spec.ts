import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-004 - Email input', () => {
  test('accepts a valid email address and allows the survey to continue', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);
    const validEmail = 'arjun.mehta@example.com';

    await survey.goto();
    steps.push('Opened the survey on Page 1');

    await survey.demographics.emailInput.fill(validEmail);
    steps.push(`Entered a valid email address: "${validEmail}"`);

    await expect(
      survey.demographics.emailInput,
      'The email field should keep the entered value',
    ).toHaveValue(validEmail);
    steps.push('Verified the email field keeps the entered value');

    await survey.demographics.nameInput.fill(validUser.name);
    await survey.demographics.companyInput.fill(validUser.company);
    await survey.demographics.employeesInput.fill(validUser.employees);
    steps.push('Completed the remaining required fields on Page 1');

    await survey.next();
    await survey.productUsage.expectVisible();
    steps.push('Clicked Next and reached Page 2, confirming the email was accepted');

    await expect(
      survey.demographics.error('q2'),
      'No email validation error should be shown',
    ).toBeHidden();
    steps.push('Confirmed no validation error was raised for the email field');

    workflow('TC-004 - Email input accepts a valid address', steps);
  });
});
