import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { pm } from '../hooks'
import { Transaction } from '../../../src/pages/myoikocredit-pages/transactionsPageMOC'
import { PlatformUtils as pu, Environment } from '../../../src/utils/platformUtils'
import { Utils as utils } from '../../../src/utils/utils'
import { ContextStore as cs } from '../../../src/utils/contextStore'

When(/^the ISO searches for the (\S+) investor$/, async (env: string) => {
  const environment = pu.parseAndValidateEnvironment(env)
  const investor = cs.get<string>(`investor-name-${environment}`)
  await pm.onHomePageSF().menuSF.searchInMainSearchBar(investor)
  await pm.onSearchResultsPageSF().selectResult(investor)
  expect(await pm.onContactProfilePageSF().getContactName()).toContain(investor)
})

When('the ISO checks that the {string} order appears in the emails', async (transaction: Transaction) => {
  await pm.onContactProfilePageSF().selectTypeOfEmail(transaction)
  expect(await pm.onEmailMessagePageSF().getAmountInEmail()).toEqual(cs.get("expAmountInConfirmation"))
})