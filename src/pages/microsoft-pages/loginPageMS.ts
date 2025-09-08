import { Locator, Page } from "@playwright/test"
import { BaseLoginPage } from "../baseLoginPage"
import { Authenticator as auth } from "../../utils/authenticator"
import { Environment } from "../../utils/platformUtils"
import { ContextStore as cs } from "../../utils/contextStore"

export class LoginPageMS extends BaseLoginPage {

  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly logInButton: Locator
  private readonly TOTPField: Locator
  private readonly verifyButton: Locator
  private readonly nextButtonEmail: Locator
  private readonly TOTPFieldEmail1: Locator
  private readonly TOTPFieldEmail2: Locator
  private readonly verifyButtonEmail1: Locator
  private readonly verifyButtonEmail2: Locator
  private readonly notStaySignedInEmail: Locator

  constructor(page: Page){
    super(page)
    this.usernameField = page.locator('[type="email"]')
    this.passwordField = page.locator('[type="password"]')
    this.logInButton = page.locator('#idSIButton9')
    this.TOTPField = page.locator('#idTxtBx_SAOTCC_OTC')
    this.verifyButton = page.locator('#idSubmit_SAOTCC_Continue')
    this.nextButtonEmail = page.locator('button[data-testid="primaryButton"]')
    this.TOTPFieldEmail1 = page.locator('#floatingLabelInput5')
    this.TOTPFieldEmail2 = page.locator('#otc-confirmation-input')
    this.verifyButtonEmail1 = page.locator('[data-testid="primaryButton"]')
    this.verifyButtonEmail2 = page.locator('#oneTimeCodePrimaryButton')
    this.notStaySignedInEmail = page.locator('button[data-testid="secondaryButton"]')
  }

  protected override async loginUser(username: string, password: string, env: Environment){
    await this.usernameField.fill(username)
    await this.logInButton.click()
    await this.passwordField.fill(password)
    await this.logInButton.click()
    await this.TOTPField.fill(auth.generateTOTP(env))
    await this.verifyButton.click()
  }

  async loginEmail(){
    await this.usernameField.fill(cs.get("email-user"))
    await this.logInButton.click()
    await this.passwordField.click()
    await this.passwordField.fill(cs.get("email-password"))
    await this.nextButtonEmail.click()

    try {
      await this.TOTPFieldEmail1.waitFor({ state: 'visible', timeout: 1000 })
      await this.TOTPFieldEmail1.fill(auth.generateTOTP("email"))
      await this.verifyButtonEmail1.click()
    } catch {
      await this.TOTPFieldEmail2.waitFor({ state: 'visible', timeout: 1000 })
      await this.TOTPFieldEmail2.fill(auth.generateTOTP("email"))
      await this.verifyButtonEmail2.click()
    }

    await this.notStaySignedInEmail.click()
  }
}