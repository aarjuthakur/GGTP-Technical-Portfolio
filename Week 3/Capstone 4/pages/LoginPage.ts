// ABOUTME: LoginPage object models the login and registration forms.
// ABOUTME: Handles user authentication, signup, and form validations.

import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Login section
  readonly loginEmail = 'input[data-qa="login-email"]';
  readonly loginPassword = 'input[data-qa="login-password"]';
  readonly loginBtn = 'button[data-qa="login-button"]';
  readonly loginErrorMsg = 'p:has-text("Your email or password is incorrect!")';

  // Signup section
  readonly signupName = 'input[data-qa="signup-name"]';
  readonly signupEmail = 'input[data-qa="signup-email"]';
  readonly signupBtn = 'button[data-qa="signup-button"]';
  readonly signupErrorMsg = 'p:has-text("Email Address already exist!")';

  // Account creation form
  readonly genderMale = '#id_gender1';
  readonly password = '#password';
  readonly dayDob = '#days';
  readonly monthDob = '#months';
  readonly yearDob = '#years';
  readonly newsletter = '#newsletter';
  readonly specialOffers = '#optin';
  readonly firstName = '#first_name';
  readonly lastName = '#last_name';
  readonly address = '#address1';
  readonly country = '#country';
  readonly state = '#state';
  readonly city = '#city';
  readonly zipcode = '#zipcode';
  readonly mobileNumber = '#mobile_number';
  readonly createAccountBtn = 'button[data-qa="create-account"]';
  readonly accountCreatedMsg = 'h2[data-qa="account-created"]';

  constructor(page: Page) {
    super(page);
  }

  // Login methods
  async login(email: string, password: string): Promise<void> {
    await this.fillInput(this.loginEmail, email);
    await this.fillInput(this.loginPassword, password);
    await this.click(this.loginBtn);
    await this.waitForLoad();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.fillInput(this.signupName, name);
    await this.fillInput(this.signupEmail, email);
    await this.click(this.signupBtn);
    await this.waitForLoad();
  }

  async fillAccountDetails(data: {
    gender?: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    dayDob?: string;
    monthDob?: string;
    yearDob?: string;
  }): Promise<void> {
    if (data.gender === 'male') {
      await this.click(this.genderMale);
    }
    await this.fillInput(this.password, data.password);
    if (data.dayDob) {
      await this.page.selectOption(this.dayDob, data.dayDob);
    }
    if (data.monthDob) {
      await this.page.selectOption(this.monthDob, data.monthDob);
    }
    if (data.yearDob) {
      await this.page.selectOption(this.yearDob, data.yearDob);
    }
    await this.click(this.newsletter);
    await this.click(this.specialOffers);
    await this.fillInput(this.firstName, data.firstName);
    await this.fillInput(this.lastName, data.lastName);
    await this.fillInput(this.address, data.address);
    await this.page.selectOption(this.country, data.country);
    await this.fillInput(this.state, data.state);
    await this.fillInput(this.city, data.city);
    await this.fillInput(this.zipcode, data.zipcode);
    await this.fillInput(this.mobileNumber, data.mobileNumber);
  }

  async createAccount(): Promise<void> {
    await this.click(this.createAccountBtn);
    await this.waitForLoad();
  }

  async isAccountCreated(): Promise<boolean> {
    return await this.isElementVisible(this.accountCreatedMsg);
  }

  async isLoginErrorVisible(): Promise<boolean> {
    return await this.isElementVisible(this.loginErrorMsg);
  }

  async isSignupErrorVisible(): Promise<boolean> {
    return await this.isElementVisible(this.signupErrorMsg);
  }
}
