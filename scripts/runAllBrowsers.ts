import { execSync } from 'child_process'
import os from 'os'

const browsers = ['chromium', 'firefox', 'webkit']
const isCI = !!process.env.CI

for (const browser of browsers) {
  console.log(`Running tests in ${browser}...`)

  let command = ''

  if (isCI) {
    command = `npx cucumber-js --require-module ts-node/register --require cucumber.ts --require 'features/step-definitions/**/*.ts' --format json:reports/cucumber-${browser}.json features/`
  } else {
    command = `npx cucumber-js --require-module ts-node/register --require cucumber.ts --require features/step-definitions/**/*.ts --format json:reports/cucumber-${browser}.json`
  }

  try {
    execSync(command, {
      stdio: 'inherit',
      env: { ...process.env, BROWSER: browser },
    })
  } catch (error) {
    console.error(`Tests failed in ${browser}`)
  }
}