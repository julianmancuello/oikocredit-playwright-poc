import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'

Then('the ISO should see the Home page', async () => {
  await pm.onHomePage().latestInfoTitle().waitFor({ state: 'visible' })
  await expect(pm.onHomePage().latestInfoTitle()).toBeVisible()
})

When('the ISO attempts to log in with invalid credentials', async () => {
  await pm.onLoginPage().loginWithInvalidCredentials()
})

Then('the ISO should see an error message', async () => {
  const expectedErrorMessage = "Error: Please check your username and password. If you still can't log in, contact your Salesforce administrator."
  expect(await pm.onLoginPage().getLogInErrorMessage()).toEqual(expectedErrorMessage)
})