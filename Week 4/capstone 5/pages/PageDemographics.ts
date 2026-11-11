import { Page, Locator } from '@playwright/test';
import { expectVisible } from '../utils/helpers';

export interface Demographics {
  name: string;
  email: string;
  company: string;
  employees: string;
}

export class PageDemographics {
  constructor(private readonly page: Page) {}

  get section(): Locator {
    return this.page.getByTestId('page-1');
  }

  get welcomeMessage(): Locator {
    return this.page.getByTestId('welcome-message');
  }

  get nameInput(): Locator {
    return this.page.getByTestId('q1-name');
  }

  get emailInput(): Locator {
    return this.page.getByTestId('q2-email');
  }

  get companyInput(): Locator {
    return this.page.getByTestId('q3-company');
  }

  get employeesInput(): Locator {
    return this.page.getByTestId('q4-employees');
  }

  error(qid: string): Locator {
    return this.page.getByTestId(`error-${qid}`);
  }

  fieldInput(field: 'name' | 'company'): Locator {
    return field === 'name' ? this.nameInput : this.companyInput;
  }

  async setValueBypassingMaxlength(field: 'name' | 'company', value: string): Promise<void> {
    await this.fieldInput(field).evaluate((element, next) => {
      (element as HTMLInputElement).value = next;
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }, value);
  }

  async expectVisible(): Promise<void> {
    await expectVisible(this.section, 'Page 1 (Demographics) should be visible');
    await expectVisible(this.welcomeMessage, 'Welcome message should be visible on Page 1');
  }

  async fill(data: Demographics): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.companyInput.fill(data.company);
    await this.employeesInput.fill(data.employees);
  }

  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }
}
