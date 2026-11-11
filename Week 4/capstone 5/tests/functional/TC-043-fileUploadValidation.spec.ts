import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { reachFeedback } from '../support/journey';

test.describe('TC-043 - File upload validation', () => {
  test('accepts allowed files, rejects bad types and oversized files, and recovers', async ({
    page,
  }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await reachFeedback(survey, { rating: 5, nps: 5 });
    await expect(
      survey.feedback.uploadInput,
      'The upload control should be visible on the detractor branch',
    ).toBeVisible();
    await expect(
      survey.feedback.uploadInput,
      'The upload control should only offer images and PDFs',
    ).toHaveAttribute('accept', 'image/*,.pdf');
    steps.push('Reached the detractor branch and the upload control only offers images/PDFs');

    // 2. Allowed PDF.
    await survey.feedback.uploadInput.setInputFiles('fixtures/files/sample.pdf');
    await expect(
      survey.feedback.error('q12c'),
      'An allowed PDF should not raise a file error',
    ).toBeHidden();
    steps.push('The allowed sample PDF was accepted without an error');

    // 3. Disallowed type (Playwright attaches it directly, bypassing the OS dialog filter).
    await survey.feedback.uploadInput.setInputFiles({
      name: 'notes.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This file type is not part of the accept list.'),
    });
    await expect(
      survey.feedback.error('q12c'),
      'A .txt file should be rejected with the file error',
    ).toBeVisible();
    expect(
      await survey.feedback.uploadInput.evaluate((el) => (el as HTMLInputElement).files?.length ?? 0),
      'A rejected file must be dropped from the control',
    ).toBe(0);
    steps.push('A .txt file was rejected and dropped from the control');

    // 4. Oversized file (10 MB + 1 byte - one byte over the documented limit).
    await survey.feedback.uploadInput.setInputFiles({
      name: 'too-large.png',
      mimeType: 'image/png',
      buffer: Buffer.alloc(10 * 1024 * 1024 + 1, 1),
    });
    await expect(
      survey.feedback.error('q12c'),
      'A PNG just over 10 MB should be rejected by the size limit',
    ).toBeVisible();
    steps.push('A PNG just over the 10 MB limit was rejected by the size check');

    // 5. Recovery with a valid file.
    await survey.feedback.uploadInput.setInputFiles('fixtures/files/sample.pdf');
    await expect(
      survey.feedback.error('q12c'),
      'The file error should clear once a valid file is attached',
    ).toBeHidden();
    steps.push('The error cleared as soon as a valid file was attached again');

    workflow('TC-043 - File upload accepts only allowed files up to 10 MB', steps);
  });
});
