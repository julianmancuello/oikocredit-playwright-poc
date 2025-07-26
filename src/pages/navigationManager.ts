import { ContextStore as cs } from "../utils/contextStore"
import { Environment } from "../utils/envUtils"
import { page } from "../../features/step-definitions/hooks"

export class NavigationManager {

  static async goToApp(app: string, env: Environment) {
    const key = `${app}-${env}-url`
    const url = cs.get<string>(key)

    if(!url) {
      throw new Error(`URL for key '${key}' not found in ContextStore`)
    }

    await page.goto(url)
  }
}