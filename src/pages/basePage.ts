import { Locator, Page, expect } from "@playwright/test"

export class BasePage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  getEssentialElements(): Locator[] {
    return []
  }

  async navigateTo(destination: string): Promise<void> {
    throw new Error(`${this.constructor.name} does not implement navigation to "${destination}"`)
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

  async verifyPageElementsAreVisible(): Promise<void> {
    const elements = this.getEssentialElements()
    for (const element of elements) {
      await element.first().waitFor({ state: 'visible' });
      const count = await element.count()
      for (let i = 0; i < count; i++) {
        await expect(element.nth(i)).toBeVisible()
      }
    }
  }
}