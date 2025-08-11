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
  const amount = `EUR ${utils.applyNumberFormat("European format", cs.get("transactionAmount"), 0)}`
  cs.put("expectedAmount", amount)
  expect(await pm.onTransactionsPageMOC().getAmountInConfirmRequest()).toEqual(expectedAmount)
  await pm.onTransactionsPageMOC().confirmRequest()
  await expect(pm.onTransactionsPageMOC().informationOfTheTransaction()).toBeVisible()
  await pm.onTransactionsPageMOC().closeConfirmation()
  const actualValues = await pm.onTransactionsPageMOC().getNewTransaction()
  const expectedValues = {
    date: utils.getFormattedToday(),
    transactionType: utils.getTransactionType(transaction),
    status: "Eingereicht",
    amount: amount
  }
  expect(actualValues).toEqual(expectedValues)
})