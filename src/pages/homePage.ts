import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class HomePage extends BasePage {

  readonly leadsTab: Locator
  readonly homeLatestInfo: Locator

  constructor(page: Page){
    super(page)
    this.leadsTab = page.getByTitle('Leads')
    this.homeLatestInfo = page.getByText('Latest Release Information')
  }

  async clickOnLeadsTab(){
    await this.leadsTab.click()
  }

  latestInfoTitle(){
    return this.homeLatestInfo
  }

}