import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../basePage"
import { ContextStore as cs } from "../../utils/contextStore"

export class InboxPageMS extends BasePage {

  private readonly firstEmail: Locator
  private readonly toEmailAddress: Locator
  private readonly verifyEmailButton: Locator

  constructor(page: Page){
    super(page)
    this.firstEmail = page.locator('(//div[@class="EeHm8"])[2]')
    this.toEmailAddress = page.locator('._EType_RECIPIENT_ENTITY')
    this.verifyEmailButton = page.locator('a[data-linkto]')
  }

  async clickFirstEmail() {
    await this.firstEmail.click()
  }

  async verifyEmail(timeoutMs: number = 30000) {
    const expectedEmail = cs.get("dummyEmail")
    let isFirstAttempt = true

    await expect(async () => {
      if (!isFirstAttempt) {
        await this.page.reload()
        await this.clickFirstEmail()
      }
      isFirstAttempt = false

      await this.toEmailAddress.waitFor({ state: 'visible' })
      const actualEmail = (await this.toEmailAddress.textContent())?.trim()
      expect(actualEmail).toBe(expectedEmail)
    }).toPass({ timeout: timeoutMs, intervals: [1000] })

    await this.verifyEmailButton.click()
  }
}