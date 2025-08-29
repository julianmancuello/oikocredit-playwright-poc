export enum Environment {
  LTP = 'ltp',
  ACC = 'acc'
}

export enum Application {
  SALESFORCE = 'salesforce',
  TITAN = 'titan',
  MYOIKOCREDIT = 'myoikocredit',
  MYOIKOCREDIT_ENROLLMENT = 'myoikocredit_enrollment'
}

export enum Country {
  GERMANY = 'DE',
  FRANCE = 'FR',
  SWITZERLAND = 'CH',
  SPAIN = 'ES',
  BELGIUM = 'BE',
  AUSTRIA = 'AT',
  ITALY = 'IT',
  SWEDEN = 'SE',
  NETHERLANDS = 'NL'
}

export enum Language {
  GERMAN = 'de',
  ENGLISH = 'en_US',
  FRENCH = 'fr',
  SWISS_GERMAN = 'de_CH',
  SWISS_FRENCH = 'fr_CH',
  SPANISH = 'es',
  CATALAN = 'ca',
  FLEMISH = 'nl_BE',
  BELGIAN_FRENCH = 'fr_BE',
  AUSTRIAN_GERMAN = 'de_AT',
  DUTCH = 'nl_NL'  
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

  static parseAndValidateCountry(country: string) {
    const countryUpper = country.toUpperCase()

    if (!(countryUpper in Country)) {
      throw new Error(`Country '${country}' is not supported`)
    }

    return Country[countryUpper as keyof typeof Country]
  }

  static parseAndValidateLanguage(language: string) {
    const languageUpper = language.toUpperCase()

    if (!(languageUpper in Language)) {
      throw new Error(`Language '${language}' is not supported`)
    }

    return Language[languageUpper as keyof typeof Language]
  }

  static parseAndValidateContext(app: string, env: string, ctry?: string, lang?: string) {
    const application = this.parseAndValidateApplication(app)
    const environment = this.parseAndValidateEnvironment(env)

    const country = ctry ? this.parseAndValidateCountry(ctry) : undefined
    const language = lang ? this.parseAndValidateLanguage(lang) : undefined

    return { application, environment, country, language }
  }
}