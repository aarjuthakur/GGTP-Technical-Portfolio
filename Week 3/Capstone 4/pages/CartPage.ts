// CartPage object models the shopping cart view and operations.
// Handles product list in cart, quantity modification, removal, and checkout.

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Cart table
  readonly cartTable = 'table#cart_info_table';
  readonly cartRows = 'table#cart_info_table tbody tr';
  readonly emptyCartMsg = 'b:has-text("Cart is empty!")';

  // Product row elements
  readonly productNameInCart = (index: number) => `table#cart_info_table tbody tr:nth-child(${index}) td:nth-child(2)`;
  readonly productPriceInCart = (index: number) => `table#cart_info_table tbody tr:nth-child(${index}) td:nth-child(3)`;
  readonly quantityInCart = (index: number) => `table#cart_info_table tbody tr:nth-child(${index}) td:nth-child(4)`;
  readonly totalPriceInCart = (index: number) => `table#cart_info_table tbody tr:nth-child(${index}) td:nth-child(5)`;
  readonly removeBtn = (index: number) => `table#cart_info_table tbody tr:nth-child(${index}) a.cart_quantity_delete`;

  // Checkout
  readonly proceedToCheckoutBtn = 'a[href="/checkout"]';
  readonly registeredCheckoutBtn = 'a[href="/checkout"]';

  constructor(page: Page) {
    super(page);
  }

  async getCartItemCount(): Promise<number> {
    const rows = await this.page.locator(this.cartRows);
    return await rows.count();
  }

  async getProductNameInCart(index: number): Promise<string> {
    return await this.getText(this.productNameInCart(index));
  }

  async getProductPriceInCart(index: number): Promise<string> {
    return await this.getText(this.productPriceInCart(index));
  }

  async getQuantityInCart(index: number): Promise<string> {
    return await this.getText(this.quantityInCart(index));
  }

  async getTotalPriceInCart(index: number): Promise<string> {
    return await this.getText(this.totalPriceInCart(index));
  }

  async removeProduct(index: number): Promise<void> {
    await this.click(this.removeBtn(index));
    await this.waitForLoad();
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(this.proceedToCheckoutBtn);
    await this.waitForLoad();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.isElementVisible(this.emptyCartMsg);
  }

  async isCheckoutButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.proceedToCheckoutBtn);
  }
}
