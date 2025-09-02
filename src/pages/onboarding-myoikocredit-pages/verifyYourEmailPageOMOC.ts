import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { DataFactory as df } from "../../utils/dataFactory"
import { ContextStore as cs } from "../../utils/contextStore"
import { FooterOMOC } from "./footerOMOC"

export class VerifyYourEmailPageOMOC extends BasePage {

  readonly footerOMOC: FooterOMOC
  private readonly emailField: Locator
  private readonly repeatEmailField: Locator

  constructor(page: Page){
    super(page)
    this.footerOMOC = new FooterOMOC(page)
    this.emailField = page.locator('input[name="email"]')
    this.repeatEmailField = page.locator('input[name="repeat_email"]')
  }
}