import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { FooterOMOC } from "./footerOMOC"
import { DataFactory as df } from "../../utils/dataFactory"
import { ContextStore as cs } from "../../utils/contextStore"

export class ProfileDetailsPageOMOC extends BasePage {

  readonly footerOMOC: FooterOMOC
  private readonly salutationDropdown: Locator
  private readonly salutationOptions: Locator
  private readonly firstNameField: Locator
  private readonly lastNameField: Locator
  private readonly placeOfBirthField: Locator
  private readonly birthDateField: Locator
  private readonly streetField: Locator
  private readonly houseNumberField: Locator
  private readonly cityField: Locator
  private readonly postalCodeField: Locator
  private readonly phoneNumberField: Locator

  constructor(page: Page){
    super(page)
    this.footerOMOC = new FooterOMOC(page)
    this.salutationDropdown = page.locator('button[name="salutation"]')
    this.salutationOptions = page.locator('lightning-base-combobox-item')
    this.firstNameField = page.locator('input[name="first_name"]')
    this.lastNameField = page.locator('input[name="last_name"]')
    this.placeOfBirthField = page.locator('input[name="place_birth"]')
    this.birthDateField = page.locator('input[name="birth_date"]')
    this.streetField = page.locator('input[name="street"]')
    this.houseNumberField = page.locator('input[name="house_number"]')
    this.cityField = page.locator('input[name="city"]')
    this.postalCodeField = page.locator('input[name="postal_code"]')
    this.phoneNumberField = page.locator('input.input--number')
  }

  async fillProfileDetails() {
    await this.salutationDropdown.click()
    const options = await this.salutationOptions.count()
    await this.salutationOptions.nth(df.generateRandomInteger(options-1)).click()
    await this.firstNameField.fill(cs.get("firstName"))
    await this.lastNameField.fill(cs.get("lastName"))
    await this.placeOfBirthField.fill(df.generateCity())
    await this.birthDateField.fill(df.generateBirthDate())
    await this.streetField.fill(df.generateStreet())
    await this.houseNumberField.fill(df.generateRandomInteger(100).toString())
    await this.cityField.fill(df.generateCity())
    await this.postalCodeField.fill(df.generatePostalCode())
    await this.phoneNumberField.fill(df.generateMobileNumber(false))
    await this.footerOMOC.clickOn("Next")
  }
}