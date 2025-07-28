import reporter from 'multiple-cucumber-html-reporter'
import { getCucumberExecutionTime } from './timer'
//test
reporter.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  pageTitle: 'Oikocredit Report',
  metadata: {
    browser: {
      name: 'chrome',
      version: '115'
    },
    device: 'Local machine',
    platform: {
      name: 'Windows',
      version: '11'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Oikocredit Playwright POC' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cycle', value: 'Regression' },
      { label: 'Execution Time', value: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' }) },
      { label: 'Execution Duration', value: getCucumberExecutionTime() }
    ]
  },
  customStyle: 'scripts/custom-style.css'
})