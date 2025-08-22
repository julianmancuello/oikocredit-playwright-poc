import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"
import { ContextStore as cs } from "../../utils/contextStore"

export class AccountsPageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly searchBar: Locator
  private readonly accountRetrieved: Locator

  constructor(page: Page){
    super(page)
    this.menuSF = new HeaderMenuSF(page)
    this.searchBar = page.getByPlaceholder('Search this list...')
    this.accountRetrieved = page.locator('th[data-label="Account Name"] a')
  }

  async searchAccount(accountName?: string) {
    const nameToSearch = accountName ?? cs.get("accountName");

    if (!nameToSearch) {
      throw new Error("No account name provided or stored in context.");
    }

    await this.searchBar.fill(nameToSearch);
    await this.searchBar.press("Enter");
  }
  
  async selectAccountRetrieved(){
    await this.accountRetrieved.click()
  }
}