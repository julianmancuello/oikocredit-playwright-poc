import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { FooterOMOC } from "./footerOMOC"
import { DataFactory as df } from "../../utils/dataFactory"

export class LegalDetailsPageOMOC extends BasePage {

  readonly footerOMOC: FooterOMOC
  private readonly taxCountryDropdown: Locator
  private readonly countryOptions: Locator
  private readonly exemptionOption: Locator
  private readonly tinField: Locator
  private readonly americanCitizenOption: Locator
  private readonly mandatoryCheckboxes: Locator

  constructor(page: Page){
    super(page)
    this.footerOMOC = new FooterOMOC(page)
    this.taxCountryDropdown = page.locator('button.slds-combobox__input-value')
    this.countryOptions = page.locator('div[aria-label="Country of tax residency"]')
    this.exemptionOption = page.locator('span.slds-radio > input[name="exempted"] + label .slds-radio_faux')
    this.tinField = page.locator('input[name="taxNumber"]')
    this.americanCitizenOption = page.locator('span.slds-radio > input[name="usCitizen"] + label .slds-radio_faux')
    this.mandatoryCheckboxes = page.locator('.slds-checkbox_faux')
  }

  async selectCountryOfTaxResidency(country: string){
    await this.taxCountryDropdown.click()
    await this.countryOptions.locator(`[data-value="${country}"]`).click()
  }

  async isTaxExempt(exempt: boolean) {
    if (exempt) {
      await this.exemptionOption.nth(0).check()
    } else {
      await this.exemptionOption.nth(1).check()
    }
  }

  async fillTaxIdentificationNumber() {
    await this.tinField.fill(df.generateTIN())
  }

  async isAmericanCitizen(american: boolean) {
    if (american) {
      await this.americanCitizenOption.nth(0).check()
    } else {
      await this.americanCitizenOption.nth(1).check()
    }
  }

  async checkMandatoryCheckboxes(check: boolean) {
    if (check) {
      await this.mandatoryCheckboxes.nth(0).check()
      await this.mandatoryCheckboxes.nth(1).check()
    }
  }
}