import { Given, When, Then } from '@cucumber/cucumber'
import { pm } from './hooks'
import { platformUtils, Application } from '../../src/utils/platformUtils'
import { NavigationManager as nm } from '../../src/pages/navigationManager'

Given('the ISO is on the {string} {string} login page', async (app: string, env: string) => {
  const { application, environment } = platformUtils.parseAndValidateContext(app, env)
  await nm.goToApp(application, environment)
})

Given('the ISO logs into {string} {string} with valid credentials', async (app: string, env: string) => {
  const { application, environment } = platformUtils.parseAndValidateContext(app, env)
  await nm.goToApp(application, environment)

  switch (application) {
    case Application.SALESFORCE:
      await pm.onLoginPageSF().loginWithEnvironmentCredentials(application, environment)
      break
    case Application.MYOIKOCREDIT:
      await pm.onLoginPageMOC().loginWithEnvironmentCredentials(application, environment)
      break
    default:
      throw new Error(`No login handler defined for application: ${application}`)
  }
})
