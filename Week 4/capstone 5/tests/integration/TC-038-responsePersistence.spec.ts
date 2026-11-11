import { test, expect } from '../../fixtures/capstoneFixtures';
import { SurveyPage } from '../../pages/SurveyPage';
import { workflow } from '../../utils/logger';
import { validUser, productUsage, positiveBranchData } from '../../fixtures/surveyData';

test.describe('TC-038 - Response persistence and collection', () => {
  test('records the response once with its data, then collects a fresh one after a reload', async ({
    page,
  }) => {
    const steps: string[] = [];
    const survey = new SurveyPage(page);

    // 1. Complete and submit a known response.
    await survey.goto();
    await survey.completeDemographics(validUser);
    await survey.completeProductUsage({
      source: productUsage.source,
      features: [...productUsage.features],
      rating: 5,
      nps: 9,
    });
    await survey.completeSatisfactionPositive(positiveBranchData);
    await survey.completeFeedbackPromoter('Yes');
    await survey.preferences.selectFollowUp('No');
    await survey.preferences.selectLikert('agree');
    await survey.next();
    steps.push('Completed all six pages with known answers');

    await survey.submit();
    steps.push('Submitted the response');

    // 2. Recorded exactly once, data intact.
    await expect(
      survey.thankYou.statusMessage,
      'The survey should confirm that the response was recorded',
    ).toContainText('Your response has been recorded');
    await expect(
      survey.submitButton,
      'Submit must be disabled so the same response cannot be recorded twice',
    ).toBeDisabled();
    expect(await survey.isSubmitted(), 'The submitted flag should be set').toBe(true);
    await expect(
      survey.thankYou.getSummaryEntry('Name'),
      'The recorded response should still hold the name that was entered',
    ).toContainText(validUser.name);
    await expect(
      survey.thankYou.getSummaryEntry('Overall rating'),
      'The recorded response should still hold the rating that was entered',
    ).toContainText('5');
    steps.push(
      'The response was recorded exactly once and the summary kept the entered answers',
    );

    // 3. Reload: a fresh response can now be collected.
    await page.reload();
    await expect(
      survey.demographics.section,
      'A reload should present a fresh Page 1 for the next respondent',
    ).toBeVisible();
    await expect(
      survey.demographics.nameInput,
      'The fresh form should start empty',
    ).toHaveValue('');
    expect(await survey.isSubmitted(), 'The fresh form should not carry the old flag').toBe(
      false,
    );
    steps.push('After a reload the survey is empty and ready to collect the next response');

    workflow('TC-038 - A response is recorded once and collected correctly', steps);
  });
});

//38 - responsePersistence
