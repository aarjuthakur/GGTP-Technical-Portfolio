import { expect, test as base } from '@playwright/test';
import { MicrosoftFormsPage } from '../pages/MicrosoftFormsPage';
import { SurveyPage } from '../pages/SurveyPage';
import { LIVE_FORM_URL } from '../config/liveForm';
import { workflow } from '../utils/logger';
import personas from './personas.json';
import * as fs from 'fs';

export interface Persona {
  id: string;
  description: string;
  name: string;
  email: string;
  company: string;
  employees: string;
  expectValid: boolean;
 
  reason: string;
}

interface CapstoneFixtures {
  steps: string[];
  survey: SurveyPage;
  forms: MicrosoftFormsPage;
  personaRows: Persona[];
  autoCapture: void;
}

export const test = base.extend<CapstoneFixtures>({
  steps: async ({}, use, testInfo) => {
    const collected: string[] = [];
    await use(collected);
    if (collected.length > 0 && testInfo.status !== testInfo.expectedStatus) {
      workflow(`${testInfo.title} (failed - partial workflow)`, collected);
    }
  },

  survey: async ({ page }, use) => {
    await use(new SurveyPage(page));
  },

  forms: async ({ page }, use) => {
    await use(new MicrosoftFormsPage(page));
  },

  personaRows: async ({}, use) => {
    await use(personas as Persona[]);
  },

  autoCapture: [async ({ page }, use, testInfo) => {
    await use();

    try {
      const data = await page.evaluate(() => {
        const result: Record<string, string | string[]> = {};

        document.querySelectorAll('input, select, textarea').forEach((el) => {
          const input = el as HTMLInputElement;
          const id = input.getAttribute('data-testid') || input.name || input.id;
          if (!id) return;
          if (input.type === 'checkbox') {
            if (input.checked) {
              if (!result[id]) result[id] = [];
              (result[id] as string[]).push(input.value || 'checked');
            }
          } else if (input.type === 'radio') {
            if (input.checked) result[id] = input.value;
          } else {
            const val = input.value?.trim();
            if (val) result[id] = val;
          }
        });

        document.querySelectorAll('.selected[aria-pressed="true"]').forEach((el) => {
          const group = el.closest('[data-testid]');
          const groupId = group?.getAttribute('data-testid') || 'unknown';
          result[groupId] = el.textContent?.trim() || '';
        });

        document.querySelectorAll('[data-automation-id="questionItem"]').forEach((item) => {
          const title = item.querySelector('[data-automation-id="questionTitle"]')?.textContent?.trim() || '';
          if (!title) return;
          const textInput = item.querySelector('input[type="text"], input[type="email"], input[type="number"], textarea') as HTMLInputElement;
          if (textInput?.value?.trim()) { result[title] = textInput.value.trim(); return; }
          const checked = item.querySelector('input[type="radio"]:checked, input[aria-checked="true"]') as HTMLInputElement;
          if (checked) { result[title] = checked.closest('label')?.textContent?.trim() || checked.value; return; }
          const selected: string[] = [];
          item.querySelectorAll('input[type="checkbox"]:checked, [aria-checked="true"]').forEach((cb) => {
            selected.push((cb.closest('label') || cb).textContent?.trim() || '');
          });
          if (selected.length) { result[title] = selected; return; }
          const dropdown = item.querySelector('[role="combobox"], select') as HTMLElement;
          if (dropdown) { result[title] = dropdown.textContent?.trim() || (dropdown as HTMLSelectElement).value || ''; }
        });

        return result;
      });

      if (Object.keys(data).length > 0) {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toISOString().split('T')[1].replace(/[:.]/g, '-').slice(0, -5);
        const timestamp = `${dateStr}_${timeStr}`;
        const testId = testInfo.titlePath.join(' - ').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);

        const submissionDir = 'submissions';
        fs.mkdirSync(submissionDir, { recursive: true });

        const filePath = `${submissionDir}/${timestamp}_${testId}.json`;
        fs.writeFileSync(filePath, JSON.stringify({
          timestamp: now.toISOString(),
          testCase: testInfo.titlePath.join(' - '),
          project: testInfo.project.name,
          status: testInfo.status,
          data,
        }, null, 2));

        console.log(`Auto-captured submission: ${filePath}`);
      }
    } catch {
      // Page may have closed or navigated — skip capture silently
    }
  }, { auto: true }],
});

export { expect };

export const PUBLISHED_FORM_URL = LIVE_FORM_URL;
