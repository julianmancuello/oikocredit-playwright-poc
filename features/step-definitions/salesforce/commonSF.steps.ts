import { Given, When, Then } from '@cucumber/cucumber'
import { pm } from '../hooks'
import { HeaderTabSF } from '../../../src/pages/salesforce-pages/headerMenuSF'

Given('the ISO navigates to the {string} page', async (tab: HeaderTabSF) => {
  await pm.onHomePageSF().menuSF.clickOnTab(tab)
})