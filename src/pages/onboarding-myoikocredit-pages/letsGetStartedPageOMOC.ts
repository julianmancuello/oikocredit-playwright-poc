import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { FooterOMOC } from "./footerOMOC"
import { AccountType } from "../../utils/platformUtils"

export class LetsGetStartedPageOMOC extends BasePage {

  readonly footerOMOC: FooterOMOC
  private readonly accountOption: Locator

  constructor(page: Page){
    super(page)
    this.footerOMOC = new FooterOMOC(page)
    this.accountOption = page.locator('label.slds-radio__label')
  }

  async chooseAccountType(accountType: AccountType) {
    switch (accountType) {
      case "individual":
        await this.accountOption.nth(0).click({force: true})
        break
      case "joint":
        await this.accountOption.nth(1).click({force: true})
        break
    }
    await this.footerOMOC.clickOn("Next")
  }
}