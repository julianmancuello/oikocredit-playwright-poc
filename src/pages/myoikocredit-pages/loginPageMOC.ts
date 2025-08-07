import { Locator, Page } from "@playwright/test"
import { BaseLoginPage } from "../baseLoginPage"
import { ContextStore as cs } from "../../utils/contextStore"
import { Environment } from "../../utils/platformUtils"

export class LoginPageMOC extends BaseLoginPage {

  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly logInButton: Locator

  constructor(page: Page){
    super(page)
    this.usernameField = page.getByRole('textbox', {name: "Benutzername"})
    this.passwordField = page.getByRole('textbox', {name: "Passwort"})
    this.logInButton = page.getByRole('button', {name: "Login"})
  }
}