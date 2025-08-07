import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"

export class HomePageMOC extends BasePage {

  private readonly buySellDividendsButton: Locator

  constructor(page: Page){
    super(page)
    this.buySellDividendsButton = page.locator('div.slds-clearfix a.linkURL[href]')
  }

  async clickBuySellDividendsAndMore(){
    await this.buySellDividendsButton.click()
  }
}