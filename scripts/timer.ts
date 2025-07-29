import fs from 'fs'
import path from 'path'

export function getCucumberExecutionTime(): string {
  try {
    const reportsDir = path.join(__dirname, '../reports')
    const jsonFiles = fs.readdirSync(reportsDir).filter(file => file.endsWith('.json'))

    let totalNanoseconds = 0

    for (const file of jsonFiles) {
      const filePath = path.join(reportsDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const reportData = JSON.parse(content)

      reportData.forEach((feature: any) => {
        feature.elements?.forEach((scenario: any) => {
          scenario.steps?.forEach((step: any) => {
            if (step.result?.duration) {
              totalNanoseconds += step.result.duration
            }
          })
        })
      })
    }

    const totalMilliseconds = Math.round(totalNanoseconds / 1000000)

    const minutes = Math.floor(totalMilliseconds / 60000)
    const remainingMsAfterMinutes = totalMilliseconds % 60000

    const seconds = Math.floor(remainingMsAfterMinutes / 1000)
    const milliseconds = remainingMsAfterMinutes % 1000

    if (minutes > 0) {
      return `${minutes} min ${seconds} seg ${milliseconds} ms`
    }
    
    return `${seconds} seg ${milliseconds} ms`

  } catch (error) {
    console.error('Error reading execution time:', error)
    return '0.000s'
  }
}