import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { Transaction } from '../../../src/pages/myoikocredit-pages/transactionsPageMOC'
import { ContextStore as cs } from '../../../src/utils/contextStore'
import { utils } from '../../../src/utils/utils'

When('the client creates a {string} order', async (transaction: Transaction) => {
  await pm.onHomePageMOC().clickBuySellDividendsAndMore()
  await pm.onTransactionsPageMOC().selectTransaction(transaction)
  await pm.onTransactionsPageMOC().fillInAmountWithRandomNumber()
  const expectedAmount = `EUR ${utils.applyNumberFormat("European format", cs.get("transactionAmount"), 2)}`
  expect(await pm.onTransactionsPageMOC().getAmountInConfirmRequest()).toEqual(expectedAmount)
})