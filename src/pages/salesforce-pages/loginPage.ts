import { Locator, Page } from "@playwright/test"
import { BaseLoginPage } from "../baseLoginPage"

export class LoginPage extends BaseLoginPage {

  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly logInButton: Locator
  readonly logInErrorMessage: Locator

  constructor(page: Page){
    super(page)
    this.usernameField = page.getByRole('textbox', {name: "Username"})
    this.passwordField = page.getByRole('textbox', {name: "Password"})
    this.logInButton = page.getByRole('button', {name: "Log In to Sandbox"})
    this.logInErrorMessage = page.locator('#error.loginError')
  }

  async loginWithInvalidCredentials() {
    await this.loginUser("username", "password")
  }

  async getLogInErrorMessage(){
    const actualErrorMessage = await this.logInErrorMessage.textContent()
    return actualErrorMessage
  }
}