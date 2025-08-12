import { Before, After } from '@cucumber/cucumber'
import { chromium, firefox, webkit, Page, Browser, BrowserContext } from '@playwright/test'
import { PageManager } from '../../src/pages/pageManager'
import { ContextStore as cs } from '../../src/utils/contextStore'
import fs from 'fs'
import path from 'path'

let browser: Browser
let context: BrowserContext
export let page: Page
export let pm: PageManager

Before(async () => {
  cs.loadProperties('resources/test.properties')
  const headless = !!process.env.CI || false
  const browserType = process.env.BROWSER?.toLowerCase() || 'chromium'

  switch (browserType) {
    case 'firefox':
      browser = await firefox.launch({ headless })
      break
    case 'webkit':
      browser = await webkit.launch({ headless })
      break
    case 'chromium':
    default:
      browser = await chromium.launch({ headless })
      break
  }
  
  const browserVersion = browser.version()
  const reportsDir = path.join(__dirname, '../../reports')
  const versionFile = path.join(reportsDir, `version-${browserType}.txt`)
  fs.writeFileSync(versionFile, browserVersion)
  context = await browser.newContext()
  page = await context.newPage()
  pm = new PageManager(page)
})

After(async () => {
  await browser?.close()
})