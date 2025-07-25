import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { HeaderMenu } from "./headerMenu"
import { utils } from ".././utils/utils"
import { ContextStore as cs } from "../utils/contextStore"

export class AccountProfilePage extends BasePage {

  readonly menu: HeaderMenu
  private readonly accountRecordType: Locator
  private readonly status: Locator

  constructor(page: Page){
    super(page)
    this.menu = new HeaderMenu(page)
    this.accountRecordType = page.locator('p .recordTypeName')
    this.status = page.locator('//p/slot/lightning-formatted-text[text()="Pending Signup"]')
  }

  async isRecordType(expectedRecordType: string){
    const actualRecordType = await this.accountRecordType.textContent()
    return actualRecordType === expectedRecordType
  }

  async isStatus(expectedStatus: string){
    const actualStatus = await this.status.textContent()
    return actualStatus === expectedStatus
  }
}