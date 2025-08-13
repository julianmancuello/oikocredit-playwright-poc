import { Locator, Page } from "@playwright/test"

export class BasePage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async waitForContentUpdate(locator: Locator, expectedValue: string, timeout: number = 10000, interval: number = 100) {
    const startTime = Date.now()

    while (Date.now() - startTime < timeout) {
      const currentValue = await locator.innerText()
      if (currentValue === expectedValue) {
        return
      }
      await new Promise(resolve => setTimeout(resolve, interval))
    }
    throw new Error(`Timed out after ${timeout}ms waiting for content to match: "${expectedValue}"`)
  }
}