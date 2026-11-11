import { Page, Locator } from '@playwright/test';
import { expectVisible, slug } from '../utils/helpers';

// Page 2 - Product Usage. */
export class PageProductUsage {
  constructor(private readonly page: Page) {}

  get section(): Locator {
    return this.page.getByTestId('page-2');
  }

  get sourceGroup(): Locator {
    return this.page.getByTestId('q5-source');
  }

  sourceOption(label: string): Locator {
    return this.page.getByTestId(`q5-source-${slug(label)}`);
  }

  featureCheckbox(label: string): Locator {
    return this.page.getByTestId(`q6-feature-${slug(label)}`);
  }

  ratingStar(value: number): Locator {
    return this.page.getByTestId(`q7-star-${value}`);
  }

  npsButton(value: number): Locator {
    return this.page.getByTestId(`q8-nps-${value}`);
  }

  error(qid: string): Locator {
    return this.page.getByTestId(`error-${qid}`);
  }

  async expectVisible(): Promise<void> {
    await expectVisible(this.section, 'Page 2 (Product Usage) should be visible');
  }

  async selectSource(label: string): Promise<void> {
    await this.sourceOption(label).click();
  }

  async selectFeature(label: string): Promise<void> {
    await this.featureCheckbox(label).click();
  }

  async selectRating(value: number): Promise<void> {
    await this.ratingStar(value).click();
  }

  async selectNps(value: number): Promise<void> {
    await this.npsButton(value).click();
  }

  async selectedRating(): Promise<string> {
    return (
      (await this.section.locator('[data-testid="q7-rating"] .star.selected').getAttribute('data-value')) ?? ''
    );
  }

  async selectedNps(): Promise<string> {
    return (
      (await this.section.locator('[data-testid="q8-nps"] button.selected').getAttribute('data-value')) ?? ''
    );
  }

  async npsValues(): Promise<string[]> {
    return this.page
      .locator('[data-testid="q8-nps"] button')
      .evaluateAll((buttons) => buttons.map((button) => (button as HTMLElement).dataset.value ?? ''));
  }
}
