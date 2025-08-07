import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"

export class HomePageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly homeLatestInfo: Locator

  constructor(page: Page){
    super(page)
    this.menuSF = new HeaderMenuSF(page)
    this.homeLatestInfo = page.getByText('Latest Release Information')
  }

  latestInfoTitle(){
    return this.homeLatestInfo
  }
}