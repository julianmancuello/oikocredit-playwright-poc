import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm, page } from '.././hooks';

Given('I am on the leads page', async () => {
  await page.goto('https://oikocredit--ltp.sandbox.my.salesforce.com/')
  await pm.onLoginPage().loginUser("jmancuello@oikocredit.org.ltp", "Nina23!!")
  await pm.onHomePage().clickOnLeadsTab()
})

When('I click the {string} button', async (buttonName: string) => {
  await pm.onLeadsPage().clickNewLead()
})

When('I fill in the lead form', async () => {
  await pm.onLeadsPage().selectInflow()
  await pm.onLeadsPage().selectLeadSource("Event")
  await pm.onLeadsPage().fillInWithRandomLastName()
})