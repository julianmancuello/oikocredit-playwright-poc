import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { platformUtils } from '../../../src/utils/platformUtils'
import { NavigationManager as nm } from '../../../src/pages/navigationManager'
import { Transaction } from '../../../src/pages/myoikocredit-pages/transactionsPageMOC'

When('the client creates a {string} order', async (transaction: Transaction) => {
  await pm.onHomePageMOC().clickBuySellDividendsAndMore()
  await pm.onTransactionsPageMOC().selectTransaction(transaction)
  await pm.onTransactionsPageMOC().fillInAmountWithRandomNumber()
})