import { Given, When, Then } from '@cucumber/cucumber'
import { pm } from './hooks'
import { PlatformUtils as pu, Application } from '../../src/utils/platformUtils'
import { NavigationManager as nm } from '../../src/pages/navigationManager'

Given(/^(?:the ISO|the user) is on the (\S+) (\S+) login page$/, async (app: string, env: string) => {
  const { application, environment } = pu.parseAndValidateContext(app, env)
  await nm.goToApp(application, environment)
})

Given(/^(?:the ISO|the user) logs into (\S+) (\S+)(?: as (individual|joint))? with valid credentials$/, async (app: string, env: string, accountType?: "individual" | "joint") => {
  const { application, environment } = pu.parseAndValidateContext(app, env)
  await nm.goToApp(application, environment)

  switch (application) {
    case Application.SALESFORCE:
      await pm.onLoginPageSF().loginWithEnvironmentCredentials(application, environment)
      break
    case Application.MYOIKOCREDIT:
      await pm.onLoginPageMOC().loginWithEnvironmentCredentials(application, environment, accountType)
      break
    case Application.TITAN:
      await pm.onLoginPageMS().loginWithEnvironmentCredentials(application, environment)
      break
    default:
      throw new Error(`No login handler defined for application: ${application}`)
  }
})

When("the user navigates from {string} to {string}", async (fromPage: string, toPage: string) => {
  await pm.onPage(fromPage).navigateTo(toPage)
})

Then("the user checks the visibility of the {string} details", async (pageName: string) => {
  await pm.onPage(pageName).verifyPageElementsAreVisible()
})
