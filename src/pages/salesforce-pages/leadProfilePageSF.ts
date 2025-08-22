import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"
import { DataFactory as df } from "../../utils/dataFactory"
import { ContextStore as cs } from "../../utils/contextStore"

export class LeadProfilePageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly editButton: Locator
  private readonly convertButton: Locator
  private readonly mobileField: Locator
  private readonly saveButton: Locator
  private readonly leadName: Locator
  private readonly leadAccountName: Locator
  private readonly successfulSaveMessage: Locator
  private readonly mobileDetails: Locator
  private readonly recordTypeDropdown: Locator
  private readonly convertButtonInForm: Locator
  private readonly leadConvertedMessage: Locator
  private readonly closeWindowButton: Locator

  constructor(page: Page){
    super(page)
    this.menuSF = new HeaderMenuSF(page)
    this.editButton = page.locator('.windowViewMode-normal button[name="Edit"]')
    this.convertButton = page.locator('.windowViewMode-normal button[name="Convert"]')
    this.mobileField = page.getByRole('textbox', {name: "Mobile"})
    this.saveButton = page.getByRole('button', {name: "Save", exact: true})
    this.leadName = page.locator('[slot="primaryField"]')
    this.leadAccountName = page.locator('.windowViewMode-normal p lightning-formatted-text')
    this.successfulSaveMessage = page.locator('.slds-theme--success')
    this.mobileDetails = page.locator('records-output-phone a')
    this.recordTypeDropdown = page.getByRole('combobox', {name: "Record Type"})
    this.convertButtonInForm = page.locator('button.slds-button_brand')
    this.leadConvertedMessage = page.locator('.panel .title h2')
    this.closeWindowButton = page.locator('.active [title="Cancel and close"]')
  }

  async clickEditLead(){
    await this.editButton.click()
  }

  async clickConvertLead(){
    await this.convertButton.click()
  }

  async saveInContextLead(key: "name" | "accountName") {
    const locators: Record<"name" | "accountName", Locator> = {
      name: this.leadName,
      accountName: this.leadAccountName
    }

    const locator = locators[key]

    const text = await locator.textContent();
    cs.put(key, text)
  }

  async fillInWithRandomMobile(){
    const newMobile = df.generateRandomMobile()
    cs.put("newMobile", newMobile)
    await this.mobileField.clear()
    await this.mobileField.fill(newMobile)
  }

  async saveChanges(){
    await this.saveButton.click()
  }

  async getSavedChangesMessage(){
    const rawMessage = (await this.successfulSaveMessage.textContent()) ?? ""
    const actualMessage = rawMessage.match(/Lead "[^"]+" was saved\./)?.[0]
    return actualMessage
  }

  async getNewMobile(){
    const mobileInDetails = await this.mobileDetails.textContent()
    return mobileInDetails
  }

  async selectRecordType(recordType: string){
    await this.recordTypeDropdown.click()
    await this.page.getByRole('option', {name: recordType}).click()
  }

  async convertLead(){
    await this.convertButtonInForm.click()
  }

  async getLeadConvertedMessage(){
    const actualMessage = await this.leadConvertedMessage.textContent()
    await this.closeWindowButton.click()
    return actualMessage
  }
}