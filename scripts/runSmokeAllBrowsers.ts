import { execSync } from 'child_process'

const browsers = ['chromium', 'firefox', 'webkit']
const isCI = !!process.env.CI

for (const browser of browsers) {
  console.log(`Running SMOKE tests in ${browser}...`)

  let command = ''

  if (isCI) {
    command = `npx cucumber-js --require-module ts-node/register --require cucumber.ts --require 'features/step-definitions/**/*.ts' --tags "@smoke" --format json:reports/cucumber-${browser}.json features/`
  } else {
    command = `npx cucumber-js --require-module ts-node/register --require cucumber.ts --require features/step-definitions/**/*.ts --tags "@smoke" --format json:reports/cucumber-${browser}.json`
  }

  try {
    execSync(command, {
      stdio: 'inherit',
      env: { ...process.env, BROWSER: browser },
    })
  } catch (error) {
    console.error(`SMOKE tests failed in ${browser}`)
  }
}