import { Page, Locator } from '@playwright/test';
import { expectVisible } from '../utils/helpers';

// Page 4 - Detailed feedback branch (condition depends on the Page 2 NPS score). */
export class PageDetailedFeedback {
  constructor(private readonly page: Page) {}

  get section(): Locator {
    return this.page.getByTestId('page-4');
  }

  get promoterBranch(): Locator {
    return this.page.getByTestId('branch-promoter');
  }

  get passiveBranch(): Locator {
    return this.page.getByTestId('branch-passive');
  }

  get detractorBranch(): Locator {
    return this.page.getByTestId('branch-detractor');
  }

  caseStudyOption(value: 'Yes' | 'No'): Locator {
    return this.page.getByTestId(`q12-case-study-${value.toLowerCase()}`);
  }

  get makeTenInput(): Locator {
    return this.page.getByTestId('q12b-make-ten');
  }

  get uploadInput(): Locator {
    return this.page.getByTestId('q12c-upload');
  }

  get issueDetailsInput(): Locator {
    return this.page.getByTestId('q12d-issue');
  }

  error(qid: string): Locator {
    return this.page.getByTestId(`error-${qid}`);
  }

  async expectVisible(): Promise<void> {
    await expectVisible(this.section, 'Page 4 (Detailed feedback) should be visible');
  }

  async selectCaseStudy(value: 'Yes' | 'No'): Promise<void> {
    await this.caseStudyOption(value).click();
  }

  async fillPassive(suggestion: string): Promise<void> {
    await this.makeTenInput.fill(suggestion);
  }

  async fillDetractor(details: string): Promise<void> {
    await this.issueDetailsInput.fill(details);
  }
}
