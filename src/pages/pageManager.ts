import { Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { LoginPageMS } from "./microsoft-pages/loginPageMS"
import { LoginPageSF } from "./salesforce-pages/loginPageSF"
import { HomePageSF } from "./salesforce-pages/homePageSF"
import { LeadsPageSF } from "./salesforce-pages/leadsPageSF"
import { AccountsPageSF } from "./salesforce-pages/accountsPageSF"
import { LeadProfilePageSF } from "./salesforce-pages/leadProfilePageSF"
import { AccountProfilePageSF } from "./salesforce-pages/accountProfilePageSF"
import { ContactProfilePageSF } from "./salesforce-pages/contactProfilePageSF"
import { SearchResultsPageSF } from "./salesforce-pages/searchResultsPageSF"
import { EmailMessagePageSF } from "./salesforce-pages/emailMessagePageSF"
import { LoginPageMOC } from "./myoikocredit-pages/loginPageMOC"
import { HomePageMOC } from "./myoikocredit-pages/homePageMOC"
import { TransactionsPageMOC } from "./myoikocredit-pages/transactionsPageMOC"
import { HomePageTIT } from "./titan-pages/homePageTIT"
import { RequestsPageTIT } from "./titan-pages/requestsPageTIT"

export class PageManager {

  private readonly pagesMap: Record<string, BasePage>
  private readonly page: Page
  private readonly loginPageMS: LoginPageMS
  private readonly loginPageSF: LoginPageSF
  private readonly homePageSF: HomePageSF
  private readonly leadsPageSF: LeadsPageSF
  private readonly accountsPageSF: AccountsPageSF
  private readonly leadProfilePageSF: LeadProfilePageSF
  private readonly accountProfilePageSF: AccountProfilePageSF
  private readonly contactProfilePageSF: ContactProfilePageSF
  private readonly searchResultsPageSF: SearchResultsPageSF
  private readonly emailMessagePageSF: EmailMessagePageSF
  private readonly loginPageMOC: LoginPageMOC
  private readonly homePageMOC: HomePageMOC
  private readonly transactionsPageMOC: TransactionsPageMOC
  private readonly homePageTIT: HomePageTIT
  private readonly requestsPageTIT: RequestsPageTIT
  
  constructor(page: Page){
    this.page = page
    this.loginPageMS = new LoginPageMS(this.page)
    this.loginPageSF = new LoginPageSF(this.page)
    this.homePageSF = new HomePageSF(this.page)
    this.leadsPageSF = new LeadsPageSF(this.page)
    this.accountsPageSF = new AccountsPageSF(this.page)
    this.leadProfilePageSF = new LeadProfilePageSF(this.page)
    this.accountProfilePageSF = new AccountProfilePageSF(this.page)
    this.contactProfilePageSF = new ContactProfilePageSF(this.page)
    this.searchResultsPageSF = new SearchResultsPageSF(this.page)
    this.emailMessagePageSF = new EmailMessagePageSF(this.page)
    this.loginPageMOC = new LoginPageMOC(this.page)
    this.homePageMOC = new HomePageMOC(this.page)
    this.transactionsPageMOC = new TransactionsPageMOC(this.page)
    this.homePageTIT = new HomePageTIT(this.page)
    this.requestsPageTIT = new RequestsPageTIT(this.page)
    this.pagesMap = {
      "Home Page - MOC": this.homePageMOC,
      "Transaction Page - MOC": this.transactionsPageMOC,
    }
  }

  onPage(name: string): BasePage {
    const page = this.pagesMap[name]
    if (!page) throw new Error(`Page "${name}" not found in PageManager`)
    return page
  }

  onLoginPageMS(){
    return this.loginPageMS
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

  onContactProfilePageSF(){
    return this.contactProfilePageSF
  }

  onSearchResultsPageSF(){
    return this.searchResultsPageSF
  }

  onEmailMessagePageSF(){
    return this.emailMessagePageSF
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

  onHomePageTIT(){
    return this.homePageTIT
  }

  onRequestsPageTIT(){
    return this.requestsPageTIT
  }
}