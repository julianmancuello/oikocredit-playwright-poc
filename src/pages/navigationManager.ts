import { Environment, Application, Country, Language } from "../utils/platformUtils"
import { page } from "../../features/step-definitions/hooks"
import { ContextStore as cs } from "../utils/contextStore"

const urls: Record<Application, Record<Environment, string>> = {
  [Application.SALESFORCE]: {
    [Environment.LTP]: 'https://oikocredit--ltp.sandbox.my.salesforce.com/',
    [Environment.ACC]: 'https://acc.salesforce.comFAKE',
  },
  [Application.TITAN]: {
    [Environment.LTP]: 'https://titant.oikocredit.net',
    [Environment.ACC]: 'https://acc.titan.ioFAKE',
  },
  [Application.MYOIKOCREDIT]: {
    [Environment.LTP]: 'https://oikocredit--ltp.sandbox.my.site.com/s/login/?language=de',
    [Environment.ACC]: 'https://acc.myoikocredit.ioFAKE',
  },
  [Application.MYOIKOCREDIT_ENROLLMENT]: {
    [Environment.LTP]: 'https://oikocredit--ltp.sandbox.my.site.com/s/onboarding/',
    [Environment.ACC]: 'https://oikocredit--acc.sandbox.my.site.com/s/onboarding/FAKE'
  }
}

export class NavigationManager {

  private static readonly outlookUrl: string = 'https://www.microsoft.com/en-us/microsoft-365/outlook/'

  static async goToApp(app: Application, env: Environment, language?: Language, country?: Country) {
    const appUrls = urls[app]

    if (!appUrls) {
      throw new Error(`Application '${app}' not found in URL config`)
    }

    const baseUrl = appUrls[env]
    cs.put("app", app)
    cs.put("env", env)

    if (!baseUrl) {
      throw new Error(`URL for application '${app}' in environment '${env}' not found`)
    }

    let finalUrl = baseUrl

    if (app === Application.MYOIKOCREDIT_ENROLLMENT) {
      if (!language || !country) {
        throw new Error(`For enrollment you must provide both language and country`)
      }

      finalUrl = `${baseUrl}?language=${language}&country=${country}`
      cs.put("language", language)
      cs.put("country", country)
    }
    
    await page.goto(finalUrl)
  }

  static async goToEmail() {
    await page.goto(this.outlookUrl)
  }
}