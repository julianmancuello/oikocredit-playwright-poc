import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { Transaction } from '../../../src/pages/myoikocredit-pages/transactionsPageMOC'
import { ContextStore as cs } from '../../../src/utils/contextStore'
import { Utils as utils } from '../../../src/utils/utils'

When('the ISO approves the {string} order', async (transaction: Transaction) => {
  await pm.onHomePageTIT().selectTypeOfRequests(transaction)
  await pm.onRequestsPageTIT().selectRequest(cs.get("transactionAmount"))
  await pm.onRequestsPageTIT().approveRequest()
  const expectedMessage = "1 Approval Request(s) have been Approved"
  expect(await pm.onRequestsPageTIT().getRequestApprovedMessage()).toEqual(expectedMessage)
})