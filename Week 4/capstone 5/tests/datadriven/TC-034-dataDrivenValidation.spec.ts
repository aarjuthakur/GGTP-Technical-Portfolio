import { test, expect, PUBLISHED_FORM_URL } from '../../fixtures/capstoneFixtures';
import { LIVE_Q } from '../../config/liveForm';
import personas from '../../fixtures/personas.json';
import { workflow } from '../../utils/logger';

test.describe('TC-034 - Data-driven Page 1 validation (published form)', () => {
  for (const row of personas) {
    test(`${row.id} - ${row.description}`, async ({ forms, personaRows, steps }) => {
      // The fixture is the single source of truth; fail loudly if the dataset and the test drift.
      const persona = personaRows.find((candidate) => candidate.id === row.id);
      expect(persona, `Persona ${row.id} should be supplied by the personaRows fixture`).toBeDefined();

      await forms.openAndStart(PUBLISHED_FORM_URL);
      await forms.completePageOne(persona!);
      steps.push(`Filled Page 1 with ${persona!.id}: ${persona!.reason}`);

      await forms.next();
      steps.push(`Pressed Next for ${persona!.id}`);

      if (persona!.expectValid) {
        await expect(
          forms.progress,
          `${persona!.id} (${persona!.reason}) should be accepted and advance to Page 2`,
        ).toContainText('Page 2 of 6');
        steps.push(`Verified ${persona!.id} advances to Page 2`);
      } else {
        await expect(
          forms.progress,
          `${persona!.id} (${persona!.reason}) must be rejected and stay on Page 1`,
        ).toContainText('Page 1 of 6');
        await expect(
          forms.errorMessages.first(),
          `${persona!.id} (${persona!.reason}) should raise a validation message`,
        ).toBeVisible();
        steps.push(`Verified ${persona!.id} is rejected with a validation message`);
      }

      workflow(`TC-034 - ${persona!.id} ${persona!.description}`, steps);
    });
  }

  // The question set is referenced so a Page 1 rename fails the build rather than silently
  // aiming the dataset at the wrong form.
  test('the dataset targets the published Page 1 questions', async ({ forms, personaRows }) => {
    await forms.openAndStart(PUBLISHED_FORM_URL);
    expect(await forms.visibleQuestions()).toEqual([
      LIVE_Q.fullName,
      LIVE_Q.email,
      LIVE_Q.company,
      LIVE_Q.employees,
    ]);
    expect(personaRows.length, 'The persona dataset should not be empty').toBeGreaterThan(0);
  });
});
