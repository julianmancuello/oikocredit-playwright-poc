import { Locator, FrameLocator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"

export class EmailMessagePageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly iframeEmail: FrameLocator

  constructor(page: Page){
    super(page)
    this.menuSF = new HeaderMenuSF(page)
    this.iframeEmail = page.frameLocator('#emailuiFrame')
  }

  getEssentialElements(): Locator[] {
    console.log("No essential elements were defined")
    return []
  }

  async getAmountInEmail() {
    const amount = (await this.iframeEmail.locator('//p/span[contains(text(), "EUR")]').innerText()).trim()
    return amount.replace('Betrag: ', '')
  }
}