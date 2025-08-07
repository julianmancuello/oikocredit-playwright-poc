import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { utils } from '../../../src/utils/utils'
import { ContextStore as cs } from '../../../src/utils/contextStore'

When('the ISO clicks the New lead button', async () => {
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
  const expectedMessage = `Lead "${utils.getFullName()}" was created.`
  expect(await pm.onLeadsPage().getLeadCreatedMessage()).toEqual(expectedMessage)
})

Then('the ISO should see the new lead in the leads list', async () => {
  await pm.onLeadProfilePage().menu.clickOnTab("Leads")
  const actualValues = await pm.onLeadsPage().getNewLeadInList()
  const expectedValues = {
    name: utils.getFullName(),
    email: cs.get("newEmail"),
    accountName: cs.get("newAccountName")
  }
  expect(actualValues).toEqual(expectedValues)
})

When('the ISO selects an existing lead', async () => {
  await pm.onLeadsPage().selectFirstLeadInList()
})

When('the ISO updates the Mobile field with a random mobile number', async () => {
  await pm.onLeadProfilePage().saveInContextLead("name")
  await pm.onLeadProfilePage().clickEditLead()
  await pm.onLeadProfilePage().fillInWithRandomMobile()
  await pm.onLeadProfilePage().saveChanges()
})

Then('the ISO should see the saved lead success message', async () => {
  const expectedMessage = `Lead "${cs.get("name")}" was saved.`
  expect(await pm.onLeadProfilePage().getSavedChangesMessage()).toEqual(expectedMessage)
})

Then('the ISO should see the new mobile number in the lead details', async () => {
  const expectedMobile = cs.get("newMobile")
  expect(await pm.onLeadProfilePage().getNewMobile()).toEqual(expectedMobile)
})

When('the ISO converts the lead to a {string}', async (recordType: string) => {
  await pm.onLeadProfilePage().saveInContextLead("accountName")
  await pm.onLeadProfilePage().clickConvertLead()
  await pm.onLeadProfilePage().selectRecordType(recordType)
  await pm.onLeadProfilePage().convertLead()
})

Then('the ISO should see the lead conversion success message', async () => {
  const expectedMessage = "Your lead has been converted"
  expect(await pm.onLeadProfilePage().getLeadConvertedMessage()).toEqual(expectedMessage)
})

Then('the {string} account should have a status of {string}', async (recordType: string, status: string) => {
  await pm.onLeadsPage().menu.clickOnTab("Accounts")
  await pm.onAccountsPage().searchAccount()
  await pm.onAccountsPage().selectAccountRetrieved()
  expect(await pm.onAccountProfilePage().getRecordType()).toEqual(recordType)
  expect(await pm.onAccountProfilePage().getStatus()).toEqual(status)
})