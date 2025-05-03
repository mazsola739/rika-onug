import { appendFile } from 'fs/promises'

const logFilePath = `${__dirname}/../../logs/log_${Date.now()}.txt`

export const logTimestamp = () => new Date().toISOString()

export const writeToLogFile = async message => {
  let content = `${logTimestamp()}: ${message}\n`
  try {
    await appendFile(logFilePath, content)
  } catch (err) {
    console.error(`Failed to write to log file: ${err.message}`)
  }
}
