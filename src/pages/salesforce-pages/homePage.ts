import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenu } from "./headerMenu"

export class HomePage extends BasePage {

  readonly menu: HeaderMenu
  private readonly homeLatestInfo: Locator

  constructor(page: Page){
    super(page)
    this.menu = new HeaderMenu(page)
    this.homeLatestInfo = page.getByText('Latest Release Information')
  }

  latestInfoTitle(){
    return this.homeLatestInfo
  }
}