import { test, expect } from '../../fixtures/capstoneFixtures';
import type { Page } from '@playwright/test';
import { MicrosoftFormsPage } from '../../pages/MicrosoftFormsPage';
import { LIVE_FORM, LIVE_Q } from '../../config/liveForm';
import { workflow } from '../../utils/logger';

interface LocaleCase {
  locale: string;
  language: string;
  direction: 'ltr' | 'rtl';
  startLabel: string;
  privacyFragment: RegExp;
}

const LOCALES: LocaleCase[] = [
  {
    locale: 'de-DE',
    language: 'de',
    direction: 'ltr',
    startLabel: 'Jetzt starten',
    privacyFragment: /Dieser Inhalt wird vom Besitzer des Formulars erstellt/,
  },
  {
    locale: 'ja-JP',
    language: 'ja',
    direction: 'ltr',
    startLabel: '今すぐ開始',
    privacyFragment: /このコンテンツはフォームの所有者が作成したものです/,
  },
  {
    locale: 'ar-SA',
    language: 'ar',
    direction: 'rtl',
    startLabel: 'ابدأ الآن',
    privacyFragment: /يتم إنشاء هذا المحتوى بواسطة مالك النموذج/,
  },
];

const UNICODE_NAME = 'Zoë Müller-O\'Connor';
const UNICODE_COMPANY = 'Müller & Söhne GmbH';

async function bodyText(page: Page): Promise<string> {
  return (await page.locator('body').innerText()).replace(/\s+/g, ' ');
}

for (const localeCase of LOCALES) {
  test.describe(`TC-035 - ${localeCase.locale} localisation and encoding`, () => {
    test('the form localises its chrome and keeps UTF-8 content intact', async ({ browser }) => {
      const steps: string[] = [];
      const context = await browser.newContext({ locale: localeCase.locale });
      const page = await context.newPage();
      const forms = new MicrosoftFormsPage(page);
      try {
        await forms.open(LIVE_FORM.url);
        steps.push(`Opened the published survey with locale ${localeCase.locale}`);

        await expect(page.locator('html'), 'The document should report the responder language').toHaveAttribute(
          'lang',
          localeCase.language,
        );
        await expect(page.locator('html'), 'The document direction should follow the locale').toHaveAttribute(
          'dir',
          localeCase.direction,
        );
        steps.push(`Verified lang=${localeCase.language} and dir=${localeCase.direction}`);

        await expect(forms.formTitle, 'The owner-authored title must render unchanged').toHaveText(LIVE_FORM.title);
        await expect(
          forms.welcomeMessage,
          'The owner-authored description must render unchanged',
        ).toContainText('Tell us about your experience so we can serve you better.');
        steps.push('Verified the owner content is unchanged and correctly encoded');

        const start = forms.startButtonNamed(localeCase.startLabel);
        await expect(start, `Microsoft Forms should translate the Start button for ${localeCase.locale}`).toBeVisible();
        await expect(
          forms.privacyNoticeMatching(localeCase.privacyFragment),
          'The privacy notice should be translated',
        ).toBeVisible();
        steps.push(`Verified translated chrome: "${localeCase.startLabel}" plus the local privacy notice`);

        const text = await bodyText(page);
        expect(text, 'The copy must not contain UTF-8 replacement characters').not.toContain('\uFFFD');
        expect(text, 'The copy must not contain mojibake markers').not.toMatch(/Ã[\u0080-\u00BF]|â€|ï¿½/);
        steps.push('Verified the copy contains no replacement characters or mojibake');

        await start.click();
        await expect(forms.progress, 'The survey should start').toBeVisible();
        await expect(forms.question(LIVE_Q.fullName), 'Page 1 should render in every locale').toBeVisible();
        steps.push('Started the survey and confirmed Page 1 renders');

        await forms.fillText(LIVE_Q.fullName, UNICODE_NAME);
        await forms.fillText(LIVE_Q.company, UNICODE_COMPANY);
        await expect(
          forms.question(LIVE_Q.fullName).locator('[data-automation-id="textInput"]'),
          'A Unicode name must round-trip without corruption',
        ).toHaveValue(UNICODE_NAME);
        await expect(
          forms.question(LIVE_Q.company).locator('[data-automation-id="textInput"]'),
          'A Unicode company must round-trip without corruption',
        ).toHaveValue(UNICODE_COMPANY);
        steps.push('Entered a Unicode name and company and verified both values round-trip');

        workflow(`TC-035 - ${localeCase.locale} localisation and encoding`, steps);
      } finally {
        await context.close();
      }
    });
  });
}
