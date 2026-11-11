import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class ScreenshotCapture {
  private evidencePath = 'evidences';

  constructor() {
    if (!fs.existsSync(this.evidencePath)) {
      fs.mkdirSync(this.evidencePath, { recursive: true });
    }
  }

  async captureFullPage(page: Page, testName: string, stepName: string): Promise<string> {
    const timestamp = this.getTimestamp();
    const fileName = `${testName}_${stepName}_${timestamp}.png`;
    const filePath = path.join(this.evidencePath, fileName);

    try {
      await page.screenshot({
        path: filePath,
        fullPage: true,
        timeout: 15000
      });
      console.log(`Screenshot captured: ${fileName}`);
    } catch {
      console.log(`Screenshot skipped (timeout): ${fileName}`);
    }
    return filePath;
  }

  async captureElement(page: Page, selector: string, testName: string, stepName: string): Promise<string> {
    const timestamp = this.getTimestamp();
    const fileName = `${testName}_${stepName}_element_${timestamp}.png`;
    const filePath = path.join(this.evidencePath, fileName);

    try {
      const element = page.locator(selector).first();
      await element.screenshot({ path: filePath });
      console.log(`Element screenshot captured: ${fileName}`);
    } catch {
      console.log(`Element screenshot skipped (timeout): ${fileName}`);
    }
    return filePath;
  }

  async captureWithAnnotation(page: Page, testName: string, stepName: string, annotationText: string): Promise<string> {
    const filePath = await this.captureFullPage(page, testName, stepName);
    console.log(`   Annotation: ${annotationText}`);
    return filePath;
  }

  private getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  }

  getEvidencePath(): string {
    return this.evidencePath;
  }

  getAllScreenshots(): string[] {
    if (!fs.existsSync(this.evidencePath)) {
      return [];
    }
    return fs.readdirSync(this.evidencePath).filter(file => file.endsWith('.png'));
  }
}

export async function captureTestEvidence(page: Page, testId: string, stepName: string): Promise<void> {
  const capture = new ScreenshotCapture();
  await capture.captureFullPage(page, testId, stepName);
}
