import { Page, Locator } from '@playwright/test';
import { PageDemographics, Demographics } from './PageDemographics';
import { PageProductUsage } from './PageProductUsage';
import { PageSatisfactionBranch } from './PageSatisfactionBranch';
import { PageDetailedFeedback } from './PageDetailedFeedback';
import { PagePreferences } from './PagePreferences';
import { PageThankYou } from './PageThankYou';

export class SurveyPage {
  readonly demographics: PageDemographics;
  readonly productUsage: PageProductUsage;
  readonly satisfactionBranch: PageSatisfactionBranch;
  readonly feedback: PageDetailedFeedback;
  readonly preferences: PagePreferences;
  readonly thankYou: PageThankYou;

  constructor(private readonly page: Page) {
    this.demographics = new PageDemographics(page);
    this.productUsage = new PageProductUsage(page);
    this.satisfactionBranch = new PageSatisfactionBranch(page);
    this.feedback = new PageDetailedFeedback(page);
    this.preferences = new PagePreferences(page);
    this.thankYou = new PageThankYou(page);
  }

  get title(): Locator {
    return this.page.getByTestId('form-title');
  }

  get progressText(): Locator {
    return this.page.getByTestId('progress-text');
  }

  get progressBar(): Locator {
    return this.page.getByTestId('progress-bar');
  }

  get nextButton(): Locator {
    return this.page.getByTestId('btn-next');
  }

  get backButton(): Locator {
    return this.page.getByTestId('btn-back');
  }

  get submitButton(): Locator {
    return this.page.getByTestId('btn-submit');
  }

  pageSection(number: number): Locator {
    return this.page.getByTestId(`page-${number}`);
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async next(): Promise<void> {
    await this.nextButton.click();
  }

  async back(): Promise<void> {
    await this.backButton.click();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async currentPageNumber(): Promise<number> {
    const value = await this.page.locator('body').getAttribute('data-current-page');
    return Number(value ?? 0);
  }

  async isSubmitted(): Promise<boolean> {
    const value = await this.page.locator('body').getAttribute('data-submitted');
    return value === 'true';
  }

  async hasHorizontalOverflow(): Promise<boolean> {
    return this.page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  }

  async viewportSize(): Promise<{ width: number; height: number }> {
    return this.page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight }));
  }

  async completeDemographics(data: Demographics): Promise<void> {
    await this.demographics.fill(data);
    await this.next();
  }

  async completeProductUsage(data: {
    source: string;
    features: string[];
    rating: number;
    nps: number;
  }): Promise<void> {
    await this.productUsage.selectSource(data.source);
    for (const feature of data.features) {
      await this.productUsage.selectFeature(feature);
    }
    await this.productUsage.selectRating(data.rating);
    await this.productUsage.selectNps(data.nps);
    await this.next();
  }

  async completeSatisfactionPositive(data: {
    likes: string;
    bestFeature: string;
    purchaseDate: string;
  }): Promise<void> {
    await this.satisfactionBranch.fillPositive(data);
    await this.next();
  }

  async completeSatisfactionImprovement(data: { whyNot: string; contactTime: string }): Promise<void> {
    await this.satisfactionBranch.fillImprovement(data);
    await this.next();
  }

  async completeFeedbackPromoter(caseStudy: 'Yes' | 'No'): Promise<void> {
    await this.feedback.selectCaseStudy(caseStudy);
    await this.next();
  }

  async completeFeedbackPassive(suggestion: string): Promise<void> {
    await this.feedback.fillPassive(suggestion);
    await this.next();
  }

  async completeFeedbackDetractor(details: string): Promise<void> {
    await this.feedback.fillDetractor(details);
    await this.next();
  }
}
