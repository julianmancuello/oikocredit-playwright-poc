import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"
import { utils } from "../../utils/utils"
import { ContextStore as cs } from "../../utils/contextStore"

export class LeadsPageSF extends BasePage {

  readonly menuSF: HeaderMenuSF
  private readonly newButton: Locator
  private readonly inflowRadio: Locator
  private readonly nextButton: Locator
  private readonly moveToChosenLeadSource: Locator
  private readonly firstNameField: Locator
  private readonly lastNameField: Locator
  private readonly emailField: Locator
  private readonly accountNameField: Locator
  private readonly countryDropdown: Locator
  private readonly saveButton: Locator
  private readonly leadCreatedConfirmation: Locator
  private readonly firstRowLeads: Locator

  constructor(page: Page){
    super(page)
    this.menuSF = new HeaderMenuSF(page)
    this.newButton = page.getByRole('button', {name: "New"})
    this.inflowRadio = page.locator('//input[@value="0127S000000X6jgQAC"]/parent::div/span[@class="slds-radio--faux"]')
    this.nextButton = page.getByRole('button', {name: "Next"})
    this.moveToChosenLeadSource = page.locator('[data-component-id="flexipage_fieldSection"] [title="Move to Chosen"]')
    this.firstNameField = page.getByRole('textbox', {name: "First Name"})
    this.lastNameField = page.getByRole('textbox', {name: "Last Name"})
    this.emailField = page.getByRole('textbox', {name: "Email"})
    this.accountNameField = page.getByRole('textbox', {name: "Account Name"})
    this.countryDropdown = page.getByRole('combobox', {name: "Country"})
    this.saveButton = page.getByRole('button', {name: "Save", exact: true})
    this.leadCreatedConfirmation = page.locator('.slds-theme--success')
    this.firstRowLeads = page.locator('tbody tr[data-row-number="1"]')
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
    if(!cs.has("firstName")){
      utils.generateAndStoreFullName()
    }
    await this.firstNameField.fill(cs.get("firstName"))
  }

  async fillInWithRandomLastName(){
    if(!cs.has("lastName")){
      utils.generateAndStoreFullName()
    }
    await this.lastNameField.fill(cs.get("lastName"))
  }

  async fillInWithRandomEmail(){
    if(!cs.has("firstName") && !cs.has("lastName")){
      utils.generateAndStoreFullName()
    }
    const randomEmail = (`${cs.get("firstName")}.${cs.get("lastName")}${utils.generateRandomInteger(100)}@test.com`).toLowerCase()
    cs.put("newEmail", randomEmail)
    await this.emailField.fill(randomEmail)
  }

  async fillInWithRandomAccountName(){
    if(!cs.has("firstName") && !cs.has("lastName")){
      utils.generateAndStoreFullName()
    }
    const randomAccountName = `${cs.get("firstName")}${cs.get("lastName")}${utils.generateRandomInteger(100)}`
    cs.put("newAccountName", randomAccountName)
    await this.accountNameField.fill(randomAccountName)
  }

  async selectCountry(country: string){
    await this.countryDropdown.click()
    await this.page.locator('[aria-label="Country"]').getByRole('option', {name: country}).click()
  }

  async saveTheForm(){
    await this.saveButton.click()
  }

  async getLeadCreatedMessage(){
    const rawMessage = (await this.leadCreatedConfirmation.textContent()) ?? ""
    const actualMessage = rawMessage.match(/Lead "[^"]+" was created\./)?.[0]
    return actualMessage
  }

  async getNewLeadInList(){
    await this.page.waitForTimeout(500)
    const nameFirstRow = await this.firstRowLeads.locator('th[data-label="Name"]').textContent()
    const emailFirstRow = await this.firstRowLeads.locator('td[data-label="Email"]').textContent()
    const accountNameFirstRow = await this.firstRowLeads.locator('td[data-label="Account Name"]').textContent()

    return {
      name: nameFirstRow,
      email: emailFirstRow,
      accountName: accountNameFirstRow
    }
  }
  
  async selectFirstLeadInList(){
    await this.firstRowLeads.locator('th[data-label="Name"] a').click()
  }
}