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

  protected async loginUser(username: string, password: string, env?: Environment){
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.logInButton.click()
  }

  async loginWithEnvironmentCredentials(app: Application, env: Environment, accountType?: "individual" | "joint") {
    const { usernameKey, passwordKey } = this.getCredentialKeys(app, env, accountType)
    const username = cs.get<string>(usernameKey)
    const password = cs.get<string>(passwordKey)

    if (!username || !password) {
      throw new Error(`Missing credentials for ${app} in ${env}` + (accountType ? ` (account type: ${accountType})` : ''))
    }

    await this.loginUser(username, password, env)
  }

  private getCredentialKeys(app: Application, env: Environment, accountType?: "individual" | "joint") {
    let usernameKey = `${app}-${env}-user`
    let passwordKey = `${app}-${env}-password`

    if (app === Application.MYOIKOCREDIT && accountType) {
      usernameKey = `${app}-${accountType}-${env}-user`
      passwordKey = `${app}-${accountType}-${env}-password`
    }

    return { usernameKey, passwordKey }
  }
}