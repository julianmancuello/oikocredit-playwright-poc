import { Locator, Page } from "@playwright/test"
import { BaseLoginPage } from "../baseLoginPage"
import { Authenticator as auth } from "../../utils/authenticator"
import { Environment } from "../../utils/platformUtils"

export class LoginPageMS extends BaseLoginPage {

  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly logInButton: Locator
  readonly TOTPField: Locator
  readonly verifyButton: Locator

  constructor(page: Page){
    super(page)
    this.usernameField = page.locator('[type="email"]')
    this.passwordField = page.locator('[type="password"]')
    this.logInButton = page.locator('#idSIButton9')
    this.TOTPField = page.locator('#idTxtBx_SAOTCC_OTC')
    this.verifyButton = page.locator('#idSubmit_SAOTCC_Continue')
  }

  protected override async loginUser(username: string, password: string, env: Environment){
    await this.usernameField.fill(username)
    await this.logInButton.click()
    await this.passwordField.fill(password)
    await this.logInButton.click()
    await this.TOTPField.fill(auth.generateTOTP(env))
    await this.verifyButton.click()
  }
}