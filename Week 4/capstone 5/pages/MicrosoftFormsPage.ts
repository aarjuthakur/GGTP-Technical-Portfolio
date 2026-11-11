import { Locator, Page, expect } from '@playwright/test';
import { LIVE_FORM, LIVE_Q } from '../config/liveForm';


export class MicrosoftFormsPage {
  constructor(readonly page: Page) {}

  // ---------------------------------------------------------------- cover page

  get formTitle(): Locator {
    return this.page.getByRole('heading', { level: 1 }).first();
  }

  get welcomeMessage(): Locator {
    return this.page
      .getByText('Tell us about your experience so we can serve you better.')
      .filter({ visible: true })
      .first();
  }

  get privacyNotice(): Locator {
    return this.page
      .getByText(/The data you submit will be sent to the form owner/)
      .filter({ visible: true })
      .first();
  }

  privacyNoticeMatching(fragment: RegExp): Locator {
    return this.page.getByText(fragment).filter({ visible: true }).first();
  }

  get startButton(): Locator {
    return this.page.getByRole('button', { name: 'Start now' });
  }

  startButtonNamed(label: string): Locator {
    return this.page.getByRole('button', { name: label });
  }

  // ---------------------------------------------------------------- navigation

  get nextButton(): Locator {
    return this.page.locator('button[data-automation-id="nextButton"]');
  }

  get backButton(): Locator {
    return this.page.locator('button[data-automation-id="backButton"], button:has-text("Back")').first();
  }

  get submitButton(): Locator {
    return this.page.locator('button[data-automation-id="submitButton"], button:has-text("Submit")').first();
  }

  // Visible "Page N of 6" indicator (localised by Microsoft Forms). */
  get progress(): Locator {
    return this.page.getByRole('progressbar').first();
  }

  get errorMessages(): Locator {
    return this.page.locator('[role=alert]');
  }

  // ---------------------------------------------------------------- questions

  question(title: string): Locator {
    return this.page
      .locator('[data-automation-id="questionItem"]')
      .filter({ hasText: title })
      .first();
  }

  async visibleQuestions(): Promise<string[]> {
    const titles = this.page.locator('[data-automation-id="questionTitle"]');
    const count = await titles.count();
    const out: string[] = [];
    for (let i = 0; i < count; i += 1) {
      out.push((await titles.nth(i).innerText()).replace(/^\d+\.\s*/, '').trim());
    }
    return out;
  }

  section(name: string): Locator {
    return this.page.getByText(name, { exact: true }).first();
  }

  // ---------------------------------------------------------------- answer helpers

  async fillText(title: string, value: string): Promise<void> {
    await this.question(title).locator('[data-automation-id="textInput"]').fill(value);
  }

  async selectChoice(title: string, index: number): Promise<void> {
    await this.question(title).locator('input[type=radio]').nth(index).click();
  }

  async selectCheckbox(title: string, index: number): Promise<void> {
    await this.question(title).locator('input[type=checkbox]').nth(index).click();
  }

  async selectOption(title: string, label: string): Promise<void> {
    const trigger = this.question(title).locator('[aria-haspopup]');
    if ((await trigger.getAttribute('aria-expanded')) !== 'true') {
      await trigger.click();
    }
    await expect(trigger, `Dropdown for "${title}" should open`).toHaveAttribute('aria-expanded', 'true');

    const options = this.page.locator('[role=option]');
    const total = await options.count();
    for (let i = 0; i < total; i += 1) {
      const option = options.nth(i);
      const isRankingEntry = await option.evaluate(
        (node) => node.closest('[data-automation-id="questionItem"]') !== null,
      );
      if (isRankingEntry) {
        continue;
      }
      const text = (await option.innerText()).trim();
      if (text === label) {
        await option.click();
        return;
      }
    }
    throw new Error(`Option "${label}" not found for "${title}" (${total} options rendered)`);
  }

  async selectRating(title: string, stars: number): Promise<void> {
    await this.question(title).locator(`[aria-label="${stars} Star"]`).click();
  }

