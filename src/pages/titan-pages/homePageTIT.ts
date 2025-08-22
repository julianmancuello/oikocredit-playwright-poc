import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { Transaction } from "../myoikocredit-pages/transactionsPageMOC"

export class HomePageTIT extends BasePage {

  private readonly purchaseRequests: Locator
  private readonly redemptionRequests: Locator

  constructor(page: Page){
    super(page)
    this.purchaseRequests = page.locator('#ctl00_UsecaseContent_PendingRequests_C_ctl00_lbPurchaseRequests')
    this.redemptionRequests = page.locator('#ctl00_UsecaseContent_PendingRequests_C_ctl00_lbRedemptionRequests')
  }

  getEssentialElements(): Locator[] {
    console.log("No essential elements were defined")
    return []
  }

  async selectTypeOfRequests(transaction: Transaction) {
    switch (transaction) {
      case "Purchase":
        await this.purchaseRequests.click()
        break
      case "Redemption":
        await this.redemptionRequests.click()
        break
    }
  }
}