import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { DataFactory as df } from "../../utils/dataFactory"
import { ContextStore as cs } from "../../utils/contextStore"

export type Transaction = "Purchase" | "Redemption"

export class TransactionsPageMOC extends BasePage {

  private readonly buyButton: Locator
  private readonly redeemButton: Locator
  private readonly transactionAmountField: Locator
  private readonly nextButton: Locator
  private readonly confirmAmount: Locator
  private readonly informationOfTransaction: Locator
  private readonly closeButton: Locator
  private readonly firstRowTransactions: Locator

  constructor(page: Page) {
    super(page)
    this.buyButton = page.getByTitle('Purchase Shares')
    this.redeemButton = page.getByTitle('Redeem Shares')
    this.transactionAmountField = page.locator('input[name="Amount"]')
    this.nextButton = page.locator('button[kx-scope="button-brand"]')
    this.confirmAmount = page.locator('//p[.//strong[contains(text(), "Betrag:")]]/span')
    this.informationOfTransaction = page.locator('(//flowruntime-lwc-field)[1]')
    this.closeButton = page.locator('button[title="Close"]')
    this.firstRowTransactions = page.locator('tbody tr[data-row-number="1"]')
  }

  async selectTransaction(transaction: Transaction) {
    switch (transaction) {
      case "Purchase":
        await this.buyButton.click()
        break
      case "Redemption":
        await this.redeemButton.click()
        break
    }
  }

  async fillInAmountWithRandomNumber() {
    const amount = df.generateRandomIntegerBetween(1000, 1500)
    cs.put("transactionAmount", amount)
    await this.transactionAmountField.fill(amount.toString())
    await this.nextButton.click()
  }

  async getAmountInConfirmRequest(){
    const currency = (await this.confirmAmount.nth(0).textContent())?.trim()
    const amount = (await this.confirmAmount.nth(1).textContent())?.trim()
    return `${currency} ${amount}`
  }

  async confirmRequest(){
    await this.nextButton.click()
  }
  
  informationOfTheTransaction(){
    return this.informationOfTransaction
  }

  async closeConfirmation(){
    await this.closeButton.click()
  }

  async getNewTransaction(){
    await this.waitForContentUpdate(this.firstRowTransactions.locator('td[data-label="Betrag"]'), cs.get("expectedAmount"))
    const date = await this.firstRowTransactions.locator('th[data-label="Datum"]').textContent()
    const transactionType = await this.firstRowTransactions.locator('td[data-label="Transaktion"]').textContent()
    const status = await this.firstRowTransactions.locator('td[data-label="Status"]').textContent()
    const amount = await this.firstRowTransactions.locator('td[data-label="Betrag"]').textContent()

    return {
      date: date,
      transactionType: transactionType,
      status: status,
      amount: amount
    }
  }
}