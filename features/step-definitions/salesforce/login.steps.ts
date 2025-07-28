import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { platformUtils } from '../../../src/utils/platformUtils'
import { NavigationManager as nm } from '../../../src/pages/navigationManager'

Given('the ISO is on the {string} {string} login page', async (app: string, env: string) => {
  const { application, environment } = platformUtils.parseAndValidateContext(app, env)
  await nm.goToApp(application, environment)
})

When('the ISO logs in with {string} valid credentials', async (env: string) => {
  const environment = platformUtils.parseAndValidateEnvironment(env)
  await pm.onLoginPage().loginWithEnvironmentCredentials(environment)
})

Then('the ISO should see the Home page', async () => {
  await pm.onHomePage().latestInfoTitle().waitFor({ state: 'visible' })
  await expect(pm.onHomePage().latestInfoTitle()).toBeVisible()
})
