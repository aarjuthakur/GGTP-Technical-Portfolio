import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly successMsg = 'h2[data-qa="order-placed"]';
  readonly orderIdElement = 'p:has-text("Your order has been placed successfully!")';
  readonly downloadInvoiceBtn = 'a[href*="/download_invoice"]';
  readonly continueBtn = 'button[data-qa="continue-button"]';

  constructor(page: Page) {
    super(page);
  }

  async isOrderPlacedSuccessfully(): Promise<boolean> {
    return await this.isElementVisible(this.successMsg);
  }

  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMsg);
  }

  async downloadInvoice(): Promise<void> {
    await this.click(this.downloadInvoiceBtn);
  }

  async continueAfterOrder(): Promise<void> {
    await this.click(this.continueBtn);
    await this.waitForLoad();
  }
}