  async selectNps(title: string, score: number): Promise<void> {
    await this.question(title)
      .getByText(String(score), { exact: true })
      .filter({ visible: true })
      .first()
      .click();
  }

  async fillDate(title: string, date: string): Promise<void> {
    // The date control hydrates shortly after the rest of the page; filling too early targets an
    // inert text input and silently drops the value.
    const input = this.question(title).locator('input[role=combobox]');
    await input.waitFor({ state: 'visible' });
    await input.fill(date);
  }

  async moveRanking(title: string, movesDown = 1): Promise<void> {
    const options = this.question(title).locator('[role=option]');
    await options.first().dragTo(options.nth(movesDown));
  }

  async rankingOrder(title: string): Promise<string[]> {
    const texts = await this.question(title).locator('[role=option]').allInnerTexts();
    return texts.map((text) => text.replace(/\s+/g, ' ').trim().replace(/^\d+\s+/, ''));
  }

  async selectLikert(title: string, row: number, value: number): Promise<void> {
    await this.question(title).locator('input[type=radio]').nth(row * 5 + (value - 1)).click();
  }

  // ---------------------------------------------------------------- journeys

  async open(url: string): Promise<void> {
    await this.page.goto(url);
    await expect(this.formTitle, 'The published form should render its title').toBeVisible();
  }

