import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"

export class PurchaseRequestsPageTIT extends BasePage {

  private readonly requestTable: Locator
  private readonly requestRow: Locator

  constructor(page: Page) {
    super(page)
    this.requestTable = page.locator('table.rgMasterTable')
    this.requestRow = this.requestTable.locator('tbody tr')
  }

  async selectRequest(amount: string, date: string) {
    await this.requestTable.waitFor({ state: 'visible' })
    const rowCount = await this.requestRow.count()

    for (let i = 0; i < rowCount; i++) {
      const currentRow = this.requestRow.nth(i)
      const amountInColumn = await currentRow.locator('td.NumberColumn').innerText()
      const dateInColumn = await currentRow.locator('td.DateTimeColumn[style="width:85px;"]').innerText()
      if (amountInColumn.trim() === amount && dateInColumn.trim() === date) {
        await this.requestRow.nth(i).locator('td:nth-child(15)').click()
        return
      }
    }
    throw new Error(`No row found with amount "${amount}" and date "${date}"`);
  }
}