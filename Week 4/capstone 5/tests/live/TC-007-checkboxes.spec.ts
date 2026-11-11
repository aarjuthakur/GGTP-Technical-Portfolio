import { test, expect } from '../../fixtures/capstoneFixtures';
import { PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_CHOICES, LIVE_Q } from '../../config/liveForm';
import { validUser } from '../../fixtures/surveyData';
import { workflow } from '../../utils/logger';

test.describe('TC-007 - Checkbox Selection (published form)', () => {
  test('checkboxes allow several simultaneous selections', async ({ forms, steps }) => {
    await forms.reachPageTwo(PUBLISHED_FORM_URL, validUser);
    steps.push('Completed Page 1 and opened Page 2 (Product Usage)');

    const boxes = forms.question(LIVE_Q.features).locator('input[type=checkbox]');
    const dashboard = LIVE_CHOICES.features.indexOf('Dashboard');
    const shopping = LIVE_CHOICES.features.indexOf('Online Shopping');

    await forms.selectCheckbox(LIVE_Q.features, dashboard);
    await forms.selectCheckbox(LIVE_Q.features, shopping);
    steps.push(`Ticked "${LIVE_CHOICES.features[dashboard]}" and "${LIVE_CHOICES.features[shopping]}"`);

    await expect(boxes.nth(dashboard), 'First feature should stay ticked').toBeChecked();
    await expect(boxes.nth(shopping), 'Second feature should be ticked as well').toBeChecked();
    steps.push('Verified both selections are held at the same time');

    await forms.selectCheckbox(LIVE_Q.features, dashboard);
    steps.push(`Unticked "${LIVE_CHOICES.features[dashboard]}"`);

    await expect(boxes.nth(dashboard), 'The cleared box should be unchecked').not.toBeChecked();
    await expect(boxes.nth(shopping), 'Clearing one box must not disturb the other').toBeChecked();
    steps.push('Verified the selections are cleared independently');

    workflow('TC-007 - Checkboxes allow multiple, independently removable selections', steps);
  });
});
