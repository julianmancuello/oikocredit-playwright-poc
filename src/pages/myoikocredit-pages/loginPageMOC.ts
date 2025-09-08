import { Locator, Page } from "@playwright/test"
import { BaseLoginPage } from "../baseLoginPage"
import { ContextStore as cs } from "../../utils/contextStore"

export class LoginPageMOC extends BaseLoginPage {

  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly logInButton: Locator

  constructor(page: Page){
    super(page)
    this.usernameField = page.locator('input[name="username"]')
    this.passwordField = page.locator('input[name="password"]')
    this.logInButton = page.locator('button[type="submit"]')
  }

  async loginAsNewMyOikocreditUser() {
    await this.loginUser(cs.get("newUsername"), cs.get("generic-password"))
  }
}