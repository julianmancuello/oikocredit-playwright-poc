import { expect, test } from "@playwright/test"
import { PageManager } from "../src/pages/pageManager"

test('first test', async ({page}) => {
  await page.goto("https://oikocredit--ltp.sandbox.my.salesforce.com/")
  const pm = new PageManager(page)
  await pm.onLoginPage().loginUser("jmancuello@oikocredit.org.ltp", "Nina23!!")
  await expect(page).toHaveURL("https://oikocredit--ltp.sandbox.lightning.force.com/lightning/page/home")
})