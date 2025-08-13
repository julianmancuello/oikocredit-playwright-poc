import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"

export class SearchResultsPageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly contactsResult: Locator

  constructor(page: Page){
    super(page)
    this.menuSF = new HeaderMenuSF(page)
    this.contactsResult = page.locator('(//div[contains(@class, "resultsItem")][.//a[contains(text(), "Contacts")]])//tbody//th')
  }

  async selectResult(searchedValue: string) {//TODO: Improve the method so that it can handle multiple results
    const actualValue = await this.contactsResult.innerText()
    if (actualValue.trim() === searchedValue) {
      await this.contactsResult.click()
      return
    }
    throw new Error(`Value "${searchedValue}" not found in search results`)
  }
}