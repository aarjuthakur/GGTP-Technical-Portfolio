import { Page, Locator } from '@playwright/test';
import { expectVisible, readRankingOrder } from '../utils/helpers';

// Page 3 - Satisfaction branch (condition depends on the Page 2 rating). */
export class PageSatisfactionBranch {
  constructor(private readonly page: Page) {}

  get section(): Locator {
    return this.page.getByTestId('page-3');
  }

  get positiveBranch(): Locator {
    return this.page.getByTestId('branch-positive');
  }

  get improvementBranch(): Locator {
    return this.page.getByTestId('branch-improvement');
  }

  get likesInput(): Locator {
    return this.page.getByTestId('q9-likes');
  }

  get bestFeatureSelect(): Locator {
    return this.page.getByTestId('q10-best-feature');
  }

  get purchaseDateInput(): Locator {
    return this.page.getByTestId('q11-purchase-date');
  }

  get whyNotInput(): Locator {
    return this.page.getByTestId('q9b-why-not');
  }

  get improveRanking(): Locator {
    return this.page.getByTestId('q10b-improve');
  }

  get contactTimeInput(): Locator {
    return this.page.getByTestId('q11b-contact-time');
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
    await expectVisible(this.section, 'Page 3 (Satisfaction branch) should be visible');
  }

  async fillPositive(data: { likes: string; bestFeature: string; purchaseDate: string }): Promise<void> {
    await this.likesInput.fill(data.likes);
    await this.bestFeatureSelect.selectOption(data.bestFeature);
    await this.purchaseDateInput.fill(data.purchaseDate);
  }

  async fillImprovement(data: { whyNot: string; contactTime: string }): Promise<void> {
    await this.whyNotInput.fill(data.whyNot);
    await this.contactTimeInput.fill(data.contactTime);
  }

  getImprovementOrder(): Promise<string[]> {
    return readRankingOrder(this.improveRanking);
  }
}
