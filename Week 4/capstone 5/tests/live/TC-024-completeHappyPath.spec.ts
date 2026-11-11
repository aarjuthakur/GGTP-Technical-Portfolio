import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import {
  improvementBranch,
  positiveBranch,
  preferencesFollowUpYes,
  satisfiedPageTwo,
} from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';
import * as fs from 'fs';

test.describe('TC-024 - Complete survey happy path (published form)', () => {
  test('all six pages complete and the response submits', async ({ forms, steps }) => {
    const allData: Record<string, string | string[]> = {};

    await forms.startPageOne(PUBLISHED_FORM_URL, validUser);
    await expect(forms.question(LIVE_Q.fullName), 'Page 1 should ask for the name').toBeVisible();
    Object.assign(allData, await forms.captureAllResponses());
    await forms.next();
    steps.push('Started the survey and completed Page 1 (demographics)');

    await expect(forms.progress, 'Page 2 should be shown').toContainText('Page 2 of 6');
    await forms.completePageTwo(satisfiedPageTwo);
    Object.assign(allData, await forms.captureAllResponses());
    await forms.next();
    steps.push('Completed Page 2 (product usage)');

    await expect(forms.question(LIVE_Q.likes), 'S3A should be shown').toBeVisible();
    await forms.completePageThree(positiveBranch);
    steps.push('Completed S3A (positive experience)');

    await expect(forms.question(LIVE_Q.whyNot), 'S3B should be shown').toBeVisible();
    await forms.completePageFour(improvementBranch);
    steps.push('Completed S3B (help us improve)');

    await expect(forms.question(LIVE_Q.recommendColleague), 'Page 5 should ask for a recommendation').toBeVisible();
    await forms.completePageFive(0);
    steps.push('Completed the Recommendation page');

    await expect(forms.question(LIVE_Q.likert), 'Page 6 should show the Likert grid').toBeVisible();
    Object.assign(allData, await forms.captureAllResponses());
    await forms.completePageSix(preferencesFollowUpYes);
    steps.push('Completed Page 6 with follow-up Yes and submitted');

    await expect(forms.thankYouMessage, 'Forms should confirm the submission').toBeVisible();
    steps.push('Verified the "Your response was submitted" confirmation');

    console.log('\n========== LIVE FORM SUBMITTED DATA ==========');
    console.log(JSON.stringify(allData, null, 2));
    console.log('===============================================\n');

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toISOString().split('T')[1].replace(/[:.]/g, '-').slice(0, -5);
    const timestamp = `${dateStr}_${timeStr}`;

    const submissionDir = 'submissions';
    fs.mkdirSync(submissionDir, { recursive: true });

    const filePath = `${submissionDir}/${timestamp}_TC-024_live_submission.json`;
    fs.writeFileSync(filePath, JSON.stringify({
      timestamp: now.toISOString(),
      testCase: 'TC-024 - Live form happy path',
      target: 'Microsoft Forms (published)',
      data: allData,
    }, null, 2));

    console.log(`Submission saved to: ${filePath}\n`);
    steps.push(`Saved live form data to: ${timestamp}_TC-024_live_submission.json`);

    workflow('TC-024 - The published survey can be completed end to end and submits', steps);
  });
});
