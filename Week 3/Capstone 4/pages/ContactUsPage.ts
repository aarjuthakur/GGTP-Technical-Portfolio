import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  readonly nameInput = 'input[data-qa="name"]';
  readonly emailInput = 'input[data-qa="email"]';
  readonly subjectInput = 'input[data-qa="subject"]';
  readonly messageTextarea = 'textarea[data-qa="message"]';
  readonly submitBtn = 'input[data-qa="submit-button"]';
  readonly successMsg = 'div.alert-success:has-text("Success!")';
  readonly successText = 'span:has-text("Thanks for your message!")';

  constructor(page: Page) {
    super(page);
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.fillInput(this.nameInput, data.name);
    await this.fillInput(this.emailInput, data.email);
    await this.fillInput(this.subjectInput, data.subject);
    await this.fillInput(this.messageTextarea, data.message);
  }

  async submitForm(): Promise<void> {
    await this.click(this.submitBtn);
    await this.page.waitForTimeout(2000);
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.successMsg);
  }

  async getSuccessText(): Promise<string> {
    return await this.getText(this.successText);
  }
}
