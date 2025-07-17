import { Locator, Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { utils } from ".././utils/utils"
import { ContextStore } from "../utils/ContextStore"

export class LeadsPage extends BasePage {

  readonly newButton: Locator
  readonly inflowRadio: Locator
  readonly nextButton: Locator
  readonly moveToChosenLeadSource: Locator
  readonly firstNameField: Locator
  readonly lastNameField: Locator

  constructor(page: Page){
    super(page)
    this.newButton = page.getByRole('button', {name: "New"})
    this.inflowRadio = page.getByRole('radio', {name: "Inflow"})
    this.nextButton = page.getByRole('button', {name: "Next"})
    this.moveToChosenLeadSource = page.locator('[data-component-id="flexipage_fieldSection"] [title="Move to Chosen"]')
    this.firstNameField = page.getByRole('textbox', {name: "First Name"})
    this.lastNameField = page.getByRole('textbox', {name: "Last Name"})
  }

  async clickNewLead(){
    await this.newButton.click()
  }

  async selectInflow(){
    await this.page.waitForSelector('.viewport[aria-hidden="true"]')
    await this.inflowRadio.check({force: true})
    await this.nextButton.click()
  }

  async selectLeadSource(leadSource: string){
    await this.page.getByRole('option', {name: leadSource}).click()
    await this.moveToChosenLeadSource.click()
  }

  async fillInWithRandomFirstName(){
    if(!ContextStore.has("firstName")){
      utils.generateAndStoreFullName()
    }
    await this.firstNameField.fill(ContextStore.get("firstName"))
    console.log(`Extraido ${ContextStore.get("firstName")}`)
  }

  async fillInWithRandomLastName(){
    if(!ContextStore.has("lastName")){
      utils.generateAndStoreFullName()
    }
    await this.lastNameField.fill(ContextStore.get("lastName"))
    console.log(`Extraido ${ContextStore.get("lastName")}`)
  }


}