import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"

export class CheckYourInboxPageOMOC extends BasePage {

  private readonly contactUsButton: Locator

  constructor(page: Page) {
    super(page)
    this.contactUsButton = page.locator('//a[text()="Contact us"]')
  }

  async contactOikocredit() {
    await this.contactUsButton.click()
  }
}