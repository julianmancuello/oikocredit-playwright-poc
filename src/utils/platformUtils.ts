export enum Environment {
  LTP = 'ltp',
  ACC = 'acc'
}

export enum Application {
  SALESFORCE = 'salesforce',
  TITAN = 'titan',
  MYOIKOCREDIT = 'myoikocredit'
}

class PlatformUtils {

  parseAndValidateEnvironment(env: string) {
    const envLower = env.toLowerCase()

    if (!Object.values(Environment).includes(envLower as Environment)) {
      throw new Error(`Environment '${env}' is not supported`)
    }

    return envLower as Environment
  }

  parseAndValidateApplication(app: string) {
    const appLower = app.toLowerCase()

    if (!Object.values(Application).includes(appLower as Application)) {
      throw new Error(`Application '${app}' is not supported`)
    }

    return appLower as Application
  }

  parseAndValidateContext(app: string, env: string) {
    const application = this.parseAndValidateApplication(app)
    const environment = this.parseAndValidateEnvironment(env)

    return { application, environment }
  }
}

export const platformUtils = new PlatformUtils()