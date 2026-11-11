import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-022 - Email format validation', () => {
  test('rejects malformed emails and accepts a valid address', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);
    const invalidEmails = ['plainaddress', 'user@domain', '@example.com', 'user name@example.com'];

    await survey.goto();
    await survey.demographics.nameInput.fill(validUser.name);
    await survey.demographics.companyInput.fill(validUser.company);
    await survey.demographics.employeesInput.fill(validUser.employees);
    steps.push('Filled the other required fields so only the email address can fail');

    for (const email of invalidEmails) {
      await survey.demographics.emailInput.fill(email);
      await survey.next();
      expect(
        await survey.currentPageNumber(),
        `The survey should not move on for the email "${email}"`,
      ).toBe(1);
      await expect(
        survey.demographics.error('q2'),
        `An error should be shown for the email "${email}"`,
      ).toBeVisible();
      steps.push(`Rejected the invalid email "${email}" and stayed on Page 1`);
    }

    await survey.demographics.emailInput.fill(validUser.email);
    await expect(
      survey.demographics.error('q2'),
      'The email error should clear once a valid address is entered',
    ).toBeHidden();
    await survey.next();
    expect(
      await survey.currentPageNumber(),
      'The survey should advance for a valid email',
    ).toBe(2);
    steps.push(`Accepted the valid email "${validUser.email}" and reached Page 2`);

    workflow('TC-022 - Email format validation', steps);
  });
});
