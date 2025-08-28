import { Locator, FrameLocator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF, HeaderTabSF } from "./headerMenuSF"

export class HomePageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly iframeDashboard: FrameLocator
  private readonly lastRefreshInfo: Locator

  constructor(page: Page){
    super(page)
    this.iframeDashboard = page.frameLocator('iframe[title="dashboard"]')
    this.lastRefreshInfo = this.iframeDashboard.locator('.lastRefreshDate')
    this.menuSF = new HeaderMenuSF(page, this.lastRefreshInfo)
  }

  async navigateTo(destination: string): Promise<void> {
    switch (destination) {
      case "Leads":
      case "Accounts":
        return this.menuSF.clickOnTab(destination as HeaderTabSF)
      default:
        return super.navigateTo(destination)
    }
  }

  getLastRefreshInfo(){
    return this.lastRefreshInfo
  }
}