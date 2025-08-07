import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { ContextStore as cs } from "../utils/contextStore"
import { Environment, Application } from "../utils/platformUtils"

export abstract class BaseLoginPage extends BasePage {

  protected abstract usernameField: Locator
  protected abstract passwordField: Locator
  protected abstract logInButton: Locator

  constructor(page: Page){
    super(page)
  }

  async loginUser(username: string, password: string){
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.logInButton.click()
  }

  async loginWithEnvironmentCredentials(app: Application, env: Environment) {
    const username = cs.get<string>(`${app}-${env}-user`)
    const password = cs.get<string>(`${app}-${env}-password`)

    if (!username || !password) {
      throw new Error(`Missing credentials for application ${app} and environment ${env}`)
    }

    await this.loginUser(username, password)
  }

}