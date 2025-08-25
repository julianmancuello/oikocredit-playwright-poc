import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { DataFactory as df } from "../../utils/dataFactory"
import { ContextStore as cs } from "../../utils/contextStore"
import { Utils as utils } from "../../utils/utils"

export class DocumentsPageMOC extends BasePage {

  private readonly documentsTitle: Locator
  private readonly documentsColumnHeaders: Locator
  private readonly messagesTitle: Locator

  constructor(page: Page) {
    super(page)
    this.documentsTitle = page.locator('(//span[@class="slds-text-heading_medium"])[1]')
    this.documentsColumnHeaders = page.locator('span.slds-th__action')
    this.messagesTitle = page.locator('(//span[@class="slds-text-heading_medium"])[2]')
  }
}