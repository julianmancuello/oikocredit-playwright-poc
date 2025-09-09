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
import { LetsGetStartedPageOMOC } from "./onboarding-myoikocredit-pages/letsGetStartedPageOMOC"
import { ProfileDetailsPageOMOC } from "./onboarding-myoikocredit-pages/profileDetailsPageOMOC"

export class PageManager {

  private pagesMap!: Record<string, BasePage>
  private page: Page
  private homePageMS!: HomePageMS
  private loginPageMS!: LoginPageMS
  private inboxPageMS!: InboxPageMS
  private loginPageSF!: LoginPageSF
  private homePageSF!: HomePageSF
  private leadsPageSF!: LeadsPageSF
  private accountsPageSF!: AccountsPageSF
  private leadProfilePageSF!: LeadProfilePageSF
  private accountProfilePageSF!: AccountProfilePageSF
  private contactProfilePageSF!: ContactProfilePageSF
  private searchResultsPageSF!: SearchResultsPageSF
  private emailMessagePageSF!: EmailMessagePageSF
  private loginPageMOC!: LoginPageMOC
  private homePageMOC!: HomePageMOC
  private transactionsPageMOC!: TransactionsPageMOC
  private documentsPageMOC!: DocumentsPageMOC
  private homePageTIT!: HomePageTIT
  private requestsPageTIT!: RequestsPageTIT
  private welcomePageOMOC!: WelcomePageOMOC
  private insertYourDataPageOMOC!: InsertYourDataPageOMOC
  private verifyYourEmailPageOMOC!: VerifyYourEmailPageOMOC
  private checkYourInboxPageOMOC!: CheckYourInboxPageOMOC
  private yourEmailHasBeenVerifiedPageOMOC!: YourEmailHasBeenVerifiedPageOMOC
  private letsGetStartedPageOMOC!: LetsGetStartedPageOMOC
  private profileDetailsPageOMOC!: ProfileDetailsPageOMOC
  
  constructor(page: Page){
    this.page = page
    this.initPages()
  }

  setPage(page: Page) {
    this.page = page
    this.initPages()
  }

  private initPages() {
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
    this.letsGetStartedPageOMOC = new LetsGetStartedPageOMOC(this.page)
    this.profileDetailsPageOMOC = new ProfileDetailsPageOMOC(this.page)
    this.pagesMap = {
      "Home Page - SF": this.homePageSF,
      "Home Page - MOC": this.homePageMOC,
      "Transactions Page - MOC": this.transactionsPageMOC,
      "Documents Page - MOC": this.documentsPageMOC
    }
  }

  async switchToNewPage(action: Promise<unknown>) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      action
    ])
    await newPage.waitForLoadState()
    this.setPage(newPage)
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

  onLetsGetStartedPageOMOC(){
    return this.letsGetStartedPageOMOC
  }

  onProfileDetailsPageOMOC(){
    return this.profileDetailsPageOMOC
  }
}