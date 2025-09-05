import { Page } from "@playwright/test"
import { BasePage } from "./basePage"
import { HomePageMS } from "./microsoft-pages/homePageMS"
import { LoginPageMS } from "./microsoft-pages/loginPageMS"
import { InboxPageMS } from "./microsoft-pages/inboxPageMS"
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
import { DocumentsPageMOC } from "./myoikocredit-pages/documentsPageMOC"
import { HomePageTIT } from "./titan-pages/homePageTIT"
import { RequestsPageTIT } from "./titan-pages/requestsPageTIT"
import { WelcomePageOMOC } from "./onboarding-myoikocredit-pages/welcomePageOMOC"
import { InsertYourDataPageOMOC } from "./onboarding-myoikocredit-pages/insertYourDataPageOMOC"
import { VerifyYourEmailPageOMOC } from "./onboarding-myoikocredit-pages/verifyYourEmailPageOMOC"
import { CheckYourInboxPageOMOC } from "./onboarding-myoikocredit-pages/checkYourInboxPageOMOC"
import { YourEmailHasBeenVerifiedPageOMOC } from "./onboarding-myoikocredit-pages/yourEmailHasBeenVerifiedPageOMOC"

export class PageManager {

  private readonly pagesMap: Record<string, BasePage>
  private readonly page: Page
  private readonly homePageMS: HomePageMS
  private readonly loginPageMS: LoginPageMS
  private readonly inboxPageMS: InboxPageMS
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
  private readonly documentsPageMOC: DocumentsPageMOC
  private readonly homePageTIT: HomePageTIT
  private readonly requestsPageTIT: RequestsPageTIT
  private readonly welcomePageOMOC: WelcomePageOMOC
  private readonly insertYourDataPageOMOC: InsertYourDataPageOMOC
  private readonly verifyYourEmailPageOMOC: VerifyYourEmailPageOMOC
  private readonly checkYourInboxPageOMOC: CheckYourInboxPageOMOC
  private readonly yourEmailHasBeenVerifiedPageOMOC: YourEmailHasBeenVerifiedPageOMOC
  
  constructor(page: Page){
    this.page = page
    this.homePageMS = new HomePageMS(this.page)
    this.loginPageMS = new LoginPageMS(this.page)
    this.inboxPageMS = new InboxPageMS(this.page)
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
    this.documentsPageMOC = new DocumentsPageMOC(this.page)
    this.homePageTIT = new HomePageTIT(this.page)
    this.requestsPageTIT = new RequestsPageTIT(this.page)
    this.welcomePageOMOC = new WelcomePageOMOC(this.page)
    this.insertYourDataPageOMOC = new InsertYourDataPageOMOC(this.page)
    this.verifyYourEmailPageOMOC = new VerifyYourEmailPageOMOC(this.page)
    this.checkYourInboxPageOMOC = new CheckYourInboxPageOMOC(this.page)
    this.yourEmailHasBeenVerifiedPageOMOC = new YourEmailHasBeenVerifiedPageOMOC(this.page)
    this.pagesMap = {
      "Home Page - SF": this.homePageSF,
      "Home Page - MOC": this.homePageMOC,
      "Transactions Page - MOC": this.transactionsPageMOC,
      "Documents Page - MOC": this.documentsPageMOC
    }
  }

  onPage(name: string): BasePage {
    const page = this.pagesMap[name]
    if (!page) throw new Error(`Page "${name}" not found in PageManager`)
    return page
  }

  onHomePageMS(){
    return this.homePageMS
  }

  onLoginPageMS(){
    return this.loginPageMS
  }

  onInboxPageMS(){
    return this.inboxPageMS
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

  onDocumentsPageMOC(){
    return this.documentsPageMOC
  }

  onHomePageTIT(){
    return this.homePageTIT
  }

  onRequestsPageTIT(){
    return this.requestsPageTIT
  }

  onWelcomePageOMOC(){
    return this.welcomePageOMOC
  }

  onInsertYourDataPageOMOC(){
    return this.insertYourDataPageOMOC
  }
  
  onVerifyYourEmailPageOMOC(){
    return this.verifyYourEmailPageOMOC
  }

  onCheckYourInboxPageOMOC(){
    return this.checkYourInboxPageOMOC
  }
  
  onYourEmailHasBeenVerifiedPageOMOC(){
    return this.yourEmailHasBeenVerifiedPageOMOC
  }
}