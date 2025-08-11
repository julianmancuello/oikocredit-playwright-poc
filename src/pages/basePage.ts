import { Locator, Page } from "@playwright/test"

export class BasePage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async waitForContentUpdate(locator: Locator, expectedValue: string, timeout: number = 10000, interval: number = 100): Promise<boolean> {
    const startTime = Date.now()

    while (Date.now() - startTime < timeout) {
      const currentValue = await locator.innerText()
      if (currentValue === expectedValue) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, interval))
    }
    return false
  }
}