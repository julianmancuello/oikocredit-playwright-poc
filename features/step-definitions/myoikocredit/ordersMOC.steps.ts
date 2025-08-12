import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { Transaction } from '../../../src/pages/myoikocredit-pages/transactionsPageMOC'
import { ContextStore as cs } from '../../../src/utils/contextStore'
import { Utils as utils } from '../../../src/utils/utils'

When('the user creates a {string} order', async (transaction: Transaction) => {
  await pm.onHomePageMOC().clickBuySellDividendsAndMore()
  await pm.onTransactionsPageMOC().selectTransaction(transaction)
  await pm.onTransactionsPageMOC().fillInAmountWithRandomNumber()
  expect(await pm.onTransactionsPageMOC().getAmountInConfirmRequest()).toEqual(cs.get("expAmountInConfirmation"))
  await pm.onTransactionsPageMOC().confirmRequest()
  await expect(pm.onTransactionsPageMOC().informationOfTheTransaction()).toBeVisible()
  await pm.onTransactionsPageMOC().closeConfirmation()
  const actualValues = await pm.onTransactionsPageMOC().getNewTransaction()
  const expectedValues = {
    date: utils.getFormattedToday("dd MMMM YYYY"),
    transactionType: utils.getTransactionType(transaction),
    status: "Eingereicht",
    amount: cs.get("expAmountInTransactions")
  }
  expect(actualValues).toEqual(expectedValues)
})