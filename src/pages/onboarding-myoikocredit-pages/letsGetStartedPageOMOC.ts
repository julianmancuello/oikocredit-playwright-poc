import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { FooterOMOC } from "./footerOMOC"
import { AccountType } from "../../utils/platformUtils"

export class LetsGetStartedPageOMOC extends BasePage {

  readonly footerOMOC: FooterOMOC
  private readonly individualAccountOption: Locator
  private readonly jointAccountOption: Locator

  constructor(page: Page){
    super(page)
    this.footerOMOC = new FooterOMOC(page)
    this.individualAccountOption = page.locator('label[for="Individual-40"]')
    this.jointAccountOption = page.locator('label[for="Joint-40 Account-40"]')
  }

  async chooseAccountType(accountType: AccountType) {
    switch (accountType) {
      case "individual":
        await this.individualAccountOption.click({force: true})
        break
      case "joint":
        await this.jointAccountOption.click({force: true})
        break
    }
    await this.footerOMOC.clickOn("Next")
  }
}