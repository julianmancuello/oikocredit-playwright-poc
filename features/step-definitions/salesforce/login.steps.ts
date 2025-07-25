import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm, page } from '../hooks';
import { ContextStore as cs } from '../../../src/utils/contextStore';
import { Environment } from '../../../src/pages/loginPage';

Given('the ISO is on the login page', async () => {
  await page.goto(cs.get("salesforce-ltp-url"))
})

When('the ISO logs in with {string} valid credentials', async (env: string) => {
  const envLower = env.toLowerCase()

  if (!Object.values(Environment).includes(envLower as Environment)) {
    throw new Error(`Environment '${env}' is not supported`)
  }

  const environment = envLower as Environment
  await pm.onLoginPage().loginWithEnvironmentCredentials(environment)
})

Then('the ISO should see the Home page', async () => {
  await expect(pm.onHomePage().latestInfoTitle()).toBeVisible()
})
