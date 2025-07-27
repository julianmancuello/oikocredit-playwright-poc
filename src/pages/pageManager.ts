import { Page } from "@playwright/test"
import { LoginPage } from "./salesforce-pages/loginPage"
import { HomePage } from "./salesforce-pages/homePage"
import { LeadsPage } from "./salesforce-pages/leadsPage"
import { AccountsPage } from "./salesforce-pages/accountsPage"
import { LeadProfilePage } from "./salesforce-pages/leadProfilePage"
import { AccountProfilePage } from "./salesforce-pages/accountProfilePage"

export class PageManager {

  private readonly page: Page
  private readonly loginPage: LoginPage
  private readonly homePage: HomePage
  private readonly leadsPage: LeadsPage
  private readonly accountsPage: AccountsPage
  private readonly leadProfilePage: LeadProfilePage
  private readonly accountProfilePage: AccountProfilePage
  
  constructor(page: Page){
    this.page = page
    this.loginPage = new LoginPage(this.page)
    this.homePage = new HomePage(this.page)
    this.leadsPage = new LeadsPage(this.page)
    this.accountsPage = new AccountsPage(this.page)
    this.leadProfilePage = new LeadProfilePage(this.page)
    this.accountProfilePage = new AccountProfilePage(this.page)
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

  onAccountsPage(){
    return this.accountsPage
  }

  onLeadProfilePage(){
    return this.leadProfilePage
  }

  onAccountProfilePage(){
    return this.accountProfilePage
  }
}