import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"

export class AccountProfilePageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly accountRecordType: Locator
  private readonly status: Locator

  constructor(page: Page){
    super(page)
    this.menuSF = new HeaderMenuSF(page)
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