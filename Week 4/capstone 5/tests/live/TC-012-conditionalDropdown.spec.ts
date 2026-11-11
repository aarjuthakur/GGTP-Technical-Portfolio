import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_CHOICES, LIVE_Q, LIVE_SECTIONS } from '../../config/liveForm';
import { satisfiedPageTwo } from '../../fixtures/liveSurveyData';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-012 - Conditional feature dropdown (published form)', () => {
  test('the dropdown lists every feature and keeps the selection', async ({ forms, steps }) => {
    await forms.reachBranch(PUBLISHED_FORM_URL, validUser, satisfiedPageTwo);
    steps.push('Completed Pages 1 and 2 and arrived on S3A Your Experience');

    const dropdown = forms.question(LIVE_Q.bestFeature);
    await expect(dropdown, 'The best-feature dropdown should be visible on S3A').toBeVisible();
    await expect(forms.section(LIVE_SECTIONS.s3), 'The improvement section must be hidden here').toHaveCount(0);
    steps.push('Verified the dropdown is present and S3B is absent');

    await dropdown.locator('[aria-haspopup]').click();
    const options = forms.page.locator('[role=option]');
    await expect(options.first(), 'Opening the dropdown should render its options').toBeVisible();
    const labels = (await options.allInnerTexts()).map((text) => text.trim());
    expect(labels, 'The dropdown should offer the six configured features').toEqual([...LIVE_CHOICES.bestFeature]);
    steps.push(`Opened the list and verified all ${labels.length} features`);

    await forms.selectOption(LIVE_Q.bestFeature, 'Reports');
    await expect(
      dropdown.locator('[aria-haspopup]'),
      'The dropdown should display the selected feature',
    ).toContainText('Reports');
    steps.push('Selected Reports and verified the trigger shows the value');

    workflow('TC-012 - The feature dropdown lists six options and retains the selection', steps);
  });
});
