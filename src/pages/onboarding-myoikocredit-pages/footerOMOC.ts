import { Locator, Page } from "@playwright/test"

export type OptionFooterOMOC = "Back" | "Next"

export class FooterOMOC {

  private readonly page: Page
  private readonly backButton: Locator
  private readonly nextButton: Locator

  constructor(page: Page){
    this.page = page
    this.backButton = page.locator('button.back--button')
    this.nextButton = page.locator('button.slds--next-button')
  }

  async clickOn(option: OptionFooterOMOC) {
    switch (option) {
      case "Back":
        await this.backButton.click()
        break
      case "Next":
        await this.nextButton.click()
        break
    }
  }
}