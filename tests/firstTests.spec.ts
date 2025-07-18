import { expect, test } from "@playwright/test"
import { PageManager } from "../src/pages/pageManager"

test('first test', async ({page}) => {
  await page.goto("https://oikocredit--ltp.sandbox.my.salesforce.com/")
  const pm = new PageManager(page)
  await pm.onLoginPage().loginUser("jmancuello@oikocredit.org.ltp", "Nina23!!")
  await pm.onHomePage().clickOnLeadsTab()
  await pm.onLeadsPage().clickNewLead()
  await pm.onLeadsPage().selectInflow()
  await pm.onLeadsPage().selectLeadSource("Event")
  await pm.onLeadsPage().fillInWithRandomFirstName()
  await pm.onLeadsPage().fillInWithRandomLastName()
  await pm.onLeadsPage().fillInWithRandomEmail()
  await pm.onLeadsPage().fillInWithRandomAccountName()
  await pm.onLeadsPage().selectCountry("Germany")
  await pm.onLeadsPage().saveTheForm()
  expect(await pm.onLeadsPage().leadCreatedSuccessMessage()).toBe(true)
  await pm.onHomePage().clickOnLeadsTab()
  expect(await pm.onLeadsPage().checkNewLeadInList()).toBe(true)
})