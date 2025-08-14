import { Locator, Page } from "@playwright/test"

export type HeaderTabSF = "Leads" | "Accounts"

export class HeaderMenuSF {

  private readonly page: Page
  private readonly mainSearchBarButton: Locator
  private readonly mainSearchBarInput: Locator
  private readonly leadsTab: Locator
  private readonly accountsTab: Locator

  constructor(page: Page){
    this.page = page
    this.mainSearchBarButton = page.locator('button.slds-truncate')
    this.mainSearchBarInput = page.locator('input.slds-input[type="search"]')
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

  async searchInMainSearchBar(value: string) {
    await this.page.waitForLoadState('load')
    await this.mainSearchBarButton.click()
    await this.mainSearchBarInput.waitFor({ state: 'visible' })
    await this.mainSearchBarInput.fill(value)
    await this.mainSearchBarInput.press('Enter')
  }
}