import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm, page } from '.././hooks';

Given('I am on the login page', async () => {
  await page.goto('https://oikocredit--ltp.sandbox.my.salesforce.com/')
})

When('I log in with username {string} and password {string}', async (username: string, password: string) => {
  await pm.onLoginPage().loginUser(username, password)
})

Then('I should see the Home page', async () => {
  await expect(pm.onHomePage().latestInfoTitle()).toBeVisible()
})
