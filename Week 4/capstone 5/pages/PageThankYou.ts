import { Page, Locator } from '@playwright/test';
import { expectVisible } from '../utils/helpers';

// Page 6 - Thank you & summary. */
export class PageThankYou {
  constructor(private readonly page: Page) {}

  get section(): Locator {
    return this.page.getByTestId('page-6');
  }

  get message(): Locator {
    return this.page.getByTestId('thank-you-message');
  }

  get contactMessage(): Locator {
    return this.page.getByTestId('thank-you-contact');
  }

  get feedbackMessage(): Locator {
    return this.page.getByTestId('thank-you-feedback');
  }

  get summaryList(): Locator {
    return this.page.getByTestId('thank-you-summary');
  }

  get statusMessage(): Locator {
    return this.page.getByTestId('status-message');
  }

  async expectVisible(): Promise<void> {
    await expectVisible(this.section, 'Page 6 (Thank you) should be visible');
    await expectVisible(this.message, 'Personalised thank-you message should be visible');
  }

  getSummaryEntry(label: string): Locator {
    return this.summaryList.locator('li', { hasText: `${label}:` });
  }
}
