import { test, expect } from '../../fixtures/capstoneFixtures';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';

interface LengthRule {
  field: 'name' | 'company';
  qid: string;
  min: number;
  max: number;
}

const nameRule: LengthRule = { field: 'name', qid: 'q1', min: 3, max: 100 };
const companyRule: LengthRule = { field: 'company', qid: 'q3', min: 2, max: 100 };
const rules: LengthRule[] = [nameRule, companyRule];

const text = (length: number): string => 'A'.repeat(length);

async function fillPageOneWithBoundary(
  survey: import('../../pages/SurveyPage').SurveyPage,
  rule: LengthRule,
  value: string,
): Promise<void> {
  await survey.goto();
  await survey.demographics.fill(validUser);
  await survey.demographics.fieldInput(rule.field).fill(value);
}

test.describe('TC-044 - Character-length and content rules', () => {
  for (const rule of rules) {
    test(`${rule.field}: one character below the ${rule.min} character minimum is rejected`, async ({
      survey,
      steps,
    }) => {
      await fillPageOneWithBoundary(survey, rule, text(rule.min - 1));
      await survey.next();

      expect(
        await survey.currentPageNumber(),
        `${rule.field} at ${rule.min - 1} characters is below the minimum and must be rejected`,
      ).toBe(1);
      await expect(
        survey.demographics.error(rule.qid),
        `A ${rule.min - 1} character ${rule.field} should show its validation message`,
      ).toBeVisible();
      steps.push(`Verified ${rule.min - 1} characters is rejected and the survey stayed on Page 1`);

      workflow(`TC-044 - ${rule.field} below minimum`, steps);
    });

    test(`${rule.field}: exactly the ${rule.min} character minimum is accepted`, async ({
      survey,
      steps,
    }) => {
      await fillPageOneWithBoundary(survey, rule, text(rule.min));
      await survey.next();

      expect(
        await survey.currentPageNumber(),
        `${rule.field} at ${rule.min} characters is exactly the minimum and must be accepted`,
      ).toBe(2);
      steps.push(`Verified ${rule.min} characters is accepted and the survey advanced to Page 2`);

      workflow(`TC-044 - ${rule.field} on minimum`, steps);
    });

    test(`${rule.field}: the ${rule.max} character maximum is guarded by maxlength and the validator`, async ({
      survey,
      steps,
    }) => {
      await fillPageOneWithBoundary(survey, rule, text(rule.max));

      // 1. The field must carry the maxlength guard, so a respondent cannot type past the maximum.
      await expect(
        survey.demographics.fieldInput(rule.field),
        `The ${rule.field} field should carry maxlength="${rule.max}"`,
      ).toHaveAttribute('maxlength', String(rule.max));
      steps.push(`Confirmed the ${rule.field} field carries maxlength="${rule.max}"`);

      // 2. A value exactly on the maximum is accepted.
      await survey.next();
      expect(
        await survey.currentPageNumber(),
        `${rule.field} at ${rule.max} characters is exactly the maximum and must be accepted`,
      ).toBe(2);
      steps.push(`Verified ${rule.max} characters (the maximum) is accepted`);

      // 3. The validator itself rejects an over-long value. The browser truncates anything typed
      //    past maxlength, so the value is set programmatically to test the rule rather than the
      //    input guard.
      await survey.goto();
      await survey.demographics.fill(validUser);
      await survey.demographics.setValueBypassingMaxlength(rule.field, text(rule.max + 1));
      await survey.next();
      expect(
        await survey.currentPageNumber(),
        `${rule.field} at ${rule.max + 1} characters is over the maximum and must be rejected`,
      ).toBe(1);
      await expect(
        survey.demographics.error(rule.qid),
        `An over-long ${rule.field} should show its validation message`,
      ).toBeVisible();
      steps.push(
        `Verified ${rule.max + 1} characters (over the maximum) is rejected by the validator`,
      );

      workflow(`TC-044 - ${rule.field} maximum`, steps);
    });
  }

  test('the paragraph minimum is 10 characters and the maximum is 1000', async ({ survey, steps }) => {
    // The positive branch is the shortest route to a paragraph question (Q9).
    await survey.goto();
    await survey.completeDemographics(validUser);
    await survey.completeProductUsage({
      source: 'Word of mouth',
      features: ['Dashboard'],
      rating: 5,
      nps: 9,
    });
    await survey.satisfactionBranch.expectVisible();
    steps.push('Reached Page 3 on the positive branch, where Q9 is a paragraph answer');

    await expect(
      survey.satisfactionBranch.likesInput,
      'The paragraph field should carry maxlength="1000"',
    ).toHaveAttribute('maxlength', '1000');
    steps.push('Confirmed the paragraph field carries maxlength="1000"');

    await survey.satisfactionBranch.likesInput.fill(text(9));
    await survey.next();
    expect(
      await survey.currentPageNumber(),
      'A 9 character paragraph is below the 10 character minimum and must be rejected',
    ).toBe(3);
    await expect(
      survey.satisfactionBranch.error('q9'),
      'A 9 character paragraph should show its validation message',
    ).toBeVisible();
    steps.push('Verified 9 characters (one below the minimum) is rejected');

    await survey.satisfactionBranch.likesInput.fill(text(10));
    await survey.satisfactionBranch.bestFeatureSelect.selectOption('Reports');
    await survey.satisfactionBranch.purchaseDateInput.fill('2024-01-15');
    await expect(
      survey.satisfactionBranch.error('q9'),
      'The paragraph message should clear once the answer reaches the minimum',
    ).toBeHidden();
    steps.push('Verified 10 characters (exactly the minimum) clears the message');

    await survey.satisfactionBranch.likesInput.fill(text(1000));
    const stored = await survey.satisfactionBranch.likesInput.inputValue();
    expect(stored.length, 'A 1000 character answer must be stored in full').toBe(1000);
    steps.push('Verified 1000 characters (exactly the maximum) is stored in full');

    workflow('TC-044 - paragraph length boundaries', steps);
  });
});
