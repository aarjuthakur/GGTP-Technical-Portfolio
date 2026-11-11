import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser } from '../../fixtures/surveyData';
import { completeFullSurvey } from '../support/journey';

test.describe('TC-026 - Chrome compatibility', () => {
  test('runs the whole survey in Chrome without layout or script problems', async ({ page }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    await survey.goto();
    await expect(survey.title, 'The survey title should render in Chrome').toBeVisible();
    await expect(survey.progressText).toHaveText('Page 1 of 6');
    steps.push('Opened the survey in Chrome; title and progress text rendered');

    await survey.demographics.nameInput.fill(validUser.name);
    await expect(
      survey.demographics.nameInput,
      'Typing should work in the name field',
    ).toHaveValue(validUser.name);
    steps.push('Confirmed text entry works in Chrome');

    await survey.demographics.fill(validUser);
    await survey.next();
    await survey.productUsage.expectVisible();
    await survey.completeProductUsage({
      source: 'Word of mouth',
      features: ['Dashboard', 'Reports'],
      rating: 5,
      nps: 9,
    });
    await survey.completeSatisfactionPositive({
      likes: 'Clean, fast and easy to use.',
      bestFeature: 'Reports',
      purchaseDate: '2024-01-15',
    });
    await survey.completeFeedbackPromoter('Yes');
    await survey.preferences.selectFollowUp('Yes');
    await survey.preferences.selectContactMethod('Email');
    await survey.preferences.fillContactTime('09:30');
    await survey.preferences.selectLikert('agree');
    await survey.next();
    steps.push('Completed all six pages in Chrome');

    await survey.thankYou.expectVisible();
    await expect(
      survey.thankYou.getSummaryEntry('Name'),
      'The summary should render the entered name',
    ).toContainText(validUser.name);
    await expect(
      survey.progressBar,
      'The progress bar should be full on the last page',
    ).toHaveAttribute('style', /width:\s*100%/);
    steps.push('Verified the summary and a full progress bar in Chrome');

    await survey.submit();
    await expect(
      survey.thankYou.statusMessage,
      'The confirmation should appear after submitting in Chrome',
    ).toBeVisible();
    steps.push('Submitted in Chrome and saw the confirmation message');

    workflow('TC-026 - Chrome compatibility', steps);
  });
});
