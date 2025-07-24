import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { utils } from ".././utils/utils"
import { ContextStore as cs } from "../utils/contextStore"

export class AccountsPage extends BasePage {

  private readonly searchBar: Locator
  private readonly accountRetrieved: Locator

  constructor(page: Page){
    super(page)
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