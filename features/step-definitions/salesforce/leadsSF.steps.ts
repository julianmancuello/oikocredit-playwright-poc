import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { utils } from '../../../src/utils/utils'
import { ContextStore as cs } from '../../../src/utils/contextStore'

When('the ISO clicks the New lead button', async () => {
  await pm.onLeadsPageSF().clickNewLead()
})

When('the ISO fills in the lead form and saves it', async () => {
  await pm.onLeadsPageSF().selectInflow()
  await pm.onLeadsPageSF().selectLeadSource("Event")
  await pm.onLeadsPageSF().fillInWithRandomFirstName()
  await pm.onLeadsPageSF().fillInWithRandomLastName()
  await pm.onLeadsPageSF().fillInWithRandomEmail()
  await pm.onLeadsPageSF().fillInWithRandomAccountName()
  await pm.onLeadsPageSF().selectCountry("Germany")
  await pm.onLeadsPageSF().saveTheForm()
})

Then('the ISO should see the created lead success message', async () => {
  const expectedMessage = `Lead "${utils.getFullName()}" was created.`
  expect(await pm.onLeadsPageSF().getLeadCreatedMessage()).toEqual(expectedMessage)
})

Then('the ISO should see the new lead in the leads list', async () => {
  await pm.onLeadProfilePageSF().menuSF.clickOnTab("Leads")
  const actualValues = await pm.onLeadsPageSF().getNewLeadInList()
  const expectedValues = {
    name: utils.getFullName(),
    email: cs.get("newEmail"),
    accountName: cs.get("newAccountName")
  }
  expect(actualValues).toEqual(expectedValues)
})

When('the ISO selects an existing lead', async () => {
  await pm.onLeadsPageSF().selectFirstLeadInList()
})

When('the ISO updates the Mobile field with a random mobile number', async () => {
  await pm.onLeadProfilePageSF().saveInContextLead("name")
  await pm.onLeadProfilePageSF().clickEditLead()
  await pm.onLeadProfilePageSF().fillInWithRandomMobile()
  await pm.onLeadProfilePageSF().saveChanges()
})

Then('the ISO should see the saved lead success message', async () => {
  const expectedMessage = `Lead "${cs.get("name")}" was saved.`
  expect(await pm.onLeadProfilePageSF().getSavedChangesMessage()).toEqual(expectedMessage)
})

Then('the ISO should see the new mobile number in the lead details', async () => {
  const expectedMobile = cs.get("newMobile")
  expect(await pm.onLeadProfilePageSF().getNewMobile()).toEqual(expectedMobile)
})

When('the ISO converts the lead to a {string}', async (recordType: string) => {
  await pm.onLeadProfilePageSF().saveInContextLead("accountName")
  await pm.onLeadProfilePageSF().clickConvertLead()
  await pm.onLeadProfilePageSF().selectRecordType(recordType)
  await pm.onLeadProfilePageSF().convertLead()
})

Then('the ISO should see the lead conversion success message', async () => {
  const expectedMessage = "Your lead has been converted"
  expect(await pm.onLeadProfilePageSF().getLeadConvertedMessage()).toEqual(expectedMessage)
})

Then('the {string} account should have a status of {string}', async (recordType: string, status: string) => {
  await pm.onLeadsPageSF().menuSF.clickOnTab("Accounts")
  await pm.onAccountsPageSF().searchAccount()
  await pm.onAccountsPageSF().selectAccountRetrieved()
  expect(await pm.onAccountProfilePageSF().getRecordType()).toEqual(recordType)
  expect(await pm.onAccountProfilePageSF().getStatus()).toEqual(status)
})