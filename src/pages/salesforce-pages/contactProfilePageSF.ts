import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage"
import { HeaderMenuSF } from "./headerMenuSF"

export class ContactProfilePageSF extends BasePage {

  readonly menu: HeaderMenuSF
  //private readonly 

  constructor(page: Page){
    super(page)
    this.menu = new HeaderMenuSF(page)
  }

  
}