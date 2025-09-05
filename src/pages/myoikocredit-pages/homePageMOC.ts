import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"

export class HomePageMOC extends BasePage {

  private readonly moreButton: Locator

  constructor(page: Page){
    super(page)
    this.moreButton = page.locator('.investment-card__next-button')
  }

  async navigateTo(destination: string): Promise<void> {
    switch (destination) {
      case "Transactions Page - MOC":
        return await this.clickMore()
      default:
        return super.navigateTo(destination)
    }
  }

  async clickMore(){
    await this.moreButton.click()
  }
}