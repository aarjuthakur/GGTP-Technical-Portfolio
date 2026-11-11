import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser, productUsage, positiveBranchData } from '../../fixtures/surveyData';
import * as fs from 'fs';

test.describe('TC-024 - Complete survey happy path', () => {
  test('walks through all six pages, submits and shows the confirmation', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    steps.push('Opened the survey on Page 1');

    await survey.completeDemographics(validUser);
    steps.push(`Completed Page 1 (demographics) as ${validUser.name}`);

    await survey.completeProductUsage({
      source: productUsage.source,
      features: [...productUsage.features],
      rating: 5,
      nps: 9,
    });
    steps.push('Completed Page 2 (source, features, rating 5, NPS 9)');

    await survey.completeSatisfactionPositive(positiveBranchData);
    steps.push('Completed the Page 3 positive branch (liked most, best feature, purchase date)');

    await survey.completeFeedbackPromoter('Yes');
    steps.push('Completed the Page 4 promoter branch (case study = Yes)');

    await survey.preferences.selectFollowUp('Yes');
    await survey.preferences.selectContactMethod('Email');
    await survey.preferences.fillContactTime('09:30');
    await survey.preferences.selectLikert('agree');
    steps.push('Completed Page 5 (follow-up Yes, contact by Email at 09:30, Likert agree)');

    await survey.next();
    await survey.thankYou.expectVisible();
    await expect(
      survey.thankYou.message,
      'The thank-you message should greet the user by name',
    ).toContainText(validUser.name);
    await expect(
      survey.thankYou.summaryList,
      'The response summary should be shown on the last page',
    ).toBeVisible();
    await expect(
      survey.thankYou.statusMessage,
      'No confirmation should be shown before submitting',
    ).toBeHidden();
    steps.push('Reached Page 6 and saw the personalised message and the summary');

    await survey.submit();
    steps.push('Clicked Submit');

    await expect(
      survey.thankYou.statusMessage,
      'The confirmation message should appear after submitting',
    ).toBeVisible();
    await expect(survey.thankYou.statusMessage).toHaveText(
      'Your response has been recorded. Thank you!',
    );
    await expect(
      survey.submitButton,
      'Submit should be disabled once the response is recorded',
    ).toBeDisabled();
    expect(
      await survey.isSubmitted(),
      'The page should flag that the response was submitted',
    ).toBe(true);
    steps.push('Verified the confirmation, the disabled Submit button and the submitted flag');

    const storedData = await page.evaluate(() => {
      const data: Record<string, string | string[]> = {};
      document.querySelectorAll('input, select, textarea').forEach((el) => {
        const input = el as HTMLInputElement;
        const id = input.getAttribute('data-testid') || input.name || input.id;
        if (!id) return;
        if (input.type === 'checkbox') {
          if (input.checked) {
            if (!data[id]) data[id] = [];
            (data[id] as string[]).push(input.value || 'checked');
          }
        } else if (input.type === 'radio') {
          if (input.checked) data[id] = input.value;
        } else {
          const val = input.value?.trim();
          if (val) data[id] = val;
        }
      });
      document.querySelectorAll('.selected[aria-pressed="true"]').forEach((el) => {
        const group = el.closest('[data-testid]');
        const groupId = group?.getAttribute('data-testid') || 'unknown';
        data[groupId] = el.textContent?.trim() || '';
      });
      return data;
    });

    console.log('\n========== SUBMITTED FORM DATA ==========');
    console.log(JSON.stringify(storedData, null, 2));
    console.log('=========================================\n');

    // Save submission to file with timestamp
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toISOString().split('T')[1].replace(/[:.]/g, '-').slice(0, -5);
    const timestamp = `${dateStr}_${timeStr}`;

    const submissionDir = 'submissions';
    fs.mkdirSync(submissionDir, { recursive: true });

    const filePath = `${submissionDir}/${timestamp}_TC-024_submission.json`;
    fs.writeFileSync(filePath, JSON.stringify({
      timestamp: now.toISOString(),
      testCase: 'TC-024 - Complete survey happy path',
      data: storedData
    }, null, 2));

    console.log(`Submission saved to: submissions/${timestamp}_TC-024_submission.json\n`);
    steps.push(`Saved submission data to file: ${timestamp}_TC-024_submission.json`);

    workflow('TC-024 - Complete survey happy path', steps);
  });
});
