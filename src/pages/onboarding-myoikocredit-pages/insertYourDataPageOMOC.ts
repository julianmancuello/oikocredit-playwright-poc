import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { DataFactory as df } from "../../utils/dataFactory"
import { ContextStore as cs } from "../../utils/contextStore"

export class InsertYourDataPageOMOC extends BasePage {

  private readonly usernameField: Locator
  private readonly passwordField: Locator
  private readonly repeatPasswordField: Locator
  private readonly privacyAndTermsCheckbox: Locator
  private readonly newslettersCheckbox: Locator
  private readonly emailsAboutCheckbox: Locator
  private readonly nextButton: Locator

  constructor(page: Page){
    super(page)
    this.usernameField = page.locator('input[name="username"]')
    this.passwordField = page.locator('input[name="password"]')
    this.repeatPasswordField = page.locator('input[name="password_repeat"]')
    this.privacyAndTermsCheckbox = page.locator('input[name="privacy"]')
    this.newslettersCheckbox = page.locator('input[value="newsletter"]')
    this.emailsAboutCheckbox = page.locator('input[value="regionalEvent"]')
    this.nextButton = page.locator('button.slds--next-button')
  }

  async fillInsertYourDataPage(newsletters: boolean, emails: boolean){
    await this.usernameField.fill(df.generateRandomUsername())
    const genericPassword = cs.get<string>("generic-password")
    await this.passwordField.fill(genericPassword)
    await this.repeatPasswordField.fill(genericPassword)
    await this.privacyAndTermsCheckbox.check({force: true})
    if (newsletters) {
      await this.newslettersCheckbox.check({force: true})
    }
    if (emails) {
      await this.emailsAboutCheckbox.check({force: true})
    }
    await this.nextButton.click()
  }
}