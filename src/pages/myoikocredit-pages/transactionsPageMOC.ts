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

  constructor(page: Page) {
    super(page)
    this.buyButton = page.getByTitle('Purchase Shares')
    this.redeemButton = page.getByTitle('Redeem Shares')
    this.transactionAmountField = page.locator('input[name="Amount"]')
    this.nextButton = page.locator('button[kx-scope="button-brand"]')
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
}