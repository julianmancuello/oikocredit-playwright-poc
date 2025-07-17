import { Page } from "@playwright/test"
import { LoginPage } from "./loginPage"
import { HomePage } from "./homePage"
import { LeadsPage } from "./leadsPage"

export class PageManager {

  private readonly page: Page
  private readonly loginPage: LoginPage
  private readonly homePage: HomePage
  private readonly leadsPage: LeadsPage
  
  constructor(page: Page){
    this.page = page
    this.loginPage = new LoginPage(this.page)
    this.homePage = new HomePage(this.page)
    this.leadsPage = new LeadsPage(this.page)
  }

  onLoginPage(){
    return this.loginPage
  }

  onHomePage(){
    return this.homePage
  }

  onLeadsPage(){
    return this.leadsPage
  }

}