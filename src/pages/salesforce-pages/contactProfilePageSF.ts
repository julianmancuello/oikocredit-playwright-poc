import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"
import { Transaction } from "../myoikocredit-pages/transactionsPageMOC"

export class ContactProfilePageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly contactName: Locator
  private readonly firstPurchaseEmail: Locator
  private readonly firstRedemptionEmail: Locator

  constructor(page: Page){
    super(page)
    this.menuSF = new HeaderMenuSF(page)
    this.contactName = page.locator('flexipage-field[slot="primaryField"]')
    this.firstPurchaseEmail = page.locator('(//a[@title="Erwerb von Beteiligungen"])[1]')
    this.firstRedemptionEmail = page.locator('(//a[@title="Rücknahme von Beteiligungen"])[1]')
  }

  getEssentialElements(): Locator[] {
    console.log("No essential elements were defined")
    return []
  }

  async getContactName() {
    await this.waitForContentPresence(this.contactName, "text")
    const actualName = await this.contactName.innerText()
    return actualName
  }

  async selectTypeOfEmail(transaction: Transaction) {//TODO: Repetitive method in several classes
    switch (transaction) {
      case "Purchase":
        await this.firstPurchaseEmail.click()
        break
      case "Redemption":
        await this.firstRedemptionEmail.click()
        break
    }
  }
}