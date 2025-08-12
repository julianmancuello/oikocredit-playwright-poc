export enum Environment {
  LTP = 'ltp',
  ACC = 'acc'
}

export enum Application {
  SALESFORCE = 'salesforce',
  TITAN = 'titan',
  MYOIKOCREDIT = 'myoikocredit'
}

export class PlatformUtils {

  static parseAndValidateEnvironment(env: string) {
    const envLower = env.toLowerCase()

    if (!Object.values(Environment).includes(envLower as Environment)) {
      throw new Error(`Environment '${env}' is not supported`)
    }

    return envLower as Environment
  }

  static parseAndValidateApplication(app: string) {
    const appLower = app.toLowerCase()

    if (!Object.values(Application).includes(appLower as Application)) {
      throw new Error(`Application '${app}' is not supported`)
    }

    return appLower as Application
  }

  static parseAndValidateContext(app: string, env: string) {
    const application = this.parseAndValidateApplication(app)
    const environment = this.parseAndValidateEnvironment(env)

    return { application, environment }
  }
}