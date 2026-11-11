// ABOUTME: ProductPage object models individual product details and add-to-cart functionality.
// ABOUTME: Handles product information, quantity selection, and cart operations.

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Product details
  readonly productName = 'h2';
  readonly productPrice = '.product-information h2:nth-of-type(2)';
  readonly productRating = '.review-tab .fa-star.orange';
  readonly reviewsCount = '.review-tab span';
  readonly availability = '.product-information p:nth-child(6)';

  // Add to cart
  readonly quantityInput = '#quantity';
  readonly addToCartBtn = 'button.cart:has-text("Add to cart")';
  readonly addedToCartMsg = 'div.modal-header:has-text("Added!")';

  // Continue shopping
  readonly continueShoppingBtn = 'button:has-text("Continue Shopping")';

  constructor(page: Page) {
    super(page);
  }

  async getProductName(): Promise<string> {
    return await this.getText(this.productName);
  }

  async getProductPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  async getRating(): Promise<string> {
    const ratingElement = await this.page.locator(this.productRating);
    const count = await ratingElement.count();
    return count.toString();
  }

  async isAvailable(): Promise<string> {
    return await this.getText(this.availability);
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.fillInput(this.quantityInput, quantity.toString());
  }

  async addToCart(): Promise<void> {
    await this.click(this.addToCartBtn);
    await this.page.waitForSelector(this.addedToCartMsg, { timeout: 5000 });
  }

  async continueShoppingAfterAdd(): Promise<void> {
    await this.click(this.continueShoppingBtn);
    await this.waitForLoad();
  }

  async isAddedToCartMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.addedToCartMsg);
  }
}
