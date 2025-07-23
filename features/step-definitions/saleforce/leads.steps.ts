import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm, page } from '.././hooks';

Given('the ISO is on the leads page', async () => {
  await page.goto('https://oikocredit--ltp.sandbox.my.salesforce.com/')
  await pm.onLoginPage().loginUser("jmancuello@oikocredit.org.ltp", "Nina23!!")
  await pm.onHomePage().clickOnLeadsTab()
})

When('the ISO clicks the New lead button', async (buttonName: string) => {
  await pm.onLeadsPage().clickNewLead()
})

When('the ISO fills in the lead form and saves it', async () => {
  await pm.onLeadsPage().selectInflow()
  await pm.onLeadsPage().selectLeadSource("Event")
  await pm.onLeadsPage().fillInWithRandomFirstName()
  await pm.onLeadsPage().fillInWithRandomLastName()
  await pm.onLeadsPage().fillInWithRandomEmail()
  await pm.onLeadsPage().fillInWithRandomAccountName()
  await pm.onLeadsPage().selectCountry("Germany")
  await pm.onLeadsPage().saveTheForm()
})

Then('the ISO should see the created lead success message', async () => {
  expect(await pm.onLeadsPage().leadCreatedSuccessMessage()).toBe(true)
})

Then('the ISO should see the new lead in the leads list', async () => {
  await pm.onHomePage().clickOnLeadsTab()
  expect(await pm.onLeadsPage().checkNewLeadInList()).toBe(true)
})

When('the ISO selects an existing lead', async () => {
  await pm.onLeadsPage().selectFirstLeadInList() 
})

When('the ISO updates the Mobile field with a random mobile number', async () => {
  await pm.onLeadProfilePage().clickEditLead()
  await pm.onLeadProfilePage().fillInWithRandomMobile()
  await pm.onLeadProfilePage().saveChanges()
})

Then('the ISO should see the saved lead success message', async () => {
  expect(await pm.onLeadProfilePage().isSavedChangesMessageDisplayed()).toBe(true)
})

Then('the ISO should see the new mobile number in the lead details', async () => {
  expect(await pm.onLeadProfilePage().isNewMobileDisplayed()).toBe(true)
})