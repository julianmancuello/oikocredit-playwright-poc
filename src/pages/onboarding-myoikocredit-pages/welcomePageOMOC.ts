import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"

export class WelcomePageOMOC extends BasePage {

  private readonly getStartedButton: Locator

  constructor(page: Page){
    super(page)
    this.getStartedButton = page.locator('button.slds--next-button')
  }

  async clickGetStarted(){
    await this.getStartedButton.click()
  }
}