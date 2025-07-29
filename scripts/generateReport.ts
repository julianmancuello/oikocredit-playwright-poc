import reporter from 'multiple-cucumber-html-reporter'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { getCucumberExecutionTime } from './timer'

const reportsDir = path.join(__dirname, '../reports')
const jsonFiles = fs.readdirSync(reportsDir).filter(f => f.startsWith('cucumber-') && f.endsWith('.json'))

for (const file of jsonFiles) {
  const browserNameRaw = file.replace('cucumber-', '').replace('.json', '')
  const filePath = path.join(reportsDir, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  const json = JSON.parse(content)

  const normalizedBrowserName = (() => {
    switch (browserNameRaw.toLowerCase()) {
      case 'chromium': return 'chrome'
      case 'webkit': return 'safari'
      case 'firefox': return 'firefox'
      default: return browserNameRaw
    }
  })()

  const versionFile = path.join(reportsDir, `version-${browserNameRaw}.txt`)
  let browserVersion = 'N/A'
  if (fs.existsSync(versionFile)) {
    browserVersion = fs.readFileSync(versionFile, 'utf-8').trim()
  }

  json.forEach((feature: any) => {
    feature.tags = feature.tags || []
    feature.tags.push({ name: `@browser:${normalizedBrowserName}` })

    feature.metadata = {
      browser: {
        name: normalizedBrowserName,
        version: browserVersion
      },
      device: process.env.CI ? 'GitHub Actions' : 'Local machine',
      platform: {
        name: os.platform(),
        version: os.release()
      }
    }
  })

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf-8')
}

let runType = 'unknown'
const runTypeFile = path.join(reportsDir, 'run-type.txt')
if (fs.existsSync(runTypeFile)) {
  runType = fs.readFileSync(runTypeFile, 'utf-8').trim()
}
const cycleLabel = (() => {
  switch (runType.toLowerCase()) {
    case 'smoke': return 'Smoke Tests'
    case 'regression': return 'Regression Tests'
    case 'all': return 'Full Test Suite'
    default: return 'Unknown'
  }
})()

reporter.generate({
  jsonDir: reportsDir,
  reportPath: path.join(reportsDir, 'html'),
  pageTitle: 'Oikocredit Report',
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Oikocredit Playwright POC' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cycle', value: cycleLabel },
      { label: 'Execution Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' }) },
      { label: 'Execution Duration', value: getCucumberExecutionTime() }
    ]
  },
  customStyle: 'scripts/custom-style.css'
})

const versionFiles = fs.readdirSync(reportsDir).filter(f => f.startsWith('version-') && f.endsWith('.txt'))
for (const file of versionFiles) {
  fs.unlinkSync(path.join(reportsDir, file))
}

const cucumberJsonFiles = fs.readdirSync(reportsDir).filter(f =>
  (f.startsWith('cucumber-') && f.endsWith('.json')) || f === 'cucumber.json'
)
for (const file of cucumberJsonFiles) {
  fs.unlinkSync(path.join(reportsDir, file))
}

if (fs.existsSync(runTypeFile)) {
  fs.unlinkSync(runTypeFile)
}