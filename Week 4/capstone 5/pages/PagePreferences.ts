import { Page, Locator } from '@playwright/test';
import { expectVisible, readRankingOrder } from '../utils/helpers';

// Page 5 - Preferences & follow-up. */
export class PagePreferences {
  constructor(private readonly page: Page) {}

  get section(): Locator {
    return this.page.getByTestId('page-5');
  }

  followUpOption(value: 'Yes' | 'No'): Locator {
    return this.page.getByTestId(`q15-follow-up-${value.toLowerCase()}`);
  }

  get contactBranch(): Locator {
    return this.page.getByTestId('branch-contact');
  }

  get contactMethodSelect(): Locator {
    return this.page.getByTestId('q13-contact-method');
  }

  get contactTimeInput(): Locator {
    return this.page.getByTestId('q14-contact-time');
  }

  get channelRanking(): Locator {
    return this.page.getByTestId('q16-rank-channels');
  }

  likertOption(label: string): Locator {
    return this.page.getByTestId(`q17-likert-${label}`);
  }

  error(qid: string): Locator {
    return this.page.getByTestId(`error-${qid}`);
  }

  rankingItem(testid: string): Locator {
    return this.page.getByTestId(testid);
  }

  moveUp(itemTestId: string): Promise<void> {
    return this.rankingItem(itemTestId).locator('button[data-move="up"]').click();
  }

  moveDown(itemTestId: string): Promise<void> {
    return this.rankingItem(itemTestId).locator('button[data-move="down"]').click();
  }

  async expectVisible(): Promise<void> {
    await expectVisible(this.section, 'Page 5 (Preferences & follow-up) should be visible');
  }

  async selectFollowUp(value: 'Yes' | 'No'): Promise<void> {
    await this.followUpOption(value).click();
  }

  async selectContactMethod(method: string): Promise<void> {
    await this.contactMethodSelect.selectOption(method);
  }

  async fillContactTime(time: string): Promise<void> {
    await this.contactTimeInput.fill(time);
  }

  async selectLikert(label: string): Promise<void> {
    await this.likertOption(label).click();
  }

  getChannelOrder(): Promise<string[]> {
    return readRankingOrder(this.channelRanking);
  }
}
