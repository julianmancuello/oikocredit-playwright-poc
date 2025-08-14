import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { DataFactory as df } from "../../utils/dataFactory"
import { ContextStore as cs } from "../../utils/contextStore"
import { Utils as utils } from "../../utils/utils"

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
  private readonly transactionRow: Locator

  constructor(page: Page) {
    super(page)
    this.buyButton = page.getByTitle('Purchase Shares')
    this.redeemButton = page.getByTitle('Redeem Shares')
    this.transactionAmountField = page.locator('input[name="Amount"]')
    this.nextButton = page.locator('button[kx-scope="button-brand"]')
    this.confirmAmount = page.locator('//p[.//strong[contains(text(), "Betrag:")]]/span | //p[.//strong[contains(text(), "Verkaufsauftrag:")]]/span')
    this.informationOfTransaction = page.locator('(//flowruntime-lwc-field)[1]')
    this.closeButton = page.locator('button[title="Close"]')
    this.firstRowTransactions = page.locator('tbody tr[data-row-number="1"]')
    this.transactionRow = page.locator('tbody tr')
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

  async fillInAmountWithRandomNumber(transaction: Transaction) {
    const amount = df.generateRandomIntegerBetween(1000, 1500)
    cs.put("transactionAmount", amount)
    const expAmountInConfirmation = `EUR ${utils.applyNumberFormat("European format", amount, 2)}`
    cs.put("expAmountInConfirmation", expAmountInConfirmation)
    if (transaction === "Redemption") {
      await this.nextButton.click()
    }
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
    const expAmountInTransactions = `EUR ${utils.applyNumberFormat("European format", cs.get("transactionAmount"), 0)}`
    cs.put("expAmountInTransactions", expAmountInTransactions)
    await this.waitForContentUpdate(this.firstRowTransactions.locator('td[data-label="Betrag"]'), expAmountInTransactions)
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

  async getTransactionStatus(date: string, transactionType: string, amount: string){
    await this.firstRowTransactions.waitFor({ state: 'visible' })
    const rowCount = await this.transactionRow.count()
    for (let i = 0; i < rowCount; i++) {
      const currentRow = this.transactionRow.nth(i)
      const dateInCol = await currentRow.locator('th[data-label="Datum"]').innerText()
      const transactionTypeInCol = await currentRow.locator('td[data-label="Transaktion"]').innerText()
      const amountInCol = await currentRow.locator('td[data-label="Betrag"]').innerText()
      if (dateInCol.trim() === date && transactionTypeInCol.trim() === transactionType && amountInCol.trim() === amount) {
        return await currentRow.locator('td[data-label="Status"]').innerText()
      }
    }
    throw new Error(`No row found with date "${date}", transaction type "${transactionType}" and amount "${amount}"`)
  }

  async getApprovalLabel(transaction: Transaction) {
    switch (transaction) {
      case "Purchase":
        return "Investition angekündigt";
      case "Redemption":
        return "Rücknahme Beantragt";
    }
  }
}