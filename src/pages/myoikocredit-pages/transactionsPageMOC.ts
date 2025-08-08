import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { utils } from "../../utils/utils"
import { ContextStore as cs } from "../../utils/contextStore"

export type Transaction = "Purchase" | "Redeem"

export class TransactionsPageMOC extends BasePage {

  private readonly buyButton: Locator
  private readonly redeemButton: Locator
  private readonly transactionAmountField: Locator
  private readonly nextButton: Locator
  private readonly confirmAmount: Locator

  constructor(page: Page) {
    super(page)
    this.buyButton = page.getByTitle('Purchase Shares')
    this.redeemButton = page.getByTitle('Redeem Shares')
    this.transactionAmountField = page.locator('input[name="Amount"]')
    this.nextButton = page.locator('button[kx-scope="button-brand"]')
    this.confirmAmount = page.locator('//p[.//strong[contains(text(), "Betrag:")]]/span')
  }

  async selectTransaction(transaction: Transaction) {
    switch (transaction) {
      case "Purchase":
        await this.buyButton.click()
        break
      case "Redeem":
        await this.redeemButton.click()
        break
    }
  }

  async fillInAmountWithRandomNumber() {
    const amount = utils.generateRandomIntegerBetween(500, 1000)
    cs.put("transactionAmount", amount)
    await this.transactionAmountField.fill(amount.toString())
    await this.nextButton.click()
  }

  async getAmountInConfirmRequest(){
    await this.confirmAmount.first().waitFor({ state: 'visible' })
    const currency = (await this.confirmAmount.nth(0).textContent())?.trim()
    const amount = (await this.confirmAmount.nth(1).textContent())?.trim()
    return `${currency} ${amount}`
  }
}