import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

test.describe('TC-021 - Required fields', () => {
  test('blocks Next and flags every unanswered required field', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    steps.push('Opened the survey on Page 1 without filling anything');

    await survey.next();
    expect(
      await survey.currentPageNumber(),
      'The survey should stay on Page 1 while it is invalid',
    ).toBe(1);
    steps.push('Clicked Next and the survey stayed on Page 1');

    for (const qid of ['q1', 'q2', 'q3', 'q4']) {
      await expect(
        survey.demographics.error(qid),
        `An error message should be shown for question ${qid}`,
      ).toBeVisible();
    }
    steps.push('Confirmed all four required questions show an error message');

    await expect(
      survey.demographics.nameInput,
      'The name field should be flagged as invalid for screen readers',
    ).toHaveAttribute('aria-invalid', 'true');
    steps.push('Confirmed the name field is marked aria-invalid');

    await survey.demographics.nameInput.fill(validUser.name);
    await expect(
      survey.demographics.error('q1'),
      'The name error should clear as soon as the field is corrected',
    ).toBeHidden();
    steps.push('Entered a valid name and its error cleared immediately');

    await survey.demographics.emailInput.fill(validUser.email);
    await survey.demographics.companyInput.fill(validUser.company);
    await survey.demographics.employeesInput.fill(validUser.employees);
    await survey.next();
    expect(await survey.currentPageNumber(), 'The survey should advance once the page is valid').toBe(2);
    steps.push('Completed the page and confirmed Next now advances to Page 2');

    workflow('TC-021 - Required-field validation blocks Next', steps);
  });
});
