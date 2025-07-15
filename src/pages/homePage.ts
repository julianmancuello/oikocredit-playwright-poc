import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"

export class HomePage extends BasePage {

  readonly leadsTab: Locator
  readonly recentlyViewed: Locator

  constructor(page: Page){
    super(page)
    this.leadsTab = page.getByTitle('Leads')
    this.recentlyViewed = page.locator('[class="slds-page-header__title slds-truncate lst-temp-slds-lineHeight"]')
  }

  async enterLeads(){
    await this.leadsTab.click()
  }

  recentlyViewedLocator(){
    return this.recentlyViewed
  }

}