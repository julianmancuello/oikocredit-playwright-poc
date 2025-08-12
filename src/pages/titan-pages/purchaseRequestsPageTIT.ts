import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { Utils as utils } from "../../utils/utils"

export class PurchaseRequestsPageTIT extends BasePage {

  private readonly requestTable: Locator
  private readonly requestRow: Locator
  private readonly approveButton: Locator
  private readonly requestApprovedMessage: Locator

  constructor(page: Page) {
    super(page)
    this.requestTable = page.locator('table.rgMasterTable')
    this.requestRow = this.requestTable.locator('tbody tr')
    this.approveButton = page.locator('#ctl00_UsecaseContent_lbApproveRequest')
    this.requestApprovedMessage = page.locator('#ctl00_ExceptionControl_divBody')
  }

  async selectRequest(amount: string) {
    const formattedAmount = utils.applyNumberFormat("English format", Number(amount), 2)
    const formattedDate = utils.getFormattedToday("dd/mm/YYYY")
    await this.requestTable.waitFor({ state: 'visible' })
    const rowCount = await this.requestRow.count()

    for (let i = 0; i < rowCount; i++) {
      const currentRow = this.requestRow.nth(i)
      const amountInColumn = await currentRow.locator('td.NumberColumn').innerText()
      const dateInColumn = await currentRow.locator('td.DateTimeColumn[style="width:85px;"]').innerText()
      if (amountInColumn.trim() === formattedAmount && dateInColumn.trim() === formattedDate) {
        await this.requestRow.nth(i).locator('td:nth-child(15)').click()
        return
      }
    }
    throw new Error(`No row found with amount "${formattedAmount}" and date "${formattedDate}"`);
  }

  async approveRequest(){
    await this.approveButton.click()
  }

  async getRequestApprovedMessage(){
    const actualMessage = (await this.requestApprovedMessage.innerText()).trim()
    return actualMessage
  }
}