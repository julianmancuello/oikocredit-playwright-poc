import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { Transaction } from '../../../src/pages/myoikocredit-pages/transactionsPageMOC'
import { ContextStore as cs } from '../../../src/utils/contextStore'
import { Utils as utils } from '../../../src/utils/utils'

When('the ISO approves the {string} order', async (transaction: Transaction) => {
  await pm.onHomePageTIT().selectTypeOfRequests(transaction)
  const formattedAmount = utils.applyNumberFormat("English format", cs.get("transactionAmount"), 2)
  const formattedDate = utils.getFormattedToday("dd/mm/YYYY")
  await pm.onPurchaseRequestsPageTIT().selectRequest(formattedAmount, formattedDate)
})