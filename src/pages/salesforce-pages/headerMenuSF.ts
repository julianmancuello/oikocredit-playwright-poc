import { Locator, Page } from "@playwright/test"

export type HeaderTabSF = "Leads" | "Accounts"

export class HeaderMenuSF {

  private readonly page: Page
  private readonly leadsTab: Locator
  private readonly accountsTab: Locator

  constructor(page: Page){
    this.page = page
    this.leadsTab = page.locator('[tabindex][title="Leads"]')
    this.accountsTab = page.locator('[tabindex][title="Accounts"]')
  }

  async clickOnTab(tabName: HeaderTabSF) {
    switch (tabName) {
      case "Leads":
        await this.leadsTab.click()
        break
      case "Accounts":
        await this.accountsTab.click()
        break
    }
  }
}