import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { FooterOMOC } from "./footerOMOC"

export class YourEmailHasBeenVerifiedPageOMOC extends BasePage {

  readonly footerOMOC: FooterOMOC

  constructor(page: Page){
    super(page)
    this.footerOMOC = new FooterOMOC(page)
  }
}