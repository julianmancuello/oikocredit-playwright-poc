import { Page } from "@playwright/test"
import { LoginPage } from "./loginPage"
import { HomePage } from "./homePage"

export class PageManager {

  private readonly page: Page
  private readonly loginPage: LoginPage
  private readonly homePage: HomePage
  
  constructor(page: Page){
    this.page = page
    this.loginPage = new LoginPage(this.page)
    this.homePage = new HomePage(this.page)
  }

  onLoginPage(){
    return this.loginPage
  }

  onHomePage(){
    return this.homePage
  }

}