import { Locator, Page, expect } from "@playwright/test"

export class BasePage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async waitForContentUpdate(locator: Locator, expectedValue: string, timeout: number = 10000, interval: number = 100, contains: boolean = false) {
    const startTime = Date.now()

    while (Date.now() - startTime < timeout) {
      const currentValue = await locator.innerText()
      if ((contains && currentValue.includes(expectedValue)) || (!contains && currentValue === expectedValue)) {
        return
      }
      await new Promise(resolve => setTimeout(resolve, interval))
    }
    throw new Error(`Timed out after ${timeout}ms waiting for content to ${contains ? 'contain' : 'match'}: "${expectedValue}"`)
  }

  async waitForContentPresence(locator: Locator, mode: 'text' | 'number', timeout: number = 10000, interval: number = 100) {
    const patterns = {
      text: /\S+/,
      number: /\d+/
    }

    const pattern = patterns[mode];
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const currentValue = await locator.innerText()
      if (pattern.test(currentValue)) {
        return
      }
      await new Promise(resolve => setTimeout(resolve, interval))
    }
    throw new Error(`Timed out after ${timeout}ms waiting for ${mode} content`)
  }

  async verifyElementsAreVisible(locators: Locator[]): Promise<void> {
    for (const locator of locators) {
      await locator.first().waitFor({ state: 'visible' });
      const count = await locator.count()
      for (let i = 0; i < count; i++) {
        await expect(locator.nth(i)).toBeVisible()
      }
    }
  }
}