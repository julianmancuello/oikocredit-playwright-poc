import { Given, When, Then } from '@cucumber/cucumber'
import { pm } from '../hooks'
import { HeaderTab } from '../../../src/pages/salesforce-pages/headerMenu'

Given('the ISO navigates to the {string} page', async (tab: HeaderTab) => {
  await pm.onHomePage().menu.clickOnTab(tab)
})