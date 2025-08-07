import { Page } from "@playwright/test"
import { LoginPageSF } from "./salesforce-pages/loginPageSF"
import { HomePageSF } from "./salesforce-pages/homePageSF"
import { LeadsPageSF } from "./salesforce-pages/leadsPageSF"
import { AccountsPageSF } from "./salesforce-pages/accountsPageSF"
import { LeadProfilePageSF } from "./salesforce-pages/leadProfilePageSF"
import { AccountProfilePageSF } from "./salesforce-pages/accountProfilePageSF"
import { LoginPageMOC } from "./myoikocredit-pages/loginPageMOC"
import { HomePageMOC } from "./myoikocredit-pages/homePageMOC"
import { TransactionsPageMOC } from "./myoikocredit-pages/transactionsPageMOC"

export class PageManager {

  private readonly page: Page
  private readonly loginPageSF: LoginPageSF
  private readonly homePageSF: HomePageSF
  private readonly leadsPageSF: LeadsPageSF
  private readonly accountsPageSF: AccountsPageSF
  private readonly leadProfilePageSF: LeadProfilePageSF
  private readonly accountProfilePageSF: AccountProfilePageSF
  private readonly loginPageMOC: LoginPageMOC
  private readonly homePageMOC: HomePageMOC
  private readonly transactionsPageMOC: TransactionsPageMOC
  
  constructor(page: Page){
    this.page = page
    this.loginPageSF = new LoginPageSF(this.page)
    this.homePageSF = new HomePageSF(this.page)
    this.leadsPageSF = new LeadsPageSF(this.page)
    this.accountsPageSF = new AccountsPageSF(this.page)
    this.leadProfilePageSF = new LeadProfilePageSF(this.page)
    this.accountProfilePageSF = new AccountProfilePageSF(this.page)
    this.loginPageMOC = new LoginPageMOC(this.page)
    this.homePageMOC = new HomePageMOC(this.page)
    this.transactionsPageMOC = new TransactionsPageMOC(this.page)
  }

  onLoginPageSF(){
    return this.loginPageSF
  }

  onHomePageSF(){
    return this.homePageSF
  }

  onLeadsPageSF(){
    return this.leadsPageSF
  }

  onAccountsPageSF(){
    return this.accountsPageSF
  }

  onLeadProfilePageSF(){
    return this.leadProfilePageSF
  }

  onAccountProfilePageSF(){
    return this.accountProfilePageSF
  }

  onLoginPageMOC(){
    return this.loginPageMOC
  }

  onHomePageMOC(){
    return this.homePageMOC
  }

  onTransactionsPageMOC(){
    return this.transactionsPageMOC
  }
}