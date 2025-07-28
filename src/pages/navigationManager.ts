import { ContextStore as cs } from "../utils/contextStore"
import { Environment, Application } from "../utils/platformUtils"
import { page } from "../../features/step-definitions/hooks"

const urls: Record<Application, Record<Environment, string>> = {
  [Application.SALESFORCE]: {
    [Environment.LTP]: 'https://oikocredit--ltp.sandbox.my.salesforce.com/',
    [Environment.ACC]: 'https://acc.salesforce.com',
  },
  [Application.TITAN]: {
    [Environment.LTP]: 'https://ltp.titan.io',
    [Environment.ACC]: 'https://acc.titan.io',
  }
}

export class NavigationManager {

  static async goToApp(app: Application, env: Environment) {
    const appUrls = urls[app]

    if (!appUrls) {
      throw new Error(`Application '${app}' not found in URL config`)
    }

    const url = appUrls[env];

    if (!url) {
      throw new Error(`URL for application '${app}' in environment '${env}' not found`)
    }

    await page.goto(url)
  }
}