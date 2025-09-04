import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"

export class HomePageMS extends BasePage {

  private readonly signInButton: Locator

  constructor(page: Page){
    super(page)
    this.signInButton = page.locator('#c-shellmenu_custom_outline_signin_bhvr100_right')
  }

  async clickSignIn(){
    await this.signInButton.click()
  }
}