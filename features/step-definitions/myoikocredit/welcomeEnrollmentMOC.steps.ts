import { Given, When, Then } from '@cucumber/cucumber'
import { pm } from './../hooks'
import { PlatformUtils as pu, Application } from '../../../src/utils/platformUtils'
import { NavigationManager as nm } from '../../../src/pages/navigationManager'

Given("the user is on the {string} {string} {string} welcome page in {string}", async (app: string, env: string, ctry: string, lang: string) => {
  const { application, environment, country, language } = pu.parseAndValidateContext(app, env, ctry, lang)
  await nm.goToApp(application, environment, language, country)
})