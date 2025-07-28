import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenu } from "./headerMenu"

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

  async getRecordType(){
    const actualRecordType = await this.accountRecordType.textContent()
    return actualRecordType
  }

  async getStatus(){
    const actualStatus = await this.status.textContent()
    return actualStatus
  }
}