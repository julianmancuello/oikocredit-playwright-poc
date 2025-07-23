import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { utils } from ".././utils/utils"
import { ContextStore as cs } from "../utils/contextStore"

export class LeadProfilePage extends BasePage {

  private readonly editButton: Locator
  private readonly mobileField: Locator
  private readonly saveButton: Locator
  private readonly leadNameEdited: Locator
  private readonly successfulSaveMessage: Locator
  private readonly mobileDetails: Locator

  constructor(page: Page){
    super(page)
    this.editButton = page.locator('.windowViewMode-normal button[name="Edit"]')
    this.mobileField = page.getByRole('textbox', {name: "Mobile"})
    this.saveButton = page.getByRole('button', {name: "Save", exact: true})
    this.leadNameEdited = page.locator('[slot="primaryField"]')
    this.successfulSaveMessage = page.locator('.slds-theme--success')
    this.mobileDetails = page.locator('records-output-phone a')
  }

  async clickEditLead(){
    await this.editButton.click()
  }

  async fillInWithRandomMobile(){
    const newMobile = utils.generateRandomMobile()
    cs.put("newMobile", newMobile)
    console.log(newMobile)
    await this.mobileField.clear()
    await this.mobileField.fill(newMobile)
  }

  async saveChanges(){
    await this.saveButton.click()
  }

  async isSavedChangesMessageDisplayed(){
    const leadName = await this.leadNameEdited.textContent()
    const rawMessage = (await this.successfulSaveMessage.textContent()) ?? ""
    const actualMessage = rawMessage.match(/Lead "[^"]+" was saved\./)?.[0]
    const expectedMessage = `Lead "${leadName}" was saved.`
    console.log(actualMessage)
    console.log(expectedMessage)
    return actualMessage == expectedMessage
  }

  async isNewMobileDisplayed(){
    const mobileInDetails = await this.mobileDetails.textContent()
    return mobileInDetails === cs.get("newMobile")
  }
}