import { Before, After } from '@cucumber/cucumber'
import { chromium, Page, Browser, BrowserContext, expect } from '@playwright/test'
import { PageManager } from '../../src/pages/pageManager'

let browser: Browser
let context: BrowserContext
export let page: Page
export let pm: PageManager

Before(async () => {
  browser = await chromium.launch({ headless: false })
  context = await browser.newContext()
  page = await context.newPage()
  pm = new PageManager(page)
})

After(async () => {
  await browser.close()
})