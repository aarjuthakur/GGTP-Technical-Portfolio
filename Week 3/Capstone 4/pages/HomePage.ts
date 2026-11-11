// ABOUTME: HomePage object models the main landing page of automationexercise.com.
// ABOUTME: Handles navigation, product search, and main page interactions.

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Selectors
  readonly signupLoginBtn = 'a[href="/login"]';
  readonly logoutBtn = 'a[href="/logout"]';
  readonly cartBtn = 'a[href="/view_cart"]';
  readonly contactUsBtn = 'a[href="/contact_us"]';
  readonly searchInput = '#search_product';
  readonly searchBtn = '#submit_search';
  readonly productsList = '.productinfo';
  readonly viewProductBtn = (productIndex: number) => `.productinfo:nth-child(${productIndex}) a[href*="/product/"]`;

  constructor(page: Page) {
    super(page);
  }

  async openSignupLogin(): Promise<void> {
    await this.click(this.signupLoginBtn);
  }

  async logout(): Promise<void> {
    await this.click(this.logoutBtn);
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartBtn);
  }

  async goToContactUs(): Promise<void> {
    await this.click(this.contactUsBtn);
  }

  async searchProduct(productName: string): Promise<void> {
    await this.fillInput(this.searchInput, productName);
    await this.click(this.searchBtn);
    await this.waitForLoad();
  }

  async viewProduct(index: number = 1): Promise<void> {
    await this.click(this.viewProductBtn(index));
  }

  async isSignupLoginVisible(): Promise<boolean> {
    return await this.isElementVisible(this.signupLoginBtn);
  }

  async isLogoutVisible(): Promise<boolean> {
    return await this.isElementVisible(this.logoutBtn);
  }

  async isCartVisible(): Promise<boolean> {
    return await this.isElementVisible(this.cartBtn);
  }
}
