import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { Transaction } from '../../../src/pages/myoikocredit-pages/transactionsPageMOC'
import { ContextStore as cs } from '../../../src/utils/contextStore'
import { Utils as utils } from '../../../src/utils/utils'

When('the user creates a {} order', async (transaction: Transaction) => {
  await pm.onHomePageMOC().clickBuySellDividendsAndMore()
  await pm.onTransactionsPageMOC().selectTransaction(transaction)
  await pm.onTransactionsPageMOC().fillInAmountWithRandomNumber(transaction)
  expect(await pm.onTransactionsPageMOC().getAmountInConfirmRequest()).toEqual(cs.get("expAmountInConfirmation"))
  await pm.onTransactionsPageMOC().confirmRequest()
  await expect(pm.onTransactionsPageMOC().informationOfTheTransaction()).toBeVisible()
  await pm.onTransactionsPageMOC().closeConfirmation()
  const actualValues = await pm.onTransactionsPageMOC().getNewTransaction()
  const expectedValues = {
    date: utils.getFormattedToday("dd MMMM YYYY"),
    transactionType: utils.getTransactionType(transaction),
    status: "In Bearbeitung",
    amount: cs.get("expAmountInTransactions")
  }
  expect(actualValues).toEqual(expectedValues)
})

Then('the user checks that the {} order appears approved in the transactions', async (transaction: Transaction) => {
  await pm.onHomePageMOC().clickBuySellDividendsAndMore()
  const date = utils.getFormattedToday("dd MMMM YYYY")
  const transactionType = utils.getTransactionType(transaction)
  const amount = cs.get<string>("expAmountInTransactions")
  const actualStatus = await pm.onTransactionsPageMOC().getTransactionStatus(date, transactionType, amount)
  const expectedStatus = await pm.onTransactionsPageMOC().getApprovalLabel(transaction)
  expect(actualStatus).toEqual(expectedStatus)
})