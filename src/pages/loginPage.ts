import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { ContextStore as cs } from "../utils/contextStore"

export class LoginPage extends BasePage {

  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly logInButton: Locator

  constructor(page: Page){
    super(page)
    this.usernameField = page.getByRole('textbox', {name: "Username"})
    this.passwordField = page.getByRole('textbox', {name: "Password"})
    this.logInButton = page.getByRole('button', {name: "Log In to Sandbox"})
  }

  async loginUser(username: string, password: string){
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.logInButton.click()
  }

  async loginWithEnvironmentCredentials(env: string) {
    const environment = env.toLowerCase()

    const username = cs.get<string>(`salesforce-${environment}-user`)
    const password = cs.get<string>(`salesforce-${environment}-password`)

    if (!username || !password) {
      throw new Error(`Missing credentials for environment: ${environment}`)
    }

    await this.loginUser(username, password)
  }
}