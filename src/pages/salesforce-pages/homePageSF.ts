import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF, HeaderTabSF } from "./headerMenuSF"

export class HomePageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly homeLatestInfo: Locator

  constructor(page: Page){
    super(page)
    this.homeLatestInfo = page.getByText('Latest Release Information')
    this.menuSF = new HeaderMenuSF(page, this.homeLatestInfo)
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

  latestInfoTitle(){
    return this.homeLatestInfo
  }
}