  async openAndStart(url: string): Promise<void> {
    await this.open(url);
    await expect(this.startButton, 'Cover page should offer "Start now"').toBeVisible();
    await this.startButton.click();
    await expect(this.progress, 'The form should report its page count').toContainText('Page 1 of');
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

  async nextExpecting(title: string): Promise<void> {
    await this.next();
    await expect(this.question(title), `After Next, "${title}" should be shown`).toBeVisible();
  }

  async completePageOne(data: { name: string; email: string; company: string; employees: string }): Promise<void> {
    await this.fillText(LIVE_Q.fullName, data.name);
    await this.fillText(LIVE_Q.email, data.email);
    await this.fillText(LIVE_Q.company, data.company);
    await this.fillText(LIVE_Q.employees, data.employees);
  }

  async startPageOne(
    url: string,
    data: { name: string; email: string; company: string; employees: string },
  ): Promise<void> {
    await this.openAndStart(url);
    await this.completePageOne(data);
  }

  async reachPageTwo(
    url: string,
    data: { name: string; email: string; company: string; employees: string },
  ): Promise<void> {
    await this.startPageOne(url, data);
    await this.next();
    await expect(this.question(LIVE_Q.source), 'Page 2 should show "How did you hear about us?"').toBeVisible();
  }

  // ------------------------------------------------- Page 2 to Page 6 journeys

  async completePageTwo(data: PageTwoData): Promise<void> {
    await this.selectChoice(LIVE_Q.source, data.sourceIndex);
    for (const index of data.featureIndexes) {
      await this.selectCheckbox(LIVE_Q.features, index);
    }
    await this.selectOption(LIVE_Q.segment, data.segment);
    await this.fillDate(LIVE_Q.customerSince, data.customerSince);
    await this.selectRating(LIVE_Q.rating, data.rating);
    await this.selectNps(LIVE_Q.nps, data.nps);
    await this.selectChoice(LIVE_Q.satisfaction, data.satisfactionIndex);
  }

  async reachBranch(
    url: string,
    user: { name: string; email: string; company: string; employees: string },
    pageTwo: PageTwoData,
  ): Promise<void> {
    await this.reachPageTwo(url, user);
    await this.completePageTwo(pageTwo);
    await this.next();
  }

  async completePageThree(data: PageThreeData): Promise<void> {
    await this.fillText(LIVE_Q.likes, data.likes);
    await this.selectOption(LIVE_Q.bestFeature, data.bestFeature);
    await this.fillText(LIVE_Q.startedUsing, data.startedUsing);
    await this.next();
  }

  async completePageFour(data: PageFourData): Promise<void> {
    await this.fillText(LIVE_Q.whyNot, data.whyNot);
    await this.moveRanking(LIVE_Q.improveRank, data.improveFirst);
    await this.selectOption(LIVE_Q.contactTimePositive, data.contactTime);
    await this.next();
  }

  async completePageFive(recommendationIndex: number): Promise<void> {
    await this.selectChoice(LIVE_Q.recommendColleague, recommendationIndex);
    await expect(
      this.question(LIVE_Q.issue).or(this.question(LIVE_Q.caseStudy)),
      'The Recommendation page should reveal a follow-up question',
    ).toBeVisible();
    if (await this.question(LIVE_Q.makeTen).isVisible()) {
      await this.fillText(LIVE_Q.makeTen, 'Nothing - the product already meets my needs.');
    }
    if (await this.question(LIVE_Q.issue).isVisible()) {
      await this.fillText(LIVE_Q.issue, 'No issue to report.');
    }
    if (await this.question(LIVE_Q.caseStudy).isVisible()) {
      await this.selectChoice(LIVE_Q.caseStudy, 0);
    }
    await this.next();
  }

  async completePageSix(data: PageSixData): Promise<void> {
    for (let row = 0; row < data.likert.length; row += 1) {
      await this.selectLikert(LIVE_Q.likert, row, data.likert[row]);
    }
    await this.moveRanking(LIVE_Q.channelRank, data.channelFirst);
    await this.selectChoice(LIVE_Q.followUp, data.followUpIndex);
    if (data.followUpIndex === 0) {
      await expect(this.question(LIVE_Q.contactMethod), 'Yes should reveal the contact block').toBeVisible();
      await this.selectOption(LIVE_Q.contactMethod, data.contactMethod ?? 'Email');
      await this.selectOption(LIVE_Q.contactTime, data.contactTime ?? '10:00-12:00');
    }
    await this.submit();
  }

  get thankYouMessage(): Locator {
    return this.page.getByText('Your response was submitted.');
  }

  async captureAllResponses(): Promise<Record<string, string | string[]>> {
    return this.page.evaluate(() => {
      const data: Record<string, string | string[]> = {};
      document.querySelectorAll('[data-automation-id="questionItem"]').forEach((q) => {
        const titleEl = q.querySelector('[data-automation-id="questionTitle"]');
        if (!titleEl) return;
        const title = titleEl.textContent?.replace(/^\d+\.\s*/, '').trim() || '';

        const textInput = q.querySelector<HTMLInputElement>('[data-automation-id="textInput"]');
        if (textInput?.value) { data[title] = textInput.value; return; }

        const radios = q.querySelectorAll<HTMLInputElement>('input[type=radio]:checked');
        if (radios.length) {
          const label = radios[0].closest('label')?.textContent?.trim()
            || radios[0].parentElement?.textContent?.trim() || radios[0].value;
          data[title] = label; return;
        }

        const checks = q.querySelectorAll<HTMLInputElement>('input[type=checkbox]:checked');
        if (checks.length) {
          const vals: string[] = [];
          checks.forEach((cb) => {
            vals.push(cb.closest('label')?.textContent?.trim()
              || cb.parentElement?.textContent?.trim() || cb.value);
          });
          data[title] = vals; return;
        }

        const selected = q.querySelector('[aria-selected="true"], .selected, [aria-pressed="true"]');
        if (selected) { data[title] = selected.textContent?.trim() || ''; return; }

        const combo = q.querySelector<HTMLInputElement>('input[role=combobox]');
        if (combo?.value) { data[title] = combo.value; return; }
      });
      return data;
    });
  }
}

export interface PageTwoData {
  sourceIndex: number;
  featureIndexes: number[];
  segment: string;
  customerSince: string;
  rating: number;
  nps: number;
  satisfactionIndex: number;
}

export interface PageThreeData {
  likes: string;
  bestFeature: string;
  startedUsing: string;
}

export interface PageFourData {
  whyNot: string;
  improveFirst: number;
  contactTime: string;
}

export interface PageSixData {
  likert: number[];
  channelFirst: number;
  followUpIndex: number;
  contactMethod?: string;
  contactTime?: string;
}
