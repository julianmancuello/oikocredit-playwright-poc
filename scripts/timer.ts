import fs from 'fs'
import path from 'path'

export function getCucumberExecutionTime(): string {
    try {
        const reportPath = path.join(__dirname, '../reports/cucumber.json')
        const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf-8'))
        
        let totalNanoseconds = 0
        
        reportData.forEach((feature: any) => {
            feature.elements?.forEach((scenario: any) => {
                scenario.steps?.forEach((step: any) => {
                    if (step.result?.duration) {
                        totalNanoseconds += step.result.duration
                    }
                })
            })
        })
        
        const totalSeconds = totalNanoseconds / 1000000000
        const seconds = Math.floor(totalSeconds)
        const milliseconds = Math.round((totalSeconds - seconds) * 1000)
        
        if (seconds >= 60) {
            const minutes = Math.floor(seconds / 60)
            const remainingSeconds = seconds % 60
            return `${minutes}m ${remainingSeconds}.${milliseconds.toString().padStart(3, '0')}s`
        }
        
        return `${seconds}.${milliseconds.toString().padStart(3, '0')}s`
        
    } catch (error) {
        console.error('Error reading execution time:', error)
        return '0.000s'
    }
}