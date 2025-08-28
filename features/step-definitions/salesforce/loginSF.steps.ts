import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'

Then('the ISO should see the Home page', async () => {
  await pm.onHomePageSF().getLastRefreshInfo().waitFor({ state: 'visible' })
  await expect(pm.onHomePageSF().getLastRefreshInfo()).toBeVisible()
})

When('the ISO attempts to log in with invalid credentials', async () => {
  await pm.onLoginPageSF().loginWithInvalidCredentials()
})

Then('the ISO should see an error message', async () => {
  const expectedErrorMessage = "Error: Please check your username and password. If you still can't log in, contact your Salesforce administrator."
  expect(await pm.onLoginPageSF().getLogInErrorMessage()).toEqual(expectedErrorMessage)
})