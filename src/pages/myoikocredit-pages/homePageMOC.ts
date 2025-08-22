import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"

export class HomePageMOC extends BasePage {

  private readonly buySellDividendsButton: Locator

  constructor(page: Page){
    super(page)
    this.buySellDividendsButton = page.locator('div.slds-clearfix a.linkURL[href]')
  }

  getEssentialElements(): Locator[] {
    console.log("No essential elements were defined")
    return []
  }

  async navigateTo(destination: string): Promise<void> {
    switch (destination) {
      case "Transaction Page - MOC":
        return await this.clickBuySellDividendsAndMore()
      default:
        return super.navigateTo(destination)
    }
  }

  async clickBuySellDividendsAndMore(){
    await this.buySellDividendsButton.click()
  }
}