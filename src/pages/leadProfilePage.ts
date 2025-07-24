import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { utils } from ".././utils/utils"
import { ContextStore as cs } from "../utils/contextStore"

export class LeadProfilePage extends BasePage {

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
    const newMobile = utils.generateRandomMobile()
    cs.put("newMobile", newMobile)
    await this.mobileField.clear()
    await this.mobileField.fill(newMobile)
  }

  async saveChanges(){
    await this.saveButton.click()
  }

  async isSavedChangesMessageDisplayed(){
    const leadName = cs.get("name")
    const rawMessage = (await this.successfulSaveMessage.textContent()) ?? ""
    const actualMessage = rawMessage.match(/Lead "[^"]+" was saved\./)?.[0]
    const expectedMessage = `Lead "${leadName}" was saved.`
    return actualMessage == expectedMessage
  }

  async isNewMobileDisplayed(){
    const mobileInDetails = await this.mobileDetails.textContent()
    return mobileInDetails === cs.get("newMobile")
  }

  async selectRecordType(recordType: string){
    await this.recordTypeDropdown.click()
    await this.page.getByRole('option', {name: recordType}).click()
  }

  async convertLead(){
    await this.convertButtonInForm.click()
  }

  async isLeadConvertedMessageDisplayed(){
    const actualMessage = await this.leadConvertedMessage.textContent()
    const expectedMessage = "Your lead has been converted"
    await this.closeWindowButton.click()
    return actualMessage === expectedMessage
  }
}