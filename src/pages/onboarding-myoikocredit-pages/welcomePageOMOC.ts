import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { FooterOMOC } from "./footerOMOC"

export class WelcomePageOMOC extends BasePage {

  readonly footerOMOC: FooterOMOC

  constructor(page: Page){
    super(page)
    this.footerOMOC = new FooterOMOC(page)
  }

  async clickGetStarted(){
    await this.footerOMOC.clickOn("Next")
  }
}