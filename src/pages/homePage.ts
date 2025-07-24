import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class HomePage extends BasePage {

  private readonly leadsTab: Locator
  private readonly accountsTab: Locator
  private readonly homeLatestInfo: Locator

  constructor(page: Page){
    super(page)
    this.leadsTab = page.locator('[tabindex][title="Leads"]')
    this.accountsTab = page.locator('[tabindex][title="Accounts"]')
    this.homeLatestInfo = page.getByText('Latest Release Information')
  }

  async clickOnLeadsTab(){
    await this.leadsTab.click()
  }

  async clickOnAccountsTab(){
    await this.accountsTab.click()
  }

  latestInfoTitle(){
    return this.homeLatestInfo
  }

}