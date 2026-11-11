import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly reviewOrderTable = 'table#cart_info_table';
  readonly addressRadio = 'input[value="new"]';
  readonly firstName = 'input[data-qa="first-name"]';
  readonly lastName = 'input[data-qa="last-name"]';
  readonly company = 'input[data-qa="company"]';
  readonly address1 = 'input[data-qa="address"]';
  readonly country = 'select[data-qa="country"]';
  readonly state = 'input[data-qa="state"]';
  readonly city = 'input[data-qa="city"]';
  readonly zipcode = 'input[data-qa="zipcode"]';
  readonly mobileNumber = 'input[data-qa="mobile-number"]';
  readonly commentBox = 'textarea[name="comment"]';
  readonly placeOrderBtn = 'a[data-qa="place-order"]';

  constructor(page: Page) {
    super(page);
  }

  async fillShippingAddress(address: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }): Promise<void> {
    await this.fillInput(this.firstName, address.firstName);
    await this.fillInput(this.lastName, address.lastName);
    await this.fillInput(this.company, address.company);
    await this.fillInput(this.address1, address.address1);
    await this.page.selectOption(this.country, address.country);
    await this.fillInput(this.state, address.state);
    await this.fillInput(this.city, address.city);
    await this.fillInput(this.zipcode, address.zipcode);
    await this.fillInput(this.mobileNumber, address.mobileNumber);
  }

  async addComment(comment: string): Promise<void> {
    await this.fillInput(this.commentBox, comment);
  }

  async placeOrder(): Promise<void> {
    await this.click(this.placeOrderBtn);
    await this.waitForLoad();
  }

  async isOrderReviewVisible(): Promise<boolean> {
    return await this.isElementVisible(this.reviewOrderTable);
  }
}
