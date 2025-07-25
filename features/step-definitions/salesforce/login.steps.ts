import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm, page } from '../hooks';
import { ContextStore as cs } from '../../../src/utils/contextStore'
import { Environment, envUtils } from '../../../src/utils/envUtils'

Given('the ISO is on the {string} login page', async (env: string) => {
  const environment = envUtils.parseAndValidateEnvironment(env)
  const url = cs.get<string>(`salesforce-${environment}-url`)

  if (!url) {
    throw new Error(`URL for environment '${environment}' not found in ContextStore`)
  }

  await page.goto(url)
})

When('the ISO logs in with {string} valid credentials', async (env: string) => {
  const environment = envUtils.parseAndValidateEnvironment(env)
  await pm.onLoginPage().loginWithEnvironmentCredentials(environment)
})

Then('the ISO should see the Home page', async () => {
  await expect(pm.onHomePage().latestInfoTitle()).toBeVisible()
})